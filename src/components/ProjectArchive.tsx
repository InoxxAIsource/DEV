'use client'

import { useRef, useState, type PointerEvent } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'
import { archive } from '@/data/archive'
import { EASE, DUR, rise, stagger, inView } from '@/lib/motion'

export function ProjectArchive() {
  const reduce = useReducedMotion()
  const [active, setActive] = useState<number | null>(null)
  const wrap = useRef<HTMLDivElement>(null)

  /* Preview trails the cursor. Spring damping keeps it from feeling glued on. */
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 140, damping: 22, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 140, damping: 22, mass: 0.4 })

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduce || !wrap.current) return
    const r = wrap.current.getBoundingClientRect()
    x.set(e.clientX - r.left)
    y.set(e.clientY - r.top)
  }

  return (
    <section className="relative mx-auto max-w-[1600px] px-6 py-[16vh] md:px-12">
      <motion.div
        variants={stagger(0.05)}
        initial="hidden"
        whileInView="show"
        viewport={inView}
      >
        <motion.div
          variants={rise}
          className="mb-14 flex items-baseline justify-between gap-6 border-b border-line pb-6"
        >
          <h2 className="font-mono text-[11px] uppercase tracking-[0.32em] text-muted">
            Selected archive
          </h2>
          <span className="font-mono text-[11px] tracking-[0.2em] text-faint">
            {String(archive.length).padStart(2, '0')}
          </span>
        </motion.div>

        <div ref={wrap} onPointerMove={onMove} className="relative">
          {/* Cursor-following preview — desktop only, purely decorative */}
          <motion.div
            aria-hidden="true"
            style={{ x: sx, y: sy, translateX: '-50%', translateY: '-50%' }}
            animate={{ opacity: active === null ? 0 : 1, scale: active === null ? 0.94 : 1 }}
            transition={{ duration: DUR.fast, ease: EASE }}
            className="pointer-events-none absolute left-0 top-0 z-20 hidden h-[190px] w-[330px] overflow-hidden rounded-lg border border-line shadow-[0_30px_70px_-30px_hsl(0_0%_0%/0.8)] lg:block"
          >
            {active !== null && (
              <img
                src={archive[active].poster}
                alt=""
                className="h-full w-full object-cover"
                loading="lazy"
                decoding="async"
              />
            )}
          </motion.div>

          <ul onPointerLeave={() => setActive(null)}>
            {archive.map((item, i) => (
              <motion.li key={item.name} variants={rise}>
                <a
                  href="#contact"
                  data-cursor="hover"
                  onPointerEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onBlur={() => setActive(null)}
                  className="group grid grid-cols-[auto_1fr_auto] items-baseline gap-5 border-b border-line py-6 transition-colors duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-accent/40 md:gap-8 md:py-7"
                >
                  <span className="font-mono text-[11px] tabular-nums text-faint transition-colors duration-300 group-hover:text-accent">
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  <span className="flex flex-wrap items-baseline gap-x-5 gap-y-1">
                    <span className="text-[clamp(1.35rem,3vw,2.35rem)] font-semibold tracking-[-0.03em] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5">
                      {item.name}
                    </span>
                    <span className="text-sm text-muted">{item.discipline}</span>
                  </span>

                  <span className="font-mono text-[11px] tabular-nums text-faint">
                    {item.year}
                  </span>
                </a>
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>
    </section>
  )
}
