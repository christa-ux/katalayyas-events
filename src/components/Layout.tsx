import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { fullAddress, site } from '../data/site'

/** Reset scroll position on every route change. */
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname])
  return null
}

/**
 * LocalBusiness structured data. Serialised with JSON.stringify from a typed
 * object so no untrusted string is ever concatenated into a script tag.
 */
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'EventPlanner',
  name: site.legalName,
  alternateName: site.name,
  description: site.intro,
  url: site.origin,
  telephone: `+1-${site.phone}`,
  email: site.email,
  image: `${site.origin}/images/reception-gold.jpg`,
  logo: `${site.origin}/images/logo-mark.png`,
  founder: { '@type': 'Person', name: site.founder },
  address: {
    '@type': 'PostalAddress',
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    addressRegion: site.address.state,
    postalCode: site.address.zip,
    addressCountry: 'US',
  },
  areaServed: ['Ashburn VA', 'Loudoun County', 'Northern Virginia', 'Washington DC', 'Maryland'],
  sameAs: [site.social.instagram],
  priceRange: '$$-$$$',
}

export function Layout() {
  return (
    <>
      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      <meta name="geo.placename" content={fullAddress} />

      <ScrollToTop />
      <Navbar />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
