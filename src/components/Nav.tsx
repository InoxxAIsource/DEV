'use client'

import { useEffect, useState } from 'react'

const links = [
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const io = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting), {
      threshold: 0,
    })
    const sentinel = document.getElementById('top-sentinel')
    if (sentinel) io.observe(sentinel)
    return () => io.disconnect()
  }, [])

  /* close on Escape, and lock scroll while the drawer is open */
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

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-4 md:px-10">
        <a
          href="#"
          aria-label="Mohd Tauheed, home"
          className="grid size-10 place-items-center rounded-full border border-line bg-bg/80 font-mono text-sm font-bold tracking-tight text-ink backdrop-blur transition-colors hover:border-accent/60"
        >
          MT
        </a>

        <nav
          className={`hidden items-center gap-1 rounded-full border px-2 py-1.5 backdrop-blur-md transition-all duration-500 md:flex ${
            scrolled ? 'border-line bg-raised/85 shadow-[0_8px_30px_hsl(20_10%_2%/0.5)]' : 'border-line/60 bg-bg/40'
          }`}
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-4 py-1.5 text-sm text-muted transition-colors hover:bg-accent-soft hover:text-ink"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-bg transition-transform hover:brightness-110 active:scale-[0.98] md:px-5"
          >
            Start a project
          </a>

          {/* Mobile menu trigger — the nav pill above is desktop-only */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="grid size-10 shrink-0 place-items-center rounded-full border border-line bg-bg/80 text-ink backdrop-blur transition-colors hover:border-accent/60 md:hidden"
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

      {/* Mobile drawer */}
      <div
        className={`md:hidden ${open ? 'pointer-events-auto' : 'pointer-events-none'}`}
        aria-hidden={!open}
      >
        <div
          onClick={() => setOpen(false)}
          className={`fixed inset-0 -z-10 bg-bg/70 backdrop-blur-sm transition-opacity duration-300 ${
            open ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <nav
          className={`mx-5 origin-top rounded-2xl border border-line bg-raised/95 p-2 shadow-[0_20px_60px_hsl(20_10%_2%/0.6)] backdrop-blur-md transition-all duration-300 ${
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
        </nav>
      </div>
    </header>
  )
}
