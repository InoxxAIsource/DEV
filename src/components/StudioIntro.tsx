'use client'

import { motion } from 'framer-motion'
import { rise, stagger, inView, maskLine } from '@/lib/motion'

const STATEMENT = [
  'Most software is used.',
  'A little of it is',
  'remembered.',
]

export function StudioIntro() {
  return (
    /* keeps the #about anchor alive — this section replaced the About block */
    <section id="about" className="relative mx-auto max-w-[1600px] px-6 py-[18vh] md:px-12">
      <motion.div
        variants={stagger(0.07)}
        initial="hidden"
        whileInView="show"
        viewport={inView}
        className="grid gap-16 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-24"
      >
        <div>
          <motion.p
            variants={rise}
            className="mb-12 font-mono text-[11px] uppercase tracking-[0.32em] text-muted"
          >
            The practice
          </motion.p>

          <h2 className="max-w-[14ch] text-[clamp(2.2rem,5.4vw,4.75rem)] font-semibold leading-[1.02] tracking-[-0.035em]">
            {STATEMENT.map((line, i) => (
              <span key={line} className="block overflow-hidden pb-[0.06em]">
                <motion.span variants={maskLine} className="block will-change-transform">
                  {i === STATEMENT.length - 1 ? (
                    <span className="text-accent">{line}</span>
                  ) : (
                    line
                  )}
                </motion.span>
              </span>
            ))}
          </h2>

          <motion.p
            variants={rise}
            className="mt-12 max-w-[46ch] text-lg leading-relaxed text-muted md:text-xl"
          >
            I work solo and directly with founders — no agency layer, no account manager,
            no handoff between the person who designs it and the person who ships it.
            Web, blockchain and AI products taken from idea to production.
          </motion.p>
        </div>

        <motion.dl
          variants={rise}
          className="grid shrink-0 grid-cols-2 gap-x-14 gap-y-10 lg:grid-cols-1 lg:gap-y-12"
        >
          {[
            ['50+', 'Projects delivered'],
            ['9', 'Disciplines'],
            ['24/7', 'Direct access'],
          ].map(([value, label]) => (
            <div key={label}>
              <dt className="font-mono text-[10px] uppercase tracking-[0.28em] text-faint">
                {label}
              </dt>
              <dd className="mt-2 text-[clamp(2rem,3.4vw,3rem)] font-semibold leading-none tracking-[-0.03em]">
                {value}
              </dd>
            </div>
          ))}
        </motion.dl>
      </motion.div>
    </section>
  )
}
