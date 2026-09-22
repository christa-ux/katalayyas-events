/**
 * Single source of truth for every piece of business content on the site.
 * Editing copy, contact details or the gallery should never require touching
 * a component.
 */

export const site = {
  name: "Katalayya's Events",
  legalName: "Katalayya's Events LLC",
  tagline: 'Creating Unforgettable Memories',
  motto: 'Making Dreams Come True',
  founder: 'Ola Abdallah',
  origin: 'https://www.katalayyasevents.com',
  intro:
    'Expert event planning across Northern Virginia, where hospitality meets high design.',
  phone: '703-338-6879',
  phoneHref: 'tel:+17033386879',
  email: 'info@katalayyasevents.com',
  address: {
    street: '44746 Maynard Square',
    city: 'Ashburn',
    state: 'VA',
    zip: '20147',
  },
  serviceArea: 'Northern Virginia, DC & Maryland',
  social: {
    instagram: 'https://www.instagram.com/katalayyasevents/',
    whatsapp: 'https://wa.me/17033386879',
  },
  instagramHandle: '@katalayyasevents',
  /**
   * TODO: placeholder handles — swap for the client's real PayPal.me and
   * Venmo usernames before launch. PayPal.me links also accept card payment
   * as a guest, so no separate credit-card processor is wired up here.
   */
  payments: {
    paypal: 'https://paypal.me/REPLACE_ME_PAYPAL',
    venmo: 'https://venmo.com/u/REPLACE_ME_VENMO',
  },
} as const

export const fullAddress = `${site.address.street}, ${site.address.city} ${site.address.state} ${site.address.zip}`

export const nav = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
] as const

/** The four event types the business leads with. */
export type EventType = {
  slug: string
  title: string
  blurb: string
  image: string
  alt: string
}

export const eventTypes: EventType[] = [
  {
    slug: 'weddings',
    title: 'Weddings',
    blurb:
      'From the first venue walkthrough to the last dance — full-service planning for a day that looks and feels entirely like you.',
    image: '/images/ceremony-arch.jpg',
    alt: 'A draped ceremony arch dressed with white florals on an open lawn',
  },
  {
    slug: 'engagements',
    title: 'Engagements',
    blurb:
      'Proposals, engagement parties and bridal showers styled with the same care as the wedding that follows.',
    image: '/images/engagements.jpg',
    alt: 'An outdoor engagement party under a draped canopy with pastel florals',
  },
  {
    slug: 'gender-reveals',
    title: 'Gender Reveals',
    blurb:
      'Balloon installations, dessert tables and photo-ready backdrops built around one very big moment.',
    image: '/images/gender-reveal.jpg',
    alt: 'A pastel balloon arch backdrop set up for a gender reveal party',
  },
  {
    slug: 'corporate',
    title: 'Corporate Events',
    blurb:
      'Launches, galas and client dinners run to the minute — polished, on brand and completely off your plate.',
    image: '/images/business-events.jpg',
    alt: 'Guests networking at a bright corporate reception with cocktail tables',
  },
]

/** Detailed service list, grouped the way the business already groups it. */
export type ServiceGroup = {
  id: string
  title: string
  lede: string
  image: string
  alt: string
  services: { name: string; description: string }[]
}

export const serviceGroups: ServiceGroup[] = [
  {
    id: 'weddings',
    title: 'Wedding Services',
    lede: 'Everything that turns a venue into a wedding — sourced, negotiated and coordinated on your behalf.',
    image: '/images/bridal-bouquet.jpg',
    alt: 'A bride holding a bouquet of blush roses and eucalyptus',
    services: [
      {
        name: 'Catering & Menu Selection',
        description:
          'Whatever the circumstances, I am here to make your event extra special. This service will help create a wonderful and unique experience for your guests.',
      },
      {
        name: 'Invitations & Music',
        description:
          'I take care of all the small, tedious details and arrangements so that my clients can focus on the important stuff.',
      },
      {
        name: 'Custom Floral Design',
        description:
          "This service is customized to fit your budget and specific needs, so you don't have to worry about a thing.",
      },
    ],
  },
  {
    id: 'parties',
    title: 'Party Services',
    lede: 'The details guests remember — styled, installed and photographed start to finish.',
    image: '/images/balloons.jpg',
    alt: 'A rose gold and blush balloon installation',
    services: [
      {
        name: 'Table Setup',
        description:
          'This service will help create a wonderful and unique experience for your guests.',
      },
      {
        name: 'Balloon Arrangements',
        description:
          'We are incredibly qualified to produce outstanding balloon art for your event.',
      },
      {
        name: 'Event Photography',
        description:
          "We offer professional event photography services to capture the moments you won't want to forget at any special occasion.",
      },
    ],
  },
]

/** How an engagement actually runs, start to finish. */
export const process = [
  {
    step: '01',
    title: 'Consultation',
    body: 'We sit down with your date, your guest count and your budget, and map what is genuinely possible.',
  },
  {
    step: '02',
    title: 'Design & Vendors',
    body: 'A design direction, then the right vendors from a Northern Virginia network built over years of events.',
  },
  {
    step: '03',
    title: 'Coordination',
    body: 'Contracts, timelines, deliveries and walkthroughs — all tracked so nothing lands on you.',
  },
  {
    step: '04',
    title: 'Event Day',
    body: 'We run the day end to end. You are a guest at your own celebration, exactly as it should be.',
  },
]

export type GalleryImage = {
  src: string
  alt: string
  category: 'Weddings' | 'Receptions' | 'Details' | 'Celebrations'
  /** Aspect ratio hint so the masonry grid reserves the right space. */
  tall?: boolean
}

export const gallery: GalleryImage[] = [
  { src: '/images/reception-gold.jpg', alt: 'A candlelit reception table with gold accents and deep red florals', category: 'Receptions' },
  { src: '/images/ceremony-arch.jpg', alt: 'A draped ceremony arch on an open lawn', category: 'Weddings', tall: true },
  { src: '/images/place-setting.jpg', alt: 'A linen place setting finished with a sprig of rosemary', category: 'Details' },
  { src: '/images/floral-arch.jpg', alt: 'A white and blush floral arrangement on a garden arch', category: 'Weddings', tall: true },
  { src: '/images/long-table.jpg', alt: 'A long banquet table set with coloured glassware and shared plates', category: 'Receptions' },
  { src: '/images/bridal-bouquet.jpg', alt: 'A bridal bouquet of blush roses and eucalyptus', category: 'Details' },
  { src: '/images/sparkler-exit.jpg', alt: 'Guests raising sparklers as the couple passes through', category: 'Celebrations', tall: true },
  { src: '/images/garden-dinner.jpg', alt: 'An outdoor dinner under strung festoon lighting', category: 'Receptions' },
  { src: '/images/toast.jpg', alt: 'Two guests touching champagne glasses in a toast', category: 'Celebrations' },
  { src: '/images/couple-field.jpg', alt: 'A couple walking hand in hand through a field at golden hour', category: 'Weddings', tall: true },
  { src: '/images/babys-breath.jpg', alt: "Baby's breath in a hanging glass jar against weathered wood", category: 'Details' },
  { src: '/images/plated-dessert.jpg', alt: 'A plated raspberry dessert under warm restaurant light', category: 'Details' },
  { src: '/images/live-band.jpg', alt: 'A live band playing strings outdoors at a reception', category: 'Celebrations' },
  { src: '/images/twilight-lights.jpg', alt: 'Festoon lights strung between trees at twilight', category: 'Receptions', tall: true },
  { src: '/images/bride-portrait.jpg', alt: 'A bride holding a garden-style bouquet', category: 'Weddings' },
  { src: '/images/balloons.jpg', alt: 'A rose gold and blush balloon installation', category: 'Celebrations' },
  { src: '/images/rustic-table.jpg', alt: 'A place setting with a white bloom on a rustic wooden table', category: 'Details' },
  { src: '/images/celebration.jpg', alt: 'Friends cheering around an outdoor table strung with lights', category: 'Celebrations' },
  { src: '/images/cocktail.jpg', alt: 'A signature cocktail garnished and served at a bar', category: 'Details' },
]

export const galleryCategories = ['All', 'Weddings', 'Receptions', 'Details', 'Celebrations'] as const
