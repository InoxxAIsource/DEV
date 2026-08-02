'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { featured, shellTheme } from '@/data/featured'
import { FeaturedProject } from './FeaturedProject'

/*
  A fixed backdrop that carries whichever world is currently centred.

  Earlier this interpolated across scroll progress with stops derived from the
  project count, which assumed every section was exactly one viewport tall.
  They are not — copy length varies — so the colour drifted and projects were
  read mid-crossfade. Each section now reports when it takes the centre of the
  viewport and the backdrop transitions to its colour, which is exact
  regardless of height and costs one CSS transition.
*/
export function FeaturedWork() {
  const root = useRef<HTMLDivElement>(null)
  const [bg, setBg] = useState(shellTheme.bg)

  const onActive = useCallback((color: string | null) => {
    setBg(color ?? shellTheme.bg)
  }, [])

  /* Release the backdrop once the whole run leaves the centre band, otherwise
     the last project's colour would bleed into Process and everything after. */
  useEffect(() => {
    const el = root.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) setBg(shellTheme.bg)
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={root} id="work" className="relative">
      <div
        aria-hidden="true"
        style={{
          backgroundColor: bg,
          transition: 'background-color 700ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        className="pointer-events-none fixed inset-0 -z-10"
      />
      {featured.map((p, i) => (
        <FeaturedProject key={p.slug} project={p} flip={i % 2 === 1} onActive={onActive} />
      ))}
    </div>
  )
}
