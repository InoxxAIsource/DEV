'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { featured, shellTheme } from '@/data/featured'
import { FeaturedProject } from './FeaturedProject'

/*
  Drives a fixed backdrop whose colour interpolates across the featured run.
  It sits at the shell colour at both ends, so outside this stretch it is
  invisible against the page and the hero/archive are unaffected.

  Each project holds its colour for most of its viewport and crossfades over a
  ~10% band at the boundary, which is what makes moving between projects read
  as entering a different product rather than crossing a seam.
*/
const STOPS = [0, 0.06, 0.27, 0.37, 0.62, 0.72, 0.94, 1]

export function FeaturedWork() {
  const root = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: root,
    offset: ['start end', 'end start'],
  })

  const [a, b, c] = featured
  const background = useTransform(scrollYProgress, STOPS, [
    shellTheme.bg,
    a.theme.bg,
    a.theme.bg,
    b.theme.bg,
    b.theme.bg,
    c.theme.bg,
    c.theme.bg,
    shellTheme.bg,
  ])

  return (
    <div ref={root} id="work" className="relative">
      <motion.div
        aria-hidden="true"
        style={{ background }}
        className="pointer-events-none fixed inset-0 -z-10"
      />
      {featured.map((p, i) => (
        <FeaturedProject key={p.slug} project={p} flip={i % 2 === 1} />
      ))}
    </div>
  )
}
