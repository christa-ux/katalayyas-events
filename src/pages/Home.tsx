import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { Seo } from '../components/Seo'
import {
  ButtonLink,
  Container,
  Divider,
  Reveal,
  SectionHeading,
} from '../components/primitives'
import { eventTypes, gallery, process, site } from '../data/site'

/* ---------------------------------------------------------------- Hero */

function Hero() {
  const reduce = useReducedMotion()

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-espresso">
      <div className="absolute inset-0">
        <img
          src="/images/reception-gold.jpg"
          alt=""
          fetchPriority="high"
          className={reduce ? 'size-full object-cover' : 'size-full object-cover animate-drift'}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-espresso/75 via-espresso/45 to-espresso/85" />
        <div className="absolute inset-0 bg-espresso/15" />
      </div>

      <Container size="wide" className="relative pt-28 pb-20">
        <motion.div
          className="max-w-3xl"
          initial={reduce ? false : { opacity: 0, y: 34 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="eyebrow text-gold-300">Ashburn, Virginia &middot; Est. 2019</p>

          <h1 className="mt-6 text-[2.6rem] leading-[1.04] text-ivory sm:mt-7 sm:text-7xl lg:text-[5.6rem]">
            Creating
            <span className="block italic text-gold-300">Unforgettable</span>
            Memories
          </h1>

          <p className="mt-7 max-w-xl leading-relaxed text-ivory/80 sm:mt-9 sm:text-lg">
            {site.intro} Weddings, engagements, gender reveals and corporate
            celebrations — planned end to end, so the only thing left for you to do is
            enjoy them.
          </p>

          <div className="mt-9 flex flex-wrap gap-4 sm:mt-11">
            <ButtonLink to="/contact" tone="light" className="border-gold-500 bg-gold-600 text-ivory hover:bg-ivory hover:text-espresso">
              Start Planning
            </ButtonLink>
            <ButtonLink to="/gallery" tone="light">
              View the Gallery
            </ButtonLink>
          </div>
        </motion.div>
      </Container>

      <div className="absolute inset-x-0 bottom-8 hidden justify-center sm:flex">
        <span className="eyebrow flex flex-col items-center gap-3 text-ivory/45">
          Scroll
          <span className="block h-12 w-px bg-gradient-to-b from-ivory/50 to-transparent" />
        </span>
      </div>
    </section>
  )
}

/* --------------------------------------------------------------- Intro */

function Welcome() {
  return (
    <section className="bg-ivory py-24 lg:py-32">
      <Container>
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
          <Reveal className="relative">
            <img
              src="/images/floral-arch.jpg"
              alt="A white and blush floral arrangement dressing a garden arch"
              width={800}
              height={550}
              loading="lazy"
              className="aspect-4/5 w-full object-cover"
            />
            <img
              src="/images/rustic-table.jpg"
              alt=""
              width={400}
              height={400}
              loading="lazy"
              aria-hidden="true"
              className="absolute -right-4 -bottom-10 hidden aspect-square w-44 border-8 border-ivory object-cover sm:block lg:-right-12 lg:w-56"
            />
          </Reveal>

          <Reveal delay={0.12}>
            <p className="eyebrow">Welcome</p>
            <h2 className="mt-5 text-4xl sm:text-5xl lg:text-[3.5rem]">
              Where hospitality meets
              <span className="italic text-gold-600"> high design</span>
            </h2>
            <div className="mt-8 space-y-5 text-[1.0625rem] leading-relaxed text-stone">
              <p>
                {site.legalName} was founded by {site.founder} out of a simple passion for
                helping people — and a conviction that the biggest days of your life
                should be enjoyable for you, not just for your guests.
              </p>
              <p>
                We work with the best vendors in Northern Virginia and offer some of the
                most gorgeous venues around. Budget consultation, vendor coordination,
                design, and day-of management all sit with us.
              </p>
            </div>

            <dl className="mt-11 grid grid-cols-3 gap-6 border-t border-sand pt-9">
              {[
                ['150+', 'Events planned'],
                ['40+', 'Trusted vendors'],
                ['5.0', 'Average rating'],
              ].map(([value, label]) => (
                <div key={label}>
                  <dt className="font-[family-name:var(--font-display)] text-4xl text-gold-600">
                    {value}
                  </dt>
                  <dd className="mt-1.5 text-xs tracking-[0.14em] text-stone uppercase">
                    {label}
                  </dd>
                </div>
              ))}
            </dl>

            <ButtonLink to="/about" tone="outline" className="mt-11">
              Meet {site.founder.split(' ')[0]}
            </ButtonLink>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}

/* ------------------------------------------------------- Event types */

function EventTypes() {
  return (
    <section className="bg-cream py-24 lg:py-32">
      <Container size="wide">
        <SectionHeading
          eyebrow="What we plan"
          title={
            <>
              Every celebration, <span className="italic text-gold-600">handled</span>
            </>
          }
          lede="Four things we do more than anything else — though if your occasion is not on this list, we would still love to hear about it."
        />

        <ul className="mt-16 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
          {eventTypes.map((type, i) => (
            <Reveal as="li" key={type.slug} delay={i * 0.08}>
              <Link
                to="/services"
                className="group block h-full bg-ivory transition-shadow duration-700 hover:shadow-[0_28px_60px_-32px_rgba(28,26,23,0.45)]"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={type.image}
                    alt={type.alt}
                    width={600}
                    height={640}
                    loading="lazy"
                    className="aspect-4/5 w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-107"
                  />
                  <span className="absolute inset-0 bg-espresso/0 transition-colors duration-700 group-hover:bg-espresso/12" />
                </div>
                <div className="px-7 pt-7 pb-9">
                  <h3 className="text-2xl transition-colors duration-500 group-hover:text-gold-600">
                    {type.title}
                  </h3>
                  <p className="mt-3.5 text-sm leading-relaxed text-stone">{type.blurb}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-[0.68rem] tracking-[0.2em] text-gold-600 uppercase">
                    Explore
                    <span className="block h-px w-6 bg-gold-500 transition-all duration-500 group-hover:w-10" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  )
}

/* ------------------------------------------------------------ Process */

function Process() {
  return (
    <section className="relative overflow-hidden bg-espresso py-24 text-ivory lg:py-32">
      <img
        src="/images/twilight-lights.jpg"
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="absolute inset-0 size-full object-cover opacity-18"
      />
      <Container className="relative">
        <SectionHeading
          eyebrow="How it works"
          tone="light"
          title={
            <>
              A calm, <span className="italic text-gold-300">unhurried</span> process
            </>
          }
          lede="Four steps between the first conversation and the last song."
        />

        <ol className="mt-16 grid gap-px overflow-hidden border border-ivory/12 bg-ivory/12 sm:grid-cols-2 lg:grid-cols-4">
          {process.map((item, i) => (
            <Reveal as="li" key={item.step} delay={i * 0.09} className="bg-espresso p-9">
              <span className="font-[family-name:var(--font-display)] text-5xl text-gold-500/45">
                {item.step}
              </span>
              <h3 className="mt-5 text-2xl text-ivory">{item.title}</h3>
              <p className="mt-3.5 text-sm leading-relaxed text-ivory/65">{item.body}</p>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  )
}

/* ---------------------------------------------------------- Testimonial */

function Testimonial() {
  return (
    <section className="bg-ivory py-24 lg:py-32">
      <Container size="narrow">
        <Reveal className="text-center">
          <Divider />
          <blockquote className="mt-10">
            <p className="font-[family-name:var(--font-display)] text-[1.8rem] leading-[1.35] text-espresso italic sm:text-4xl">
              &ldquo;Ola thought of everything before we did. On the day itself we did not
              answer a single question — we just got to be with our families.&rdquo;
            </p>
            <footer className="mt-9">
              <span className="eyebrow">A Loudoun County wedding</span>
            </footer>
          </blockquote>
          <div className="mt-10">
            <Divider />
          </div>
        </Reveal>
      </Container>
    </section>
  )
}

/* -------------------------------------------------------- Gallery strip */

function GalleryStrip() {
  const preview = gallery.slice(0, 6)

  return (
    <section className="bg-cream pt-24 pb-24 lg:pt-32 lg:pb-32">
      <Container size="wide">
        <SectionHeading
          eyebrow="Recent work"
          title={
            <>
              Moments we have <span className="italic text-gold-600">built</span>
            </>
          }
        />
        <ul className="mt-14 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
          {preview.map((img, i) => (
            <Reveal as="li" key={img.src} delay={(i % 3) * 0.08} className="overflow-hidden">
              <img
                src={img.src}
                alt={img.alt}
                width={600}
                height={450}
                loading="lazy"
                className="aspect-4/3 w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-106"
              />
            </Reveal>
          ))}
        </ul>
        <div className="mt-14 text-center">
          <ButtonLink to="/gallery" tone="outline">
            See the full gallery
          </ButtonLink>
        </div>
      </Container>
    </section>
  )
}

/* ---------------------------------------------------------------- CTA */

export function CallToAction() {
  return (
    <section className="relative overflow-hidden bg-espresso">
      <img
        src="/images/sparkler-exit.jpg"
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="absolute inset-0 size-full object-cover opacity-35"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-espresso/92 via-espresso/70 to-espresso/40" />
      <Container size="wide" className="relative py-24 lg:py-32">
        <Reveal className="max-w-xl">
          <p className="eyebrow text-gold-300">{site.motto}</p>
          <h2 className="mt-5 text-4xl text-ivory sm:text-5xl lg:text-[3.6rem]">
            Tell us about
            <span className="block italic text-gold-300">your day</span>
          </h2>
          <p className="mt-7 text-ivory/75">
            Consultations are free and there is no obligation. Share your date, your guest
            count and what you have in mind — we will come back with a plan.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <ButtonLink
              to="/contact"
              tone="light"
              className="border-gold-500 bg-gold-600 text-ivory hover:bg-ivory hover:text-espresso"
            >
              Book a consultation
            </ButtonLink>
            <ButtonLink href={site.phoneHref} tone="light">
              {site.phone}
            </ButtonLink>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}

/* --------------------------------------------------------------- Page */

export default function Home() {
  return (
    <>
      <Seo
        title="Wedding &amp; Event Planning in Northern Virginia"
        description={`${site.legalName} plans weddings, engagements, gender reveals and corporate events across Northern Virginia. ${site.intro}`}
        path="/"
      />
      <Hero />
      <Welcome />
      <EventTypes />
      <Process />
      <Testimonial />
      <GalleryStrip />
      <CallToAction />
    </>
  )
}
