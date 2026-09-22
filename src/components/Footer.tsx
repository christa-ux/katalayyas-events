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

function WhatsApp() {
  return (
    <svg viewBox="0 0 24 24" className="size-4.5" aria-hidden="true">
      <path
        d="M12.03 3.5a8.47 8.47 0 0 0-7.28 12.79L3.5 20.5l4.34-1.24a8.47 8.47 0 1 0 4.19-15.76Zm0 1.53a6.94 6.94 0 0 1 6.94 6.94 6.94 6.94 0 0 1-10.63 5.88l-.28-.17-2.58.74.75-2.5-.18-.29a6.94 6.94 0 0 1 5.98-10.6Zm-2.9 3.66c-.16 0-.42.06-.64.31s-.85.83-.85 2.02.87 2.34.99 2.5c.12.16 1.7 2.6 4.12 3.54.58.23 1.03.36 1.38.46.58.17 1.11.15 1.53.09.47-.07 1.43-.58 1.63-1.15.2-.56.2-1.04.14-1.15-.06-.1-.22-.17-.46-.29-.24-.12-1.43-.7-1.65-.78-.22-.08-.38-.12-.55.12-.16.24-.62.78-.76.95-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.43-1.35-1.67-.14-.24-.02-.37.1-.49.12-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.55-1.35-.76-1.85-.2-.48-.4-.42-.55-.42Z"
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
                href={site.social.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex size-10 items-center justify-center border border-ivory/20 text-ivory/70 transition-colors duration-500 hover:border-gold-500 hover:text-gold-300"
              >
                <WhatsApp />
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
