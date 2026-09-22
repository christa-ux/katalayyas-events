import { Seo } from '../components/Seo'
import { ButtonLink, Container } from '../components/primitives'

export default function NotFound() {
  return (
    <>
      <Seo
        title="Page not found"
        description="That page does not exist."
        path="/404"
        noindex
      />

      <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-espresso">
        <img
          src="/images/twilight-lights.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 size-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/70 to-espresso/50" />

        <Container className="relative text-center">
          <p className="eyebrow text-gold-300">Error 404</p>
          <h1 className="mt-6 text-6xl text-ivory sm:text-7xl">
            This page has
            <span className="block italic text-gold-300">slipped away</span>
          </h1>
          <p className="mx-auto mt-7 max-w-md text-ivory/70">
            The link may be out of date. Let&rsquo;s get you back to something beautiful.
          </p>
          <div className="mt-11 flex flex-wrap justify-center gap-4">
            <ButtonLink
              to="/"
              tone="light"
              className="border-gold-500 bg-gold-600 text-ivory hover:bg-ivory hover:text-espresso"
            >
              Back home
            </ButtonLink>
            <ButtonLink to="/contact" tone="light">
              Contact us
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  )
}
