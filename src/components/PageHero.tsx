import { motion, useReducedMotion } from 'framer-motion'
import { Container } from './primitives'

/** The compact banner every non-home page opens with. */
export function PageHero({
  eyebrow,
  title,
  lede,
  image,
}: {
  eyebrow: string
  title: string
  lede?: string
  image: string
}) {
  const reduce = useReducedMotion()

  return (
    <section className="relative flex min-h-[58vh] items-end overflow-hidden bg-espresso pt-32 pb-16 lg:min-h-[62vh] lg:pb-20">
      <img
        src={image}
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        className="absolute inset-0 size-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/60 to-espresso/40" />

      <Container size="wide" className="relative">
        <motion.div
          className="max-w-2xl"
          initial={reduce ? false : { opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="eyebrow text-gold-300">{eyebrow}</p>
          <h1 className="mt-5 text-5xl text-ivory sm:text-6xl lg:text-7xl">{title}</h1>
          {lede && <p className="mt-6 max-w-lg text-lg text-ivory/75">{lede}</p>}
        </motion.div>
      </Container>
    </section>
  )
}
