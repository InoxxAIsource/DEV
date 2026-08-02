'use client'

import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from '../lib/Reveal'

const stats = [
  { value: 35, suffix: '+', label: 'Projects shipped' },
  { value: 50, suffix: '+', label: 'Smart contracts deployed' },
  { value: 8, suffix: '', label: 'Chains worked on' },
  { value: 6, suffix: '', label: 'Years building' },
]

function CountUp({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (prefersReducedMotion()) {
      el.textContent = `${value}${suffix}`
      return
    }
    let raf = 0
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        io.disconnect()
        const start = performance.now()
        const dur = 1400
        const tick = (now: number) => {
          const p = Math.min((now - start) / dur, 1)
          const eased = 1 - Math.pow(1 - p, 3)
          el.textContent = `${Math.round(value * eased)}${suffix}`
          if (p < 1) raf = requestAnimationFrame(tick)
        }
        raf = requestAnimationFrame(tick)
      },
      { threshold: 0.5 },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [value, suffix])

  return <span ref={ref}>0{suffix}</span>
}

export function Stats() {
  return (
    <section className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-32">
      <div className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
        {stats.map((s, i) => (
          <div key={s.label} className={i > 0 ? 'lg:border-l lg:border-line lg:pl-10' : ''}>
            <div className="font-mono text-5xl font-bold tracking-tight text-ink md:text-6xl">
              <CountUp value={s.value} suffix={s.suffix} />
            </div>
            <p className="mt-3 text-sm text-muted">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
