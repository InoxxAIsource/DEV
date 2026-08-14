'use client'

import { useRef, useState } from 'react'

/*
  Player for a watch page. Deliberately different from the homepage clips:

  - `controls` and `preload="metadata"`, because here the video is the content
    a visitor came for rather than atmosphere behind copy.
  - Starts paused on its poster. Google treats a prominent, user-playable video
    as the main content of the page; autoplaying muted loops read as decoration,
    which is why the homepage clips were reported as "not on a watch page".
  - The poster carries the frame until play, so there is no layout shift.
*/
export function WatchVideo({
  src,
  poster,
  label,
}: {
  src: string
  poster: string
  label: string
}) {
  const ref = useRef<HTMLVideoElement>(null)
  const [started, setStarted] = useState(false)

  return (
    <div className="relative overflow-hidden rounded-2xl border border-line bg-surface">
      <video
        ref={ref}
        src={src}
        poster={poster}
        controls
        playsInline
        loop
        preload="metadata"
        aria-label={label}
        onPlay={() => setStarted(true)}
        className="block h-auto w-full"
      />

      {!started && (
        <button
          type="button"
          onClick={() => {
            setStarted(true)
            ref.current?.play().catch(() => {})
          }}
          aria-label={`Play ${label}`}
          className="absolute inset-0 grid place-items-center bg-bg/30 transition-colors hover:bg-bg/20"
        >
          <span className="grid size-20 place-items-center rounded-full bg-accent text-bg shadow-[0_16px_44px_-12px_hsl(28_100%_55%/0.6)] transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-105">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M8 5.5v13l11-6.5z" />
            </svg>
          </span>
        </button>
      )}
    </div>
  )
}
