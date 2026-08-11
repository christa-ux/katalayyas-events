import { Link } from 'react-router-dom'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { cx } from '../lib/cx'

export function Container({
  children,
  className,
  size = 'default',
}: {
  children: ReactNode
  className?: string
  size?: 'default' | 'wide' | 'narrow'
}) {
  const max =
    size === 'wide' ? 'max-w-[88rem]' : size === 'narrow' ? 'max-w-3xl' : 'max-w-6xl'
  return <div className={cx('mx-auto w-full px-6 sm:px-8', max, className)}>{children}</div>
}

/* ------------------------------------------------------------------ */

/** Fades content up as it scrolls into view; respects reduced-motion. */
export function Reveal({
  children,
  delay = 0,
  className,
  as = 'div',
}: {
  children: ReactNode
  delay?: number
  className?: string
  as?: 'div' | 'li' | 'section'
}) {
  const reduce = useReducedMotion()
  const MotionTag = motion[as]

  if (reduce) return <MotionTag className={className}>{children}</MotionTag>

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </MotionTag>
  )
}

/* ------------------------------------------------------------------ */

type ButtonTone = 'gold' | 'outline' | 'light'

const toneClasses: Record<ButtonTone, string> = {
  gold: 'bg-espresso text-ivory hover:bg-gold-600 border-espresso hover:border-gold-600',
  outline:
    'bg-transparent text-espresso border-espresso/25 hover:border-gold-600 hover:text-gold-600',
  light: 'bg-ivory/0 text-ivory border-ivory/45 hover:bg-ivory hover:text-espresso',
}

const buttonBase =
  'inline-flex items-center justify-center gap-2 border px-8 py-3.5 text-[0.7rem] font-medium uppercase tracking-[0.2em] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] disabled:cursor-not-allowed disabled:opacity-50'

export function ButtonLink({
  to,
  href,
  tone = 'gold',
  className,
  children,
}: {
  to?: string
  href?: string
  tone?: ButtonTone
  className?: string
  children: ReactNode
}) {
  const classes = cx(buttonBase, toneClasses[tone], className)

  if (href) {
    const external = /^https?:/i.test(href)
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {children}
      </a>
    )
  }
  return (
    <Link to={to ?? '/'} className={classes}>
      {children}
    </Link>
  )
}

export function Button({
  tone = 'gold',
  className,
  children,
  ...rest
}: { tone?: ButtonTone } & ComponentPropsWithoutRef<'button'>) {
  return (
    <button className={cx(buttonBase, toneClasses[tone], className)} {...rest}>
      {children}
    </button>
  )
}

/* ------------------------------------------------------------------ */

/** Eyebrow + heading + optional lede, centred or left aligned. */
export function SectionHeading({
  eyebrow,
  title,
  lede,
  align = 'center',
  tone = 'dark',
}: {
  eyebrow?: string
  title: ReactNode
  lede?: string
  align?: 'center' | 'left'
  tone?: 'dark' | 'light'
}) {
  return (
    <div
      className={cx(
        'max-w-2xl',
        align === 'center' ? 'mx-auto text-center' : 'text-left',
      )}
    >
      {eyebrow && (
        <p className={cx('eyebrow mb-5', tone === 'light' && 'text-gold-300')}>{eyebrow}</p>
      )}
      <h2
        className={cx(
          'text-4xl sm:text-5xl lg:text-[3.4rem]',
          tone === 'light' && 'text-ivory',
        )}
      >
        {title}
      </h2>
      {lede && (
        <p
          className={cx(
            'mt-6 text-[1.0625rem] leading-relaxed',
            tone === 'light' ? 'text-ivory/70' : 'text-stone',
          )}
        >
          {lede}
        </p>
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ */

/** Thin gold rule with a centred diamond — the recurring divider motif. */
export function Divider({ tone = 'dark' }: { tone?: 'dark' | 'light' }) {
  return (
    <div
      className={cx(
        'rule mx-auto w-32',
        tone === 'light' ? 'text-ivory/30' : 'text-sand',
      )}
      aria-hidden="true"
    >
      <span className="block size-1.5 rotate-45 bg-gold-500" />
    </div>
  )
}
