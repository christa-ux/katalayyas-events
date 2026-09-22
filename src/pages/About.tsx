import { Seo } from '../components/Seo'
import { PageHero } from '../components/PageHero'
import {
  ButtonLink,
  Container,
  Divider,
  Reveal,
  SectionHeading,
} from '../components/primitives'
import { process, site } from '../data/site'
import { CallToAction } from './Home'

const values = [
  {
    title: 'Personal, not templated',
    body: 'No two events get the same plan. The design starts from your story, your budget and the way you actually want the day to feel.',
  },
  {
    title: 'Relationships over lists',
    body: 'The vendor network here was built one event at a time. That is why availability, pricing and quality tend to land in your favour.',
  },
  {
    title: 'Nothing left to you',
    body: 'Contracts, timelines, deliveries, setup, teardown. If it can be taken off your plate before the day, it already has been.',
  },
]

export default function About() {
  return (
    <>
      <Seo
        title="About"
        description={`${site.legalName} was founded by ${site.founder} in Ashburn, Virginia, out of a passion for helping people celebrate the biggest moments of their lives.`}
        path="/about"
        image="/images/couple-field.jpg"
      />

      <PageHero
        eyebrow="Our story"
        title="About"
        lede={site.motto}
        image="/images/couple-field.jpg"
      />

      {/* Founder */}
      <section className="bg-ivory py-24 lg:py-32">
        <Container size="wide">
          <div className="grid items-start gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
            <Reveal>
              <img
                src="/images/bride-portrait.jpg"
                alt="A bride holding a garden-style bouquet before the ceremony"
                width={700}
                height={900}
                loading="lazy"
                className="aspect-4/5 w-full object-cover"
              />
              <div className="mt-8 border-l-2 border-gold-500 pl-6">
                <p className="font-[family-name:var(--font-display)] text-2xl text-espresso">
                  {site.founder}
                </p>
                <p className="eyebrow mt-1.5">Founder &amp; Lead Planner</p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <SectionHeading
                eyebrow="Meet the planner"
                align="left"
                title={
                  <>
                    Making dreams
                    <span className="block italic text-gold-600">come true</span>
                  </>
                }
              />

              <div className="mt-9 space-y-6 text-[1.0625rem] leading-relaxed text-stone">
                <p>
                  {site.legalName} started the way most good things do — out of a passion
                  for helping other people. {site.founder} founded the company around a
                  single purpose: making sure the most significant events of a person&rsquo;s
                  life are both memorable and genuinely enjoyable for the people living
                  them.
                </p>
                <p>
                  That means flexibility above all else. Through partnerships built up
                  over years across {site.serviceArea}, we can shape a plan around your
                  distinct needs and preferences rather than fitting you into someone
                  else&rsquo;s package. Budget consultation, vendor coordination, design
                  direction and day-of management all sit with us.
                </p>
                <p>
                  We work with the best vendors in Northern Virginia and offer some of the
                  most gorgeous venues around — and we would love to plan your unforgettable
                  event.
                </p>
              </div>

              <blockquote className="mt-11 border-l-2 border-gold-500 pl-7">
                <p className="font-[family-name:var(--font-display)] text-2xl leading-snug text-espresso italic sm:text-[1.75rem]">
                  &ldquo;I take care of all the small, tedious details and arrangements so
                  that my clients can focus on the important stuff.&rdquo;
                </p>
              </blockquote>

              <ButtonLink to="/contact" tone="outline" className="mt-11">
                Work with us
              </ButtonLink>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="bg-cream py-24 lg:py-32">
        <Container size="wide">
          <SectionHeading
            eyebrow="How we work"
            title={
              <>
                What you can <span className="italic text-gold-600">count on</span>
              </>
            }
          />
          <ul className="mt-16 grid gap-px overflow-hidden border border-sand bg-sand md:grid-cols-3">
            {values.map((value, i) => (
              <Reveal as="li" key={value.title} delay={i * 0.09} className="bg-cream p-10">
                <span
                  className="block size-2 rotate-45 bg-gold-500"
                  aria-hidden="true"
                />
                <h3 className="mt-7 text-2xl">{value.title}</h3>
                <p className="mt-4 text-[0.95rem] leading-relaxed text-stone">
                  {value.body}
                </p>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      {/* Process recap */}
      <section className="bg-ivory py-24 lg:py-32">
        <Container>
          <SectionHeading eyebrow="The process" title="From first call to last dance" />
          <ol className="mt-16 space-y-0 border-t border-sand">
            {process.map((item, i) => (
              <Reveal
                as="li"
                key={item.step}
                delay={i * 0.07}
                className="grid gap-4 border-b border-sand py-9 sm:grid-cols-[5rem_1fr_2fr] sm:gap-8"
              >
                <span className="font-[family-name:var(--font-display)] text-3xl text-gold-500/70">
                  {item.step}
                </span>
                <h3 className="text-2xl">{item.title}</h3>
                <p className="text-[0.95rem] leading-relaxed text-stone">{item.body}</p>
              </Reveal>
            ))}
          </ol>
          <div className="mt-20">
            <Divider />
          </div>
        </Container>
      </section>

      <CallToAction />
    </>
  )
}
