'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { EASE, DUR, maskLine, stagger } from '@/lib/motion'

const LINES = ['Engineering AI Products', 'That Scale.']

const TRUST = [
  'AI Products',
  'SaaS Platforms',
  'AI Agents',
  'Full-Stack Engineering',
  'Cloud Infrastructure',
]

export function Hero() {
  const root = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()

  /* Ambient drift only — the hero never pins or hijacks the scroll. */
  const { scrollYProgress } = useScroll({
    target: root,
    offset: ['start start', 'end start'],
  })
  /* Ranges flatten under reduced motion rather than the style prop being
     dropped — a conditional style prop renders differently on server and
     client and breaks hydration. At progress 0 both variants are identity,
     so the markup matches either way. */
  const mediaY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '16%'])
  const mediaScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.12])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '38%'])
  const contentFade = useTransform(scrollYProgress, [0, 0.7], [1, reduce ? 1 : 0])

  return (
    <section
      ref={root}
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden"
    >
      {/* Ambient layer */}
      <motion.div
        style={{ y: mediaY, scale: mediaScale }}
        className="absolute inset-0 will-change-transform"
      >
        <video
          src="/hero.mp4"
          poster="/posters/hero.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="h-full w-full object-cover object-[center_20%]"
        />
        {/* Grade the footage into the amber shell, then sink it back so the
            type carries the frame rather than competing with it. */}
        <div className="absolute inset-0 bg-[hsl(28_100%_55%/0.06)] mix-blend-soft-light" />
        <div className="absolute inset-0 bg-bg/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-bg/70" />
      </motion.div>

      <motion.div
        style={{ y: contentY, opacity: contentFade }}
        /* pt clears the fixed nav: the longer studio copy made the content tall
           enough to slide under it. pb trimmed to keep the hero at one viewport. */
        className="relative mx-auto w-full max-w-[1600px] px-6 pb-[9vh] pt-28 md:px-12"
      >
        <motion.div variants={stagger(0.08, 0.15)} initial="hidden" animate="show">
          <motion.p
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { duration: DUR.slow, ease: EASE } },
            }}
            className="mb-8 flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.32em] text-accent"
          >
            <span aria-hidden="true" className="h-px w-9 bg-accent" />
            WE WRITE WORKFLOWS™
          </motion.p>

          <h1 className="max-w-[16ch] text-[clamp(2.9rem,8.2vw,8.5rem)] font-semibold leading-[0.92] tracking-[-0.045em]">
            {LINES.map((line, i) => (
              <span key={line} className="block overflow-hidden pb-[0.06em]">
                <motion.span variants={maskLine} className="block will-change-transform">
                  {i === LINES.length - 1 ? <span className="text-accent">{line}</span> : line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: {
                opacity: 1,
                y: 0,
                transition: { duration: DUR.slow, ease: EASE, delay: 0.05 },
              },
            }}
            className="mt-7 max-w-[62ch] text-lg leading-relaxed text-muted md:text-xl"
          >
            We partner with startups and enterprises to design, engineer and launch AI products,
            SaaS platforms, automation systems and interactive digital experiences that are built
            for performance, scalability and long-term growth.
          </motion.p>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: {
                opacity: 1,
                y: 0,
                transition: { duration: DUR.slow, ease: EASE, delay: 0.1 },
              },
            }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <a
              href="#contact"
              data-cursor="hover"
              className="group inline-flex items-center gap-3 rounded-full bg-accent px-7 py-4 text-[15px] font-semibold text-bg transition-[transform,box-shadow] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:shadow-[0_12px_32px_-8px_hsl(28_100%_55%/0.5)] active:translate-y-0"
            >
              Work With Us
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
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
              href="#work"
              data-cursor="hover"
              className="inline-flex items-center gap-3 rounded-full border border-line bg-raised/70 px-7 py-4 text-[15px] font-semibold text-ink backdrop-blur-sm transition-[transform,border-color] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:border-accent/50 active:translate-y-0"
            >
              Explore Our Work
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path
                  d="M3 11L11 3M11 3H5M11 3V9"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </motion.div>

          {/* Trust line — same mono treatment as the eyebrow, no new patterns */}
          <motion.ul
            variants={{
              hidden: { opacity: 0, y: 16 },
              show: {
                opacity: 1,
                y: 0,
                transition: { duration: DUR.slow, ease: EASE, delay: 0.16 },
              },
            }}
            className="mt-9 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted"
          >
            {TRUST.map((t, i) => (
              <li key={t} className="flex items-center gap-4">
                {i > 0 && (
                  <span aria-hidden="true" className="text-accent">
                    •
                  </span>
                )}
                {t}
              </li>
            ))}
          </motion.ul>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: DUR.slow, delay: 1.1, ease: EASE }}
        className="relative mx-auto w-full max-w-[1600px] px-6 pb-8 md:px-12"
      >
        <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-faint">
          <span className="h-px w-10 bg-line" />
          Scroll
        </div>
      </motion.div>
    </section>
  )
}
