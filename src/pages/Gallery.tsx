import { useCallback, useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Seo } from '../components/Seo'
import { PageHero } from '../components/PageHero'
import { Container } from '../components/primitives'
import { cx } from '../lib/cx'
import { gallery, galleryCategories, site } from '../data/site'
import { CallToAction } from './Home'

type Category = (typeof galleryCategories)[number]

/* --------------------------------------------------------- Lightbox */

function Lightbox({
  images,
  index,
  onClose,
  onNavigate,
}: {
  images: typeof gallery
  index: number
  onClose: () => void
  onNavigate: (next: number) => void
}) {
  const image = images[index]

  const prev = useCallback(
    () => onNavigate((index - 1 + images.length) % images.length),
    [index, images.length, onNavigate],
  )
  const next = useCallback(
    () => onNavigate((index + 1) % images.length),
    [index, images.length, onNavigate],
  )

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose, prev, next])

  if (!image) return null

  return (
    <motion.div
      className="fixed inset-0 z-80 flex items-center justify-center bg-espresso/94 p-4 backdrop-blur-md sm:p-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      role="dialog"
      aria-modal="true"
      aria-label="Gallery image viewer"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close viewer"
        className="absolute top-5 right-5 z-10 p-3 text-ivory/70 transition-colors hover:text-gold-300"
        autoFocus
      >
        <svg width="22" height="22" viewBox="0 0 20 20" aria-hidden="true">
          <path d="M1 1l18 18M19 1L1 19" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      </button>

      <button
        type="button"
        onClick={prev}
        aria-label="Previous image"
        className="absolute left-2 z-10 p-4 text-ivory/60 transition-colors hover:text-gold-300 sm:left-6"
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M15 4l-8 8 8 8" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      </button>
      <button
        type="button"
        onClick={next}
        aria-label="Next image"
        className="absolute right-2 z-10 p-4 text-ivory/60 transition-colors hover:text-gold-300 sm:right-6"
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M9 4l8 8-8 8" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      </button>

      <motion.figure
        key={image.src}
        className="flex max-h-full max-w-5xl flex-col items-center"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        <img
          src={image.src}
          alt={image.alt}
          className="max-h-[76vh] w-auto object-contain"
        />
        <figcaption className="mt-5 text-center text-sm text-ivory/60">
          {image.alt}
          <span className="mt-1.5 block text-[0.65rem] tracking-[0.2em] text-gold-300 uppercase">
            {image.category} &middot; {index + 1} / {images.length}
          </span>
        </figcaption>
      </motion.figure>
    </motion.div>
  )
}

/* -------------------------------------------------------------- Page */

export default function Gallery() {
  const [filter, setFilter] = useState<Category>('All')
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const images = useMemo(
    () => (filter === 'All' ? gallery : gallery.filter((g) => g.category === filter)),
    [filter],
  )

  return (
    <>
      <Seo
        title="Gallery"
        description={`Weddings, receptions and celebrations planned and styled by ${site.legalName} across Northern Virginia.`}
        path="/gallery"
        image="/images/ceremony-arch.jpg"
      />

      <PageHero
        eyebrow="Portfolio"
        title="Gallery"
        lede="A look at the tables, arches, installations and moments we have put together."
        image="/images/garden-dinner.jpg"
      />

      <section className="bg-ivory py-20 lg:py-24">
        <Container size="wide">
          <div
            className="flex flex-wrap justify-center gap-2 sm:gap-3"
            role="group"
            aria-label="Filter gallery by category"
          >
            {galleryCategories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => {
                  setFilter(category)
                  setOpenIndex(null)
                }}
                aria-pressed={filter === category}
                className={cx(
                  'border px-6 py-2.5 text-[0.68rem] font-medium tracking-[0.2em] uppercase transition-all duration-500',
                  filter === category
                    ? 'border-espresso bg-espresso text-ivory'
                    : 'border-sand text-stone hover:border-gold-500 hover:text-gold-600',
                )}
              >
                {category}
              </button>
            ))}
          </div>

          <motion.ul layout className="mt-14 columns-1 gap-4 sm:columns-2 lg:columns-3">
            <AnimatePresence mode="popLayout">
              {images.map((image, i) => (
                <motion.li
                  key={image.src}
                  layout
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.55, delay: (i % 6) * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  className="mb-4 break-inside-avoid"
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(i)}
                    className="group relative block w-full overflow-hidden"
                    aria-label={`Open image: ${image.alt}`}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      width={700}
                      height={image.tall ? 950 : 520}
                      loading="lazy"
                      className={cx(
                        'w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-106',
                        image.tall ? 'aspect-3/4' : 'aspect-4/3',
                      )}
                    />
                    <span className="absolute inset-0 flex items-end bg-gradient-to-t from-espresso/70 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100">
                      <span className="p-6 text-left text-[0.65rem] tracking-[0.2em] text-ivory uppercase">
                        {image.category}
                      </span>
                    </span>
                  </button>
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        </Container>
      </section>

      <AnimatePresence>
        {openIndex !== null && (
          <Lightbox
            images={images}
            index={openIndex}
            onClose={() => setOpenIndex(null)}
            onNavigate={setOpenIndex}
          />
        )}
      </AnimatePresence>

      <CallToAction />
    </>
  )
}
