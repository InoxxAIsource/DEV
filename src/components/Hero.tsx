'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from '../lib/Reveal'

gsap.registerPlugin(ScrollTrigger)

export function Hero() {
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    if (prefersReducedMotion() || !root.current) return
    const ctx = gsap.context(() => {
      gsap.to('.mask-line > span', {
        y: 0,
        duration: 1.1,
        stagger: 0.12,
        ease: 'power4.out',
        delay: 0.15,
      })
      gsap.from('.hero-fade', {
        opacity: 0,
        y: 20,
        duration: 0.9,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.7,
      })
      // Floating device parallax: video drifts slower than the page
      gsap.to('.hero-video', {
        yPercent: 14,
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} className="relative min-h-[100dvh] overflow-hidden">
      {/* Hero visual: cinematic floating tablet, warm amber glow */}
      <div className="hero-video absolute inset-0">
        <video
          src="/hero.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover object-[center_22%]"
        />
        {/* warm grade so the cool-toned footage sits in the amber palette */}
        <div className="absolute inset-0 bg-[hsl(28_100%_55%/0.07)] mix-blend-soft-light" />
        <div className="absolute inset-0 bg-bg/45 md:bg-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/70 to-bg/10" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-bg to-transparent" />
      </div>

      <div className="relative mx-auto flex min-h-[100dvh] max-w-[1400px] items-center px-5 pt-20 md:px-10">
        <div className="max-w-2xl">
          <h1 className="text-5xl font-semibold leading-[1.04] tracking-tighter md:text-6xl lg:text-7xl">
            <span className="mask-line">
              <span>I build web,</span>
            </span>
            <span className="mask-line">
              <span>
                blockchain <span className="text-accent">&amp; DeFi.</span>
              </span>
            </span>
          </h1>

          <p className="hero-fade mt-6 max-w-md text-lg leading-relaxed text-muted">
            Production-grade platforms for founders, startups and businesses.
          </p>

          <div className="hero-fade mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#work"
              className="rounded-full bg-accent px-7 py-3.5 font-semibold text-bg transition-transform hover:brightness-110 active:scale-[0.98]"
            >
              See my work
            </a>
            <a
              href="#contact"
              className="rounded-full border border-line bg-bg/50 px-7 py-3.5 font-semibold text-ink backdrop-blur transition-colors hover:border-accent/50 active:scale-[0.98]"
            >
              Start a project
            </a>
          </div>

          <p className="hero-fade mt-8 font-mono text-xs tracking-wide text-muted">
            Independent engineer. Secure, scalable, shipped fast.
          </p>
        </div>
      </div>
    </section>
  )
}
