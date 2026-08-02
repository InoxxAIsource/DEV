/*
  Motion tokens. Single easing curve and a 200–600ms band, so every transition
  on the site feels like it came from the same hand.
*/
import type { Variants, Transition } from 'framer-motion'

/* cubic-bezier(0.16, 1, 0.3, 1) — fast out, long settle */
export const EASE = [0.16, 1, 0.3, 1] as const

export const DUR = {
  fast: 0.2,
  base: 0.4,
  slow: 0.6,
} as const

export const ease = (duration: number = DUR.base, delay = 0): Transition => ({
  duration,
  delay,
  ease: EASE,
})

/* Parent that staggers its children in. */
export const stagger = (staggerChildren = 0.06, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
})

/* Standard rise-and-fade for text and blocks. */
export const rise: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: DUR.slow, ease: EASE } },
}

/* Masked line reveal — wrap each line in an overflow-hidden parent. */
export const maskLine: Variants = {
  hidden: { y: '110%' },
  show: { y: '0%', transition: { duration: DUR.slow, ease: EASE } },
}

/* Media settles from a slight over-scale, never the reverse. */
export const mediaIn: Variants = {
  hidden: { opacity: 0, scale: 1.06 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: EASE } },
}

/* Shared viewport config: fire once, slightly before the block is centred. */
export const inView = { once: true, margin: '-12% 0px -12% 0px' } as const
