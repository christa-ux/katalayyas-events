# Katalayya's Events — website

A rebuild of [katalayyasevents.com](https://www.katalayyasevents.com) as a React single-page
app: same business, same voice, new design system and a hardened static build.

**Stack:** React 19 + TypeScript · Vite 8 · Tailwind CSS v4 · React Router 7 · Framer Motion · Zod

---

## Quick start

Requires **Node 20+** (built and tested on 24).

```bash
npm install
cp .env.example .env.local   # then fill in the form endpoint — see "Contact form"
npm run dev                  # http://localhost:5173
npm run build                # → dist/
npm run preview              # serve the production build locally
```

## Project layout

```
src/
  data/site.ts          all business content — copy, contact details, services, gallery
  lib/contactForm.ts    form validation + submission (Zod schema, bot filters, allowlist)
  components/           Navbar, Footer, Layout, PageHero, Seo, shared primitives
  pages/                Home, Services, Gallery, About, Contact, Legal, NotFound
public/
  images/               photography and the crowned-K logo mark
  _headers _redirects   Netlify / Cloudflare Pages config
  robots.txt sitemap.xml site.webmanifest
vercel.json             the same headers and redirects for Vercel
```

**Almost all content edits happen in [`src/data/site.ts`](src/data/site.ts).** Phone number,
address, service descriptions, gallery images and captions all live there — no component
needs touching.

---

## Contact form

The form is inert until an endpoint is configured. It posts JSON to a form-relay service
that forwards to `info@katalayyasevents.com`; there is no backend to run or patch.

1. Create a free account at [web3forms.com](https://web3forms.com) with the destination
   inbox set to `info@katalayyasevents.com`.
2. Put the access key in `.env.local` (locally) and in the host's environment variables
   (in production):

   ```
   VITE_FORM_ENDPOINT=https://api.web3forms.com/submit
   VITE_FORM_ACCESS_KEY=your-public-access-key
   ```

`VITE_*` values are compiled into the public bundle — a Web3Forms access key is designed
to be public and only routes to one fixed inbox, so this is safe. **Never put a real
secret in a `VITE_` variable.**

To use a different provider, add its host to `ALLOWED_ENDPOINT_HOSTS` in
[`src/lib/contactForm.ts`](src/lib/contactForm.ts) and to the `connect-src` / `form-action`
CSP directives in [`vite.config.ts`](vite.config.ts), [`public/_headers`](public/_headers)
and [`vercel.json`](vercel.json). All four must agree or submissions will be blocked.

---

## Security

| Control | Where |
| --- | --- |
| Strict Content-Security-Policy (no `unsafe-eval`, no wildcard origins) | `vite.config.ts` → `<meta>`, plus real headers in `_headers` / `vercel.json` |
| HSTS with `preload`, `nosniff`, `X-Frame-Options: DENY`, `frame-ancestors 'none'` | `_headers`, `vercel.json` |
| Restrictive `Permissions-Policy` (camera, mic, geolocation, payment all denied) | `_headers`, `vercel.json` |
| `Referrer-Policy: strict-origin-when-cross-origin` | headers + `<meta>` |
| Cross-origin isolation (`COOP`, `CORP`) | `_headers`, `vercel.json` |
| All input validated and length-capped before leaving the browser | `src/lib/contactForm.ts` |
| Endpoint re-validated at runtime — HTTPS only, host allowlist | `resolveEndpoint()` |
| Form POSTs sent with `credentials: 'omit'` and `referrerPolicy: 'no-referrer'` | `submitContact()` |
| Honeypot field + 3s minimum dwell + 60s client-side rate limit | `src/lib/contactForm.ts` |
| No `dangerouslySetInnerHTML` anywhere; user input is only ever a text node | codebase-wide |
| External links carry `rel="noopener noreferrer"` | `primitives.tsx`, `Footer.tsx` |
| Google Maps embed is sandboxed and lazy-loaded | `pages/Contact.tsx` |
| Fonts self-hosted — zero third-party requests on page load | `@fontsource-variable/*` |
| No analytics, no ad tech, no tracking cookies | by design |

Server-side validation still belongs to the form relay. If the form is ever moved to a
custom backend, re-validate every field there — the client checks are a UX and
bot-filtering layer, not a trust boundary.

Run `npm audit` after each dependency bump; the tree is currently clean.

---

## Deploying to www.katalayyasevents.com

The domain is currently on Wix. Deploy and verify the new site on the host's preview URL
**before** repointing DNS, so there is no downtime.

### 1. Deploy the build

<details open>
<summary><strong>Vercel</strong> (reads <code>vercel.json</code> automatically)</summary>

```bash
npm i -g vercel
vercel --prod
```

Set `VITE_FORM_ENDPOINT` and `VITE_FORM_ACCESS_KEY` under **Project → Settings →
Environment Variables**, then redeploy.
</details>

<details>
<summary><strong>Netlify / Cloudflare Pages</strong> (reads <code>public/_headers</code> and <code>public/_redirects</code>)</summary>

- Build command: `npm run build`
- Publish directory: `dist`
- Add the two `VITE_*` environment variables in the site settings.
</details>

### 2. Point the domain

Add `www.katalayyasevents.com` as a custom domain in the host's dashboard, then update DNS
at the registrar (Wix, if the domain was bought through them — otherwise wherever it is
registered):

| Type | Name | Value |
| --- | --- | --- |
| CNAME | `www` | the host's target (e.g. `cname.vercel-dns.com`) |
| A | `@` | the host's apex IP (e.g. `76.76.21.21` for Vercel) |

`www` is the canonical host: the apex `katalayyasevents.com` 301-redirects to it via
`_redirects` / `vercel.json`, so search engines only ever index one origin.

DNS propagation takes anywhere from a few minutes to 48 hours. HTTPS certificates are
issued automatically by all three hosts once the records resolve.

### 3. After going live

- [ ] Confirm `https://katalayyasevents.com` redirects to `https://www.katalayyasevents.com`
- [ ] Send a real test enquiry and confirm it arrives at `info@katalayyasevents.com`
- [ ] Check headers scored A+ at [securityheaders.com](https://securityheaders.com)
- [ ] Submit `https://www.katalayyasevents.com/sitemap.xml` in Google Search Console
- [ ] Cancel the Wix plan only once the new site has been live and stable for a few days

---

## Notes for the client

- **Photography.** The images in `public/images/` were carried over from the current Wix
  site so the rebuild could be reviewed with real content in place. Several are Wix stock
  photos rather than Ola's own work. Replace them with photographs from real events before
  launch — both because they will look far better and because it avoids relying on stock
  licences granted through the old Wix plan. Drop replacements into `public/images/` using
  the same filenames and nothing else needs to change.
- **Placeholder copy.** Three numbers on the home page (`150+` events, `40+` vendors,
  `5.0` rating) and the testimonial quote are illustrative. Swap them for real figures and
  a real, attributed client quote in `src/data/site.ts` and `src/pages/Home.tsx`.
- **Legal pages.** `/terms` and `/privacy` are drafted from how the business actually
  operates, but they are not legal advice. Have them reviewed before launch.
