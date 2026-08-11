import { Link } from 'react-router-dom'
import { fullAddress, nav, site } from '../data/site'
import { Container } from './primitives'

function Instagram() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-4.5" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" />
    </svg>
  )
}

function Facebook() {
  return (
    <svg viewBox="0 0 24 24" className="size-4.5" aria-hidden="true">
      <path
        d="M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.25-1.5 1.55-1.5H16.7V3.6A21 21 0 0 0 14.3 3.5c-2.4 0-4 1.45-4 4.1v2.3H7.6V13h2.7v8z"
        fill="currentColor"
      />
    </svg>
  )
}

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-espresso text-ivory/70">
      <Container size="wide" className="py-20 lg:py-24">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <img
              src="/images/logo-mark-light.png"
              alt=""
              width={44}
              height={51}
              className="w-9"
            />
            <p className="mt-6 font-[family-name:var(--font-display)] text-3xl text-ivory">
              {site.name}
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed">{site.intro}</p>

            <div className="mt-8 flex gap-3">
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex size-10 items-center justify-center border border-ivory/20 text-ivory/70 transition-colors duration-500 hover:border-gold-500 hover:text-gold-300"
              >
                <Instagram />
              </a>
              <a
                href={site.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex size-10 items-center justify-center border border-ivory/20 text-ivory/70 transition-colors duration-500 hover:border-gold-500 hover:text-gold-300"
              >
                <Facebook />
              </a>
            </div>
          </div>

          <nav aria-label="Footer">
            <h2 className="eyebrow text-gold-300">Explore</h2>
            <ul className="mt-6 space-y-3 text-sm">
              {nav.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="transition-colors hover:text-gold-300">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="eyebrow text-gold-300">Services</h2>
            <ul className="mt-6 space-y-3 text-sm">
              <li>Weddings</li>
              <li>Engagements</li>
              <li>Gender Reveals</li>
              <li>Corporate Events</li>
              <li>Floral &amp; Balloon Design</li>
            </ul>
          </div>

          <div>
            <h2 className="eyebrow text-gold-300">Get in touch</h2>
            <address className="mt-6 space-y-3 text-sm not-italic">
              <p className="leading-relaxed">{fullAddress}</p>
              <p>
                <a href={site.phoneHref} className="transition-colors hover:text-gold-300">
                  {site.phone}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${site.email}`}
                  className="transition-colors hover:text-gold-300"
                >
                  {site.email}
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-ivory/12 pt-8 text-xs tracking-wide sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {site.legalName}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/terms" className="transition-colors hover:text-gold-300">
              Terms &amp; Conditions
            </Link>
            <Link to="/privacy" className="transition-colors hover:text-gold-300">
              Privacy
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  )
}
