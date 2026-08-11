import { z } from 'zod'

/**
 * Contact-form validation and submission.
 *
 * Security notes:
 * - Every field is length-capped and shape-validated before it leaves the
 *   browser, so an oversized or malformed payload never reaches the endpoint.
 * - Submitted values are only ever rendered back as text nodes, never as HTML.
 * - The endpoint is read from an env var and re-checked at runtime against an
 *   allowlist of hosts, so a bad build-time value cannot redirect submissions
 *   to an arbitrary origin.
 * - A hidden honeypot field plus a minimum dwell time filter out naive bots
 *   without adding a third-party CAPTCHA (and its tracking).
 */

const trimmed = (max: number) => z.string().trim().max(max)

export const contactSchema = z.object({
  name: trimmed(80).min(2, 'Please enter your name.'),
  email: trimmed(254).email('Please enter a valid email address.'),
  phone: trimmed(30)
    .regex(/^[0-9+()\-.\s]*$/, 'Phone numbers can only contain digits and + ( ) - .')
    .optional()
    .or(z.literal('')),
  eventType: z.enum([
    'Wedding',
    'Engagement',
    'Gender Reveal',
    'Corporate Event',
    'Birthday / Anniversary',
    'Other',
  ]),
  eventDate: trimmed(10).optional().or(z.literal('')),
  guests: trimmed(6)
    .regex(/^[0-9]*$/, 'Guest count must be a number.')
    .optional()
    .or(z.literal('')),
  message: trimmed(2000).min(10, 'Tell us a little more — at least 10 characters.'),
  /** Honeypot: must stay empty. Hidden from real users. */
  company: z.literal('', { message: 'Submission rejected.' }),
})

export type ContactValues = z.infer<typeof contactSchema>
export type FieldErrors = Partial<Record<keyof ContactValues, string>>

export const emptyContact: ContactValues = {
  name: '',
  email: '',
  phone: '',
  eventType: 'Wedding',
  eventDate: '',
  guests: '',
  message: '',
  company: '',
}

/** Hosts we are willing to POST form data to. */
const ALLOWED_ENDPOINT_HOSTS = ['api.web3forms.com', 'formspree.io', 'api.formspree.io']

/** Returns the configured endpoint only if it is HTTPS and on the allowlist. */
export function resolveEndpoint(): string | null {
  const raw = import.meta.env.VITE_FORM_ENDPOINT
  if (!raw) return null
  try {
    const url = new URL(raw)
    if (url.protocol !== 'https:') return null
    if (!ALLOWED_ENDPOINT_HOSTS.includes(url.hostname)) return null
    return url.toString()
  } catch {
    return null
  }
}

export type SubmitResult =
  | { status: 'ok' }
  | { status: 'invalid'; errors: FieldErrors }
  | { status: 'error'; message: string }

const MIN_DWELL_MS = 3000
const RATE_LIMIT_KEY = 'ke:last-submit'
const RATE_LIMIT_MS = 60_000

function recentlySubmitted(): boolean {
  try {
    const last = Number(window.sessionStorage.getItem(RATE_LIMIT_KEY) ?? 0)
    return Number.isFinite(last) && Date.now() - last < RATE_LIMIT_MS
  } catch {
    return false // storage unavailable (private mode) — do not block the user
  }
}

function markSubmitted() {
  try {
    window.sessionStorage.setItem(RATE_LIMIT_KEY, String(Date.now()))
  } catch {
    /* ignore */
  }
}

export async function submitContact(
  values: ContactValues,
  mountedAt: number,
): Promise<SubmitResult> {
  const parsed = contactSchema.safeParse(values)
  if (!parsed.success) {
    const errors: FieldErrors = {}
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof ContactValues
      if (key && !errors[key]) errors[key] = issue.message
    }
    return { status: 'invalid', errors }
  }

  // Bot heuristics — silently succeed so scrapers learn nothing.
  if (parsed.data.company !== '' || Date.now() - mountedAt < MIN_DWELL_MS) {
    return { status: 'ok' }
  }

  if (recentlySubmitted()) {
    return {
      status: 'error',
      message: 'We already have your message. Please give us a minute before sending another.',
    }
  }

  const endpoint = resolveEndpoint()
  if (!endpoint) {
    return {
      status: 'error',
      message: 'The form is not connected yet. Please email or call us directly.',
    }
  }

  const { company: _honeypot, ...payload } = parsed.data

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 15_000)

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: import.meta.env.VITE_FORM_ACCESS_KEY ?? undefined,
        subject: `New enquiry — ${payload.eventType} — ${payload.name}`,
        from_name: "Katalayya's Events website",
        ...payload,
      }),
      signal: controller.signal,
      // Never attach cookies or credentials to a third-party endpoint.
      credentials: 'omit',
      referrerPolicy: 'no-referrer',
    })

    if (!response.ok) {
      return {
        status: 'error',
        message: 'Something went wrong sending your message. Please try again or call us.',
      }
    }

    markSubmitted()
    return { status: 'ok' }
  } catch {
    return {
      status: 'error',
      message: 'We could not reach the server. Please check your connection or call us.',
    }
  } finally {
    clearTimeout(timeout)
  }
}
