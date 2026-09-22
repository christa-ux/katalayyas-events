import { Seo } from '../components/Seo'
import { PageHero } from '../components/PageHero'
import { Container } from '../components/primitives'
import { fullAddress, site } from '../data/site'

type Section = { heading: string; paragraphs: string[] }

const terms: Section[] = [
  {
    heading: 'Agreement',
    paragraphs: [
      `These terms govern your use of ${site.origin.replace('https://', '')} and any enquiry you submit through it. By using the site you agree to them.`,
      `Nothing on this website constitutes a binding offer of services. Planning engagements with ${site.legalName} are governed by a separate written contract signed by both parties.`,
    ],
  },
  {
    heading: 'Bookings and deposits',
    paragraphs: [
      'A date is only reserved once a signed agreement and the agreed retainer have been received. Retainers secure the date and are non-refundable unless stated otherwise in your contract.',
      'Balances, payment schedules, postponement terms and cancellation terms are set out in your individual planning agreement.',
    ],
  },
  {
    heading: 'Third-party vendors',
    paragraphs: [
      `${site.legalName} sources and coordinates independent vendors on your behalf. Each vendor is responsible for its own services, insurance and licensing. We are not liable for the acts or omissions of vendors you contract with directly.`,
    ],
  },
  {
    heading: 'Photography',
    paragraphs: [
      'Images on this site are used to illustrate the styling and planning services offered. Where an image is supplied by a client or photographer, it is used with permission and remains the property of its owner.',
      'If you would prefer photographs of your event not be used in our portfolio, tell us in writing and we will honour that.',
    ],
  },
  {
    heading: 'Intellectual property',
    paragraphs: [
      `All text, design and branding on this site are the property of ${site.legalName} and may not be reproduced without written permission.`,
    ],
  },
  {
    heading: 'Contact',
    paragraphs: [
      `Questions about these terms can be sent to ${site.email} or ${site.phone}, or by post to ${fullAddress}.`,
    ],
  },
]

const privacy: Section[] = [
  {
    heading: 'What we collect',
    paragraphs: [
      'When you submit the contact form we collect the name, email address, phone number, event type, event date, guest count and message you choose to give us. Nothing else is required.',
      'This site sets no advertising cookies and runs no third-party analytics or tracking scripts.',
    ],
  },
  {
    heading: 'How we use it',
    paragraphs: [
      'Your details are used solely to respond to your enquiry and, if you go on to book, to plan your event. We do not sell, rent or trade your information.',
      'Enquiries are delivered to our email inbox through a form-processing service and are retained only as long as needed to serve you.',
    ],
  },
  {
    heading: 'Third-party services',
    paragraphs: [
      'The contact page embeds a Google Maps frame so you can find the studio. Loading that frame is subject to Google’s own privacy policy. Links to Instagram and WhatsApp open on those platforms and are governed by their policies.',
    ],
  },
  {
    heading: 'Security',
    paragraphs: [
      'The site is served over HTTPS only, sends a strict Content-Security-Policy, and stores no customer data in the browser beyond a short-lived timestamp used to rate-limit form submissions.',
    ],
  },
  {
    heading: 'Your choices',
    paragraphs: [
      `You can ask us to correct or delete the information you have given us at any time by emailing ${site.email}.`,
    ],
  },
]

export default function Legal({ kind }: { kind: 'terms' | 'privacy' }) {
  const isTerms = kind === 'terms'
  const sections = isTerms ? terms : privacy
  const title = isTerms ? 'Terms & Conditions' : 'Privacy Policy'

  return (
    <>
      <Seo
        title={title}
        description={
          isTerms
            ? `Terms and conditions for using the ${site.name} website and booking planning services.`
            : `How ${site.legalName} collects, uses and protects the information you share through this website.`
        }
        path={isTerms ? '/terms' : '/privacy'}
      />

      <PageHero
        eyebrow="Legal"
        title={title}
        image="/images/babys-breath.jpg"
      />

      <section className="bg-ivory py-24 lg:py-32">
        <Container size="narrow">
          <p className="eyebrow">Last updated &middot; January 2026</p>

          <div className="mt-12 space-y-12">
            {sections.map((section) => (
              <div key={section.heading}>
                <h2 className="text-3xl">{section.heading}</h2>
                <div className="mt-5 space-y-4 text-[1.0313rem] leading-relaxed text-stone">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
