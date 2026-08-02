'use client'

import { useRef, useState, useEffect, type CSSProperties, type PointerEvent } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useReducedMotion,
} from 'framer-motion'
import type { Featured } from '@/data/featured'
import { EASE, DUR, rise, stagger, inView, maskLine } from '@/lib/motion'

/* Palette is published as CSS custom properties so every child — type, rules,
   buttons — retunes to the project without prop-drilling colours. */
function themeVars(p: Featured): CSSProperties {
  return {
    '--p-ink': p.theme.ink,
    '--p-muted': p.theme.muted,
    '--p-line': p.theme.line,
    '--p-accent': p.theme.accent,
    '--p-on-accent': p.theme.onAccent,
  } as CSSProperties
}

export function FeaturedProject({
  project,
  flip,
  onActive,
}: {
  project: Featured
  flip: boolean
  onActive: (color: string | null) => void
}) {
  const root = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()

  /* Scroll parallax: media drifts against the page, never more than a few
     percent, so it reads as depth rather than movement. */
  const { scrollYProgress } = useScroll({
    target: root,
    offset: ['start end', 'end start'],
  })
  /* Both ranges start at identity so the first client frame matches the server
     (which cannot measure scroll and renders transform:none). Flattening under
     reduced motion keeps the style prop present — dropping it conditionally
     renders differently on each side and breaks hydration. */
  const mediaY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '10%'])
  const indexY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '-60%'])

  /* Mouse parallax — spring-damped so it trails the cursor slightly. */
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const sx = useSpring(px, { stiffness: 90, damping: 20, mass: 0.5 })
  const sy = useSpring(py, { stiffness: 90, damping: 20, mass: 0.5 })
  const tiltX = useTransform(sy, [-0.5, 0.5], reduce ? ['0deg', '0deg'] : ['1.6deg', '-1.6deg'])
  const tiltY = useTransform(sx, [-0.5, 0.5], reduce ? ['0deg', '0deg'] : ['-1.6deg', '1.6deg'])

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduce) return
    const r = e.currentTarget.getBoundingClientRect()
    px.set((e.clientX - r.left) / r.width - 0.5)
    py.set((e.clientY - r.top) / r.height - 0.5)
  }
  const onLeave = () => {
    px.set(0)
    py.set(0)
  }

  /*
    Fourteen autoplaying clips would saturate the network and the decoder, so
    src lands only when the project nears the viewport and playback pauses once
    it leaves. The poster carries the frame until then, which also means no
    layout shift. `armed` starts false on both server and client, so hydration
    is unaffected.
  */
  const videoRef = useRef<HTMLVideoElement>(null)
  const [armed, setArmed] = useState(false)

  useEffect(() => {
    const el = videoRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setArmed(true)
          el.play().catch(() => {})
        } else {
          el.pause()
        }
      },
      { rootMargin: '400px 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  /*
    Claim the backdrop while this section owns the middle of the viewport.
    rootMargin collapses the root to a band around the centre line, so exactly
    one section is active at a time and the handover lands mid-gap.
  */
  useEffect(() => {
    const el = root.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) onActive(project.theme.bg)
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [onActive, project.theme.bg])

  return (
    <section
      ref={root}
      id={project.slug}
      style={themeVars(project)}
      /* Nav watches this to invert itself over light worlds. */
      data-nav-theme={project.theme.light ? 'light' : 'dark'}
      className="relative flex min-h-[100svh] items-center py-[12vh] text-[color:var(--p-ink)]"
    >
      <div className="mx-auto grid w-full max-w-[1600px] items-center gap-14 px-6 md:px-12 lg:grid-cols-12 lg:gap-16">
        {/* Media */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 32 },
            show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
          }}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          onPointerMove={onMove}
          onPointerLeave={onLeave}
          style={{ y: mediaY }}
          className={`relative lg:col-span-7 ${flip ? 'lg:order-2 lg:col-start-6' : 'lg:order-1'}`}
        >
          <motion.div
            style={{ rotateX: tiltX, rotateY: tiltY, transformPerspective: 1400 }}
            className="group relative overflow-hidden rounded-[14px] border border-[color:var(--p-line)] shadow-[0_40px_90px_-40px_hsl(0_0%_0%/0.65)] will-change-transform"
          >
            <video
              ref={videoRef}
              src={armed ? project.media : undefined}
              poster={project.poster}
              muted
              loop
              playsInline
              autoPlay
              preload="none"
              className="block h-full w-full object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02]"
            />
          </motion.div>

          {/* Oversized index, bled off the media edge */}
          <motion.span
            aria-hidden="true"
            style={{ y: indexY }}
            className={`pointer-events-none absolute -top-[6vh] hidden select-none font-mono text-[clamp(5rem,11vw,11rem)] font-bold leading-none tracking-[-0.04em] text-[color:var(--p-accent)] opacity-[0.16] lg:block ${
              flip ? '-right-6' : '-left-6'
            }`}
          >
            {project.index}
          </motion.span>
        </motion.div>

        {/* Editorial column */}
        <motion.div
          variants={stagger(0.06)}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className={`lg:col-span-5 ${flip ? 'lg:order-1 lg:col-start-1 lg:pr-4' : 'lg:order-2 lg:pl-4'}`}
        >
          <motion.div variants={rise} className="mb-8 flex items-center gap-4">
            <span className="font-mono text-[11px] font-medium tracking-[0.3em] text-[color:var(--p-accent)]">
              {project.index}
            </span>
            <span className="h-px flex-1 bg-[color:var(--p-line)]" />
            <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[color:var(--p-muted)]">
              {project.year}
            </span>
          </motion.div>

          <h2 className="text-[clamp(2.6rem,5.2vw,4.5rem)] font-semibold leading-[0.98] tracking-[-0.04em]">
            <span className="block overflow-hidden pb-[0.06em]">
              <motion.span variants={maskLine} className="block will-change-transform">
                {project.name}
              </motion.span>
            </span>
          </h2>

          <motion.p
            variants={rise}
            className="mt-5 max-w-[30ch] text-[clamp(1.1rem,1.7vw,1.5rem)] leading-[1.25] tracking-[-0.02em] text-[color:var(--p-accent)]"
          >
            {project.tagline}
          </motion.p>

          <motion.p
            variants={rise}
            className="mt-8 max-w-[46ch] leading-relaxed text-[color:var(--p-muted)]"
          >
            {project.story}
          </motion.p>

          <motion.dl
            variants={rise}
            className="mt-12 grid grid-cols-2 gap-x-10 gap-y-7 border-t border-[color:var(--p-line)] pt-8"
          >
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-[0.26em] text-[color:var(--p-muted)]">
                Role
              </dt>
              <dd className="mt-2 text-sm leading-snug">{project.role}</dd>
            </div>
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-[0.26em] text-[color:var(--p-muted)]">
                Industry
              </dt>
              <dd className="mt-2 text-sm leading-snug">{project.industry}</dd>
            </div>
            <div className="col-span-2">
              <dt className="font-mono text-[10px] uppercase tracking-[0.26em] text-[color:var(--p-muted)]">
                Technologies
              </dt>
              <dd className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
                {project.tech.map((t) => (
                  <span key={t} className="font-mono text-xs text-[color:var(--p-ink)]">
                    {t}
                  </span>
                ))}
              </dd>
            </div>
          </motion.dl>

          <motion.div variants={rise} className="mt-11 flex flex-wrap items-center gap-3">
            <a
              href={project.href ?? `#${project.slug}`}
              data-cursor="hover"
              className="group inline-flex items-center gap-3 rounded-full bg-[color:var(--p-accent)] px-6 py-3.5 text-sm font-semibold text-[color:var(--p-on-accent)] transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 active:translate-y-0"
            >
              Visit experience
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path
                  d="M3 11L11 3M11 3H5M11 3V9"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <a
              href={`#${project.slug}`}
              data-cursor="hover"
              className="inline-flex items-center rounded-full border border-[color:var(--p-line)] px-6 py-3.5 text-sm font-semibold transition-[transform,border-color] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:border-[color:var(--p-accent)] active:translate-y-0"
            >
              Case study
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export { DUR }
