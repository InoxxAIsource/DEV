'use client'

import { useEffect, useState } from 'react'
import { Wordmark } from './Wordmark'

const links = [
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

const TAGLINE = 'AI Engineering Studio • WE WRITE WORKFLOWS™'

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [onLight, setOnLight] = useState(false)

  useEffect(() => {
    const io = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting), {
      threshold: 0,
    })
    const sentinel = document.getElementById('top-sentinel')
    if (sentinel) io.observe(sentinel)
    return () => io.disconnect()
  }, [])

  /*
    Invert the bar over light project worlds. rootMargin collapses the viewport
    to a thin band at the nav's own height, so a section only counts while it is
    actually sitting behind the bar.
  */
  useEffect(() => {
    const sections = document.querySelectorAll('[data-nav-theme]')
    if (!sections.length) return

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setOnLight((e.target as HTMLElement).dataset.navTheme === 'light')
          }
        }
      },
      { rootMargin: '-32px 0px -100% 0px', threshold: 0 },
    )
    sections.forEach((s) => io.observe(s))

    /* Leaving the featured run entirely returns the bar to the dark shell. */
    const onScroll = () => {
      const anyBehind = [...sections].some((s) => {
        const r = s.getBoundingClientRect()
        return r.top <= 40 && r.bottom >= 40
      })
      if (!anyBehind) setOnLight(false)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      io.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  /* Escape closes the drawer; scroll locks while it is open. */
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open])

  const ink = onLight ? 'text-black' : 'text-ink'
  const rule = onLight ? 'bg-black/15' : 'bg-line'
  const dim = onLight ? 'text-black/55' : 'text-muted'

  return (
    /*
      The bar carries its own background, not the <header>. The closed drawer
      still takes layout space inside the header, which made the element 343px
      tall on mobile — styling the header meant the scrolled background and blur
      painted across the top third of the screen. The drawer is now absolutely
      positioned below the bar, so the visible band is bar height at every
      breakpoint.
    */
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`transition-colors duration-500 ${
          scrolled
            ? onLight
              ? 'border-b border-black/10 bg-white/70 backdrop-blur-md'
              : 'border-b border-line bg-bg/80 backdrop-blur-md'
            : 'border-b border-transparent'
        }`}
      >
        <div className="mx-auto flex max-w-[1600px] items-center gap-6 px-6 py-5 md:px-12">
        {/* Brand */}
        <a href="#" aria-label="wwwdot.dev, home" className={`shrink-0 ${ink}`}>
          <Wordmark className="text-[22px]" />
        </a>

        {/* Positioning line, hidden below xl where the bar gets tight */}
        <span aria-hidden="true" className={`hidden h-5 w-px shrink-0 xl:block ${rule}`} />
        <p
          className={`hidden min-w-0 truncate font-mono text-[11px] uppercase tracking-[0.24em] xl:block ${dim}`}
        >
          {TAGLINE}
        </p>

        {/* Links */}
        <nav className="ml-auto hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`text-sm transition-colors duration-300 hover:text-accent ${
                onLight ? 'text-black/70' : 'text-muted'
              }`}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-3 md:ml-0">
          <a
            href="#contact"
            data-cursor="hover"
            className="group hidden items-center gap-2 rounded-full border border-accent px-5 py-2.5 text-sm font-semibold text-accent transition-[transform,background-color,color] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:bg-accent hover:text-bg active:translate-y-0 sm:inline-flex"
          >
            Work With Us
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path
                d="M3 11L11 3M11 3H5M11 3V9"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>

          {/* Mobile menu trigger */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className={`grid size-10 shrink-0 place-items-center rounded-full border backdrop-blur transition-colors duration-500 hover:border-accent/60 md:hidden ${
              onLight ? 'border-black/15 bg-white/70 text-black' : 'border-line bg-bg/80 text-ink'
            }`}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              {open ? (
                <path
                  d="M3 3l12 12M15 3L3 15"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M2 5h14M2 9h14M2 13h14"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer — absolute so it adds no height to the bar */}
      <div
        className={`absolute inset-x-0 top-full pt-2 md:hidden ${
          open ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
        aria-hidden={!open}
      >
        <div
          onClick={() => setOpen(false)}
          className={`fixed inset-0 -z-10 bg-bg/70 backdrop-blur-sm transition-opacity duration-300 ${
            open ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <nav
          className={`mx-6 origin-top rounded-2xl border border-line bg-raised/95 p-2 shadow-[0_20px_60px_hsl(20_10%_2%/0.6)] backdrop-blur-md transition-all duration-300 ${
            open ? 'translate-y-0 opacity-100' : '-translate-y-3 opacity-0'
          }`}
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block rounded-xl px-4 py-3 text-base text-muted transition-colors hover:bg-accent-soft hover:text-ink active:bg-accent-soft"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-1 block rounded-xl bg-accent px-4 py-3 text-center text-base font-semibold text-bg"
          >
            Work With Us
          </a>
        </nav>
      </div>
    </header>
  )
}
