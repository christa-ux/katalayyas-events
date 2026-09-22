import { Seo } from '../components/Seo'
import { PageHero } from '../components/PageHero'
import { Container, Reveal, SectionHeading } from '../components/primitives'
import { eventTypes, serviceGroups } from '../data/site'
import { CallToAction } from './Home'

/** Full-bleed alternating band, one per service group. */
function ServiceGroupBand({
  group,
  flip,
}: {
  group: (typeof serviceGroups)[number]
  flip: boolean
}) {
  return (
    <section id={group.id} className={flip ? 'bg-cream' : 'bg-ivory'}>
      <Container size="wide" className="py-24 lg:py-32">
        <div
          className={`grid items-center gap-14 lg:grid-cols-2 lg:gap-20 ${
            flip ? 'lg:[&>*:first-child]:order-2' : ''
          }`}
        >
          <Reveal>
            <img
              src={group.image}
              alt={group.alt}
              width={900}
              height={1100}
              loading="lazy"
              className="aspect-4/5 w-full object-cover"
            />
          </Reveal>

          <Reveal delay={0.1}>
            <SectionHeading
              eyebrow={flip ? 'Celebrations' : 'The big day'}
              title={group.title}
              lede={group.lede}
              align="left"
            />

            <dl className="mt-12 divide-y divide-sand border-t border-sand">
              {group.services.map((service) => (
                <div key={service.name} className="group py-7">
                  <dt className="flex items-baseline gap-4">
                    <span
                      className="mt-2 block size-1.5 shrink-0 rotate-45 bg-gold-500"
                      aria-hidden="true"
                    />
                    <span className="font-[family-name:var(--font-display)] text-2xl text-espresso transition-colors duration-500 group-hover:text-gold-600">
                      {service.name}
                    </span>
                  </dt>
                  <dd className="mt-2.5 pl-[1.625rem] text-[0.95rem] leading-relaxed text-stone">
                    {service.description}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}

export default function Services() {
  return (
    <>
      <Seo
        title="Services"
        description="Wedding planning, catering and menu selection, custom floral design, balloon art, table styling and event photography across Northern Virginia."
        path="/services"
        image="/images/bridal-bouquet.jpg"
      />

      <PageHero
        eyebrow="What we do"
        title="Services"
        lede="Full-service planning, or just the pieces you would rather not carry yourself."
        image="/images/long-table.jpg"
      />

      {/* Event types overview */}
      <section className="bg-ivory py-24 lg:py-28">
        <Container size="wide">
          <SectionHeading
            eyebrow="Occasions"
            title={
              <>
                Occasions we <span className="italic text-gold-600">specialise</span> in
              </>
            }
          />
          <ul className="mt-14 grid gap-px overflow-hidden border border-sand bg-sand sm:grid-cols-2 lg:grid-cols-4">
            {eventTypes.map((type, i) => (
              <Reveal as="li" key={type.slug} delay={i * 0.07} className="bg-ivory p-9">
                <h3 className="text-2xl">{type.title}</h3>
                <p className="mt-3.5 text-sm leading-relaxed text-stone">{type.blurb}</p>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      {serviceGroups.map((group, i) => (
        <ServiceGroupBand key={group.id} group={group} flip={i % 2 === 1} />
      ))}

      {/* Also included */}
      <section className="bg-ivory py-24 lg:py-28">
        <Container>
          <SectionHeading
            eyebrow="Always included"
            title="Whichever package you choose"
          />
          <ul className="mt-14 grid gap-x-10 gap-y-5 sm:grid-cols-2">
            {[
              'Budget consultation and tracking',
              'Vendor sourcing and negotiation',
              'Venue walkthroughs and floor plans',
              'Timeline building and distribution',
              'Contract review and deadline management',
              'Day-of coordination and on-site management',
            ].map((item, i) => (
              <Reveal
                as="li"
                key={item}
                delay={i * 0.05}
                className="flex items-start gap-4 border-b border-sand pb-5 text-[0.95rem] text-bark"
              >
                <span
                  className="mt-2.5 block size-1.5 shrink-0 rotate-45 bg-gold-500"
                  aria-hidden="true"
                />
                {item}
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      <CallToAction />
    </>
  )
}
