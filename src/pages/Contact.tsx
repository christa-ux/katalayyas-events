import { useId, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Seo } from '../components/Seo'
import { PageHero } from '../components/PageHero'
import { Button, Container, Divider, Reveal } from '../components/primitives'
import { cx } from '../lib/cx'
import { fullAddress, site } from '../data/site'
import {
  emptyContact,
  submitContact,
  type ContactValues,
  type FieldErrors,
} from '../lib/contactForm'

const eventTypeOptions: ContactValues['eventType'][] = [
  'Wedding',
  'Engagement',
  'Gender Reveal',
  'Corporate Event',
  'Birthday / Anniversary',
  'Other',
]

const fieldClass =
  'w-full border border-sand bg-ivory px-4 py-3.5 text-[0.95rem] text-bark transition-colors duration-300 placeholder:text-stone/50 focus:border-gold-500 focus:outline-none'

function Field({
  id,
  label,
  error,
  children,
  className,
}: {
  id: string
  label: string
  error?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="mb-2 block text-[0.68rem] font-medium tracking-[0.18em] text-stone uppercase"
      >
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-2 text-xs text-red-700">
          {error}
        </p>
      )}
    </div>
  )
}

function ContactForm() {
  const uid = useId()
  const mountedAt = useRef(Date.now())
  const [values, setValues] = useState<ContactValues>(emptyContact)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [formError, setFormError] = useState('')

  const set = <K extends keyof ContactValues>(key: K, value: ContactValues[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }))
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (state === 'sending') return

    setState('sending')
    setFormError('')
    const result = await submitContact(values, mountedAt.current)

    if (result.status === 'invalid') {
      setErrors(result.errors)
      setState('idle')
      const firstKey = Object.keys(result.errors)[0]
      document.getElementById(`${uid}-${firstKey}`)?.focus()
      return
    }
    if (result.status === 'error') {
      setFormError(result.message)
      setState('error')
      return
    }

    setValues(emptyContact)
    setErrors({})
    setState('sent')
  }

  if (state === 'sent') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex min-h-[28rem] flex-col items-center justify-center border border-sand bg-cream px-8 py-16 text-center"
        role="status"
      >
        <span className="block size-3 rotate-45 bg-gold-500" aria-hidden="true" />
        <h3 className="mt-8 text-3xl">Thank you</h3>
        <p className="mt-4 max-w-sm text-stone">
          Your message is on its way. We usually reply within one business day — if it is
          urgent, please call {site.phone}.
        </p>
        <Button tone="outline" className="mt-9" onClick={() => setState('idle')}>
          Send another message
        </Button>
      </motion.div>
    )
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6">
      {/* Honeypot — hidden from users, visible to naive bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${uid}-company`}>Company</label>
        <input
          id={`${uid}-company`}
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.company}
          onChange={(e) => set('company', e.target.value as '')}
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id={`${uid}-name`} label="Name *" error={errors.name}>
          <input
            id={`${uid}-name`}
            name="name"
            type="text"
            required
            maxLength={80}
            autoComplete="name"
            className={cx(fieldClass, errors.name && 'border-red-400')}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? `${uid}-name-error` : undefined}
            value={values.name}
            onChange={(e) => set('name', e.target.value)}
          />
        </Field>

        <Field id={`${uid}-email`} label="Email *" error={errors.email}>
          <input
            id={`${uid}-email`}
            name="email"
            type="email"
            required
            maxLength={254}
            autoComplete="email"
            className={cx(fieldClass, errors.email && 'border-red-400')}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? `${uid}-email-error` : undefined}
            value={values.email}
            onChange={(e) => set('email', e.target.value)}
          />
        </Field>

        <Field id={`${uid}-phone`} label="Phone" error={errors.phone}>
          <input
            id={`${uid}-phone`}
            name="phone"
            type="tel"
            maxLength={30}
            autoComplete="tel"
            className={cx(fieldClass, errors.phone && 'border-red-400')}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? `${uid}-phone-error` : undefined}
            value={values.phone}
            onChange={(e) => set('phone', e.target.value)}
          />
        </Field>

        <Field id={`${uid}-eventType`} label="Event type *" error={errors.eventType}>
          <select
            id={`${uid}-eventType`}
            name="eventType"
            required
            className={cx(fieldClass, 'appearance-none')}
            value={values.eventType}
            onChange={(e) => set('eventType', e.target.value as ContactValues['eventType'])}
          >
            {eventTypeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>

        <Field id={`${uid}-eventDate`} label="Event date" error={errors.eventDate}>
          <input
            id={`${uid}-eventDate`}
            name="eventDate"
            type="date"
            className={fieldClass}
            value={values.eventDate}
            onChange={(e) => set('eventDate', e.target.value)}
          />
        </Field>

        <Field id={`${uid}-guests`} label="Approx. guests" error={errors.guests}>
          <input
            id={`${uid}-guests`}
            name="guests"
            type="text"
            inputMode="numeric"
            maxLength={6}
            className={cx(fieldClass, errors.guests && 'border-red-400')}
            aria-invalid={!!errors.guests}
            aria-describedby={errors.guests ? `${uid}-guests-error` : undefined}
            value={values.guests}
            onChange={(e) => set('guests', e.target.value)}
          />
        </Field>
      </div>

      <Field id={`${uid}-message`} label="Tell us about your event *" error={errors.message}>
        <textarea
          id={`${uid}-message`}
          name="message"
          required
          rows={6}
          maxLength={2000}
          className={cx(fieldClass, 'resize-y', errors.message && 'border-red-400')}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? `${uid}-message-error` : undefined}
          value={values.message}
          onChange={(e) => set('message', e.target.value)}
        />
        <p className="mt-2 text-right text-xs text-stone/70">
          {values.message.length} / 2000
        </p>
      </Field>

      {formError && (
        <p role="alert" className="border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          {formError} You can always reach us at{' '}
          <a href={`mailto:${site.email}`} className="underline">
            {site.email}
          </a>
          .
        </p>
      )}

      <div className="flex flex-wrap items-center gap-5 pt-2">
        <Button type="submit" disabled={state === 'sending'}>
          {state === 'sending' ? 'Sending…' : 'Send enquiry'}
        </Button>
        <p className="text-xs text-stone/80">
          We only use your details to reply to this enquiry.
        </p>
      </div>
    </form>
  )
}

/* -------------------------------------------------------------- Page */

export default function Contact() {
  return (
    <>
      <Seo
        title="Contact"
        description={`Book a free consultation with ${site.legalName}. Call ${site.phone}, email ${site.email}, or send an enquiry from Ashburn, Virginia.`}
        path="/contact"
        image="/images/toast.jpg"
      />

      <PageHero
        eyebrow="Say hello"
        title="Contact"
        lede="Consultations are free. Tell us the date and the dream — we will take it from there."
        image="/images/toast.jpg"
      />

      <section className="bg-ivory py-24 lg:py-32">
        <Container size="wide">
          <div className="grid gap-16 lg:grid-cols-[1fr_1.25fr] lg:gap-24">
            <Reveal>
              <p className="eyebrow">Get in touch</p>
              <h2 className="mt-5 text-4xl sm:text-5xl">
                Let&rsquo;s start
                <span className="block italic text-gold-600">planning</span>
              </h2>

              <dl className="mt-12 space-y-8">
                <div>
                  <dt className="eyebrow">Studio</dt>
                  <dd className="mt-2.5 text-[1.05rem] leading-relaxed text-bark">
                    {site.address.street}
                    <br />
                    {site.address.city}, {site.address.state} {site.address.zip}
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow">Phone</dt>
                  <dd className="mt-2.5">
                    <a
                      href={site.phoneHref}
                      className="text-[1.05rem] text-bark transition-colors hover:text-gold-600"
                    >
                      {site.phone}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow">Email</dt>
                  <dd className="mt-2.5">
                    <a
                      href={`mailto:${site.email}`}
                      className="text-[1.05rem] break-all text-bark transition-colors hover:text-gold-600"
                    >
                      {site.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow">Serving</dt>
                  <dd className="mt-2.5 text-[1.05rem] text-bark">{site.serviceArea}</dd>
                </div>
                <div>
                  <dt className="eyebrow">Follow along</dt>
                  <dd className="mt-2.5 flex gap-6 text-[1.05rem]">
                    <a
                      href={site.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-bark transition-colors hover:text-gold-600"
                    >
                      Instagram
                    </a>
                    <a
                      href={site.social.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-bark transition-colors hover:text-gold-600"
                    >
                      Facebook
                    </a>
                  </dd>
                </div>
              </dl>

              <div className="mt-12">
                <Divider />
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="border border-sand bg-cream/50 p-8 sm:p-11">
                <ContactForm />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Map */}
      <section className="bg-cream pb-24 lg:pb-32">
        <Container size="wide">
          <div className="aspect-16/9 w-full overflow-hidden border border-sand sm:aspect-21/9">
            <iframe
              title={`Map showing ${fullAddress}`}
              src={`https://www.google.com/maps?q=${encodeURIComponent(fullAddress)}&output=embed`}
              width="100%"
              height="100%"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              sandbox="allow-scripts allow-same-origin allow-popups"
              className="size-full border-0 grayscale-[35%]"
            />
          </div>
        </Container>
      </section>
    </>
  )
}
