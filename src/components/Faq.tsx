'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Reveal } from '../lib/Reveal'
/* shared with the FAQPage JSON-LD — see src/data/site.ts */
import { faqs } from '../data/site'

export function Faq() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-32">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr]">
        <Reveal>
          <h2 className="text-4xl font-semibold tracking-tighter md:text-5xl">
            Common questions
          </h2>
        </Reveal>

        <div>
          {faqs.map((f, i) => {
            const isOpen = open === i
            return (
              <Reveal key={f.q} delay={i * 60}>
                <div className="border-b border-line">
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left"
                  >
                    <span className="font-semibold tracking-tight md:text-lg">{f.q}</span>
                    <Plus
                      size={20}
                      strokeWidth={1.75}
                      className={`shrink-0 text-accent transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}
                    />
                  </button>
                  <div
                    className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-xl pb-6 text-sm leading-relaxed text-muted">{f.a}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
