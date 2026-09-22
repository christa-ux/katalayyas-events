import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { nav, site } from '../data/site'
import { Container } from './primitives'
import { cx } from '../lib/cx'

/**
 * The nav sits transparently over the hero on the home page and turns solid
 * once the user scrolls (or on any other route, which has no hero).
 */
export function Navbar() {
  const { pathname } = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  const overHero = pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the drawer on navigation and lock body scroll while it is open.
  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const solid = scrolled || !overHero
  const linkColor = solid ? 'text-bark' : 'text-ivory'

  return (
    <>
      <a
        href="#main"
        className="sr-only-focusable fixed top-4 left-4 z-100 bg-espresso px-5 py-3 text-xs tracking-[0.2em] text-ivory uppercase"
      >
        Skip to content
      </a>

      <header
        className={cx(
          'fixed inset-x-0 top-0 z-50 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]',
          solid
            ? 'border-b border-sand/60 bg-ivory/92 backdrop-blur-xl'
            : 'border-b border-transparent bg-gradient-to-b from-black/45 to-transparent',
        )}
      >
        <Container size="wide">
          <div
            className={cx(
              'flex items-center justify-between transition-all duration-700',
              solid ? 'h-18' : 'h-24',
            )}
          >
            <Link
              to="/"
              className="flex items-center gap-3"
              aria-label={`${site.name} — home`}
            >
              <img
                src={solid ? '/images/logo-mark.png' : '/images/logo-mark-light.png'}
                alt=""
                width={40}
                height={46}
                className={cx(
                  'w-8 transition-all duration-700 sm:w-9',
                  solid ? 'opacity-100' : 'opacity-95',
                )}
              />
              <span className="leading-none">
                <span
                  className={cx(
                    'block font-[family-name:var(--font-display)] text-xl tracking-wide transition-colors duration-700 sm:text-[1.4rem]',
                    linkColor,
                  )}
                >
                  Katalayya&rsquo;s
                </span>
                <span
                  className={cx(
                    'block text-[0.55rem] tracking-[0.34em] uppercase transition-colors duration-700',
                    solid ? 'text-gold-600' : 'text-ivory/75',
                  )}
                >
                  Events &amp; Weddings
                </span>
              </span>
            </Link>

            <nav className="hidden items-center gap-9 lg:flex" aria-label="Primary">
              {nav.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    cx(
                      'relative text-[0.7rem] font-medium tracking-[0.22em] uppercase transition-colors duration-500',
                      linkColor,
                      'after:absolute after:-bottom-1.5 after:left-0 after:h-px after:bg-gold-500 after:transition-all after:duration-500 after:content-[""]',
                      isActive
                        ? 'after:w-full'
                        : 'after:w-0 hover:text-gold-500 hover:after:w-full',
                    )
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              <a
                href={site.phoneHref}
                className={cx(
                  'border px-6 py-2.5 text-[0.68rem] font-medium tracking-[0.2em] uppercase transition-all duration-500',
                  solid
                    ? 'border-espresso/25 text-bark hover:border-gold-600 hover:text-gold-600'
                    : 'border-ivory/45 text-ivory hover:bg-ivory hover:text-espresso',
                )}
              >
                {site.phone}
              </a>
            </nav>

            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              className={cx('-mr-2 p-2 lg:hidden', linkColor)}
            >
              <span className="sr-only">Menu</span>
              <svg width="26" height="14" viewBox="0 0 26 14" aria-hidden="true">
                <path d="M0 1h26M0 13h18" stroke="currentColor" strokeWidth="1.2" />
              </svg>
            </button>
          </div>
        </Container>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-60 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div
              className="absolute inset-0 bg-espresso/60"
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Site menu"
              className="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col bg-ivory px-8 pt-8 pb-12"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center justify-between">
                <img src="/images/logo-mark.png" alt="" width={32} height={37} className="w-7" />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="-mr-2 p-2 text-bark"
                  autoFocus
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M1 1l18 18M19 1L1 19" stroke="currentColor" strokeWidth="1.2" />
                  </svg>
                </button>
              </div>

              <nav className="mt-14 flex flex-col gap-1" aria-label="Mobile">
                {nav.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                      cx(
                        'border-b border-sand/70 py-4 font-[family-name:var(--font-display)] text-3xl transition-colors',
                        isActive ? 'text-gold-600' : 'text-espresso hover:text-gold-600',
                      )
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
              </nav>

              <div className="mt-auto space-y-2 pt-10 text-sm text-stone">
                <a href={site.phoneHref} className="block hover:text-gold-600">
                  {site.phone}
                </a>
                <a href={`mailto:${site.email}`} className="block hover:text-gold-600">
                  {site.email}
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
