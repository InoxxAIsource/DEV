'use client'

import { useRef, useState, useEffect, useCallback, type PointerEvent } from 'react'
import { createPortal } from 'react-dom'
import { gsap } from 'gsap'
import { Reveal, prefersReducedMotion } from '../lib/Reveal'

const projects = [
  {
    name: 'HYPE Terminal',
    media: '/work/terminal.mp4',
    desc: 'Pro crypto DEX trading terminal with real-time charts and on-chain execution.',
    tags: ['React', 'WebSocket', 'Web3'],
    hue: 'from-[hsl(160_60%_14%)] to-[hsl(180_30%_6%)]',
    noZoom: true,
    /* container matches the recording's native 1920x936 so nothing is cropped */
    aspect: 'aspect-[1920/936]',
  },
  {
    name: 'ORCHESTRA',
    media: '/work/orchestr.mp4',
    desc: 'AI orchestration platform routing GPT, Claude and Gemini through one layer.',
    tags: ['Next.js', 'MCP', 'OpenAI'],
    hue: 'from-[hsl(250_55%_16%)] to-[hsl(230_30%_6%)]',
    noZoom: true,
    /* native 1862x932 */
    aspect: 'aspect-[1862/932]',
  },
  {
    name: 'ORCHESTRA Console',
    media: '/work/ai-orchestra.mp4',
    desc: 'Live multi-agent network — route, inspect and trace runs in real time.',
    tags: ['React', 'WebSocket', 'D3.js'],
    hue: 'from-[hsl(250_40%_18%)] to-[hsl(235_25%_7%)]',
    noZoom: true,
    /* native 1880x910 */
    aspect: 'aspect-[1880/910]',
  },
  {
    name: 'FactoryOS',
    media: '/work/factory-os.mp4',
    desc: 'Industrial OS coordinating robotic assembly, vision and maintenance in real time.',
    tags: ['Next.js', 'IoT', 'Python'],
    hue: 'from-[hsl(200_45%_15%)] to-[hsl(210_25%_6%)]',
    noZoom: true,
    /* native 1904x940 */
    aspect: 'aspect-[1904/940]',
  },
  {
    name: 'AUREN',
    media: '/work/auren.mp4',
    desc: 'Luxury fashion house editorial with campaign films and seasonal lookbooks.',
    tags: ['Next.js', 'GSAP', 'Sanity'],
    hue: 'from-[hsl(35_45%_16%)] to-[hsl(28_25%_7%)]',
    noZoom: true,
    /* native 1912x940 */
    aspect: 'aspect-[1912/940]',
  },
  {
    name: 'AXIOM',
    media: '/work/axiom.mp4',
    desc: 'Landing experience for a crypto AI agent platform.',
    tags: ['React', 'GSAP', 'Three.js'],
    hue: 'from-[hsl(28_80%_18%)] to-[hsl(20_40%_8%)]',
  },
  {
    name: 'YAP',
    media: '/work/yap.mp4',
    desc: 'Playful AI-avatar app that turns a one-word vibe into a character.',
    tags: ['React', 'Node.js', 'OpenAI'],
    hue: 'from-[hsl(34_60%_16%)] to-[hsl(24_30%_7%)]',
  },
  {
    name: 'VIVID',
    media: '/work/vivid.mp4',
    desc: 'Fashion eyewear ecommerce with cinematic product pages.',
    tags: ['Next.js', 'Shopify', 'GSAP'],
    hue: 'from-[hsl(20_50%_15%)] to-[hsl(28_35%_7%)]',
  },
  {
    name: 'GeoIQ',
    media: '/work/geoiq.mp4',
    desc: 'SaaS that tracks brand visibility inside AI search.',
    tags: ['React', 'PostgreSQL', 'OpenAI'],
    hue: 'from-[hsl(30_70%_16%)] to-[hsl(18_30%_6%)]',
  },
  {
    name: 'AURA',
    media: '/work/aura.mp4',
    desc: 'Luxury residence tower landing with a cinematic 3D hero.',
    tags: ['Next.js', 'GSAP', 'Three.js'],
    hue: 'from-[hsl(36_60%_15%)] to-[hsl(26_30%_6%)]',
  },
  {
    name: 'PREDIKT',
    media: '/work/predikt.mp4',
    desc: 'Prediction market app with on-chain settlement.',
    tags: ['Solidity', 'React', 'The Graph'],
    hue: 'from-[hsl(32_55%_15%)] to-[hsl(20_35%_6%)]',
  },
  {
    name: 'P2PxBT',
    media: '/work/p2p.mp4',
    desc: 'Peer-to-peer crypto exchange with escrow-protected trades.',
    tags: ['React', 'Node.js', 'Web3'],
    hue: 'from-[hsl(28_70%_16%)] to-[hsl(22_32%_6%)]',
  },
  {
    name: 'L1 Chain',
    media: '/work/l1.mp4',
    desc: 'Custom Layer 1 blockchain with PoS consensus and EVM compatibility.',
    tags: ['Rust', 'Solidity', 'Go'],
    hue: 'from-[hsl(220_60%_16%)] to-[hsl(240_30%_6%)]',
    noZoom: true,
  },
]

/* ——— Lightbox ———————————————————————————————————————————————————————————— */

type LightboxProject = (typeof projects)[number]

function VideoLightbox({
  project,
  originRect,
  onClose,
}: {
  project: LightboxProject
  originRect: DOMRect
  onClose: () => void
}) {
  const backdropRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  /* Animate in: scale from card's bounding rect to centered modal */
  useEffect(() => {
    const panel = panelRef.current
    const backdrop = backdropRef.current
    if (!panel || !backdrop) return

    const vw = window.innerWidth
    const vh = window.innerHeight

    /* Card centre in viewport coords */
    const ox = originRect.left + originRect.width / 2
    const oy = originRect.top + originRect.height / 2

    /* Target modal dimensions */
    const tw = Math.min(vw * 0.9, 1280)
    const th = tw * (9 / 16)
    const clampedH = Math.min(th, vh * 0.85)
    const clampedW = clampedH * (16 / 9)

    /* Scale from card size to modal size */
    const scaleX = originRect.width / clampedW

    /* Translate from card centre to viewport centre */
    const dx = ox - vw / 2
    const dy = oy - vh / 2

    if (prefersReducedMotion()) {
      gsap.set(backdrop, { opacity: 1 })
      gsap.set(panel, { opacity: 1, scale: 1, x: 0, y: 0 })
    } else {
      gsap.fromTo(
        backdrop,
        { opacity: 0 },
        { opacity: 1, duration: 0.35, ease: 'power2.out' },
      )
      gsap.fromTo(
        panel,
        { scale: scaleX, x: dx, y: dy, opacity: 0.6 },
        {
          scale: 1,
          x: 0,
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: 'expo.out',
        },
      )
    }

    /* Auto-play */
    videoRef.current?.play().catch(() => {})
  }, [originRect])

  const close = useCallback(() => {
    const panel = panelRef.current
    const backdrop = backdropRef.current
    if (!panel || !backdrop) { onClose(); return }

    if (prefersReducedMotion()) { onClose(); return }

    const vw = window.innerWidth
    const vh = window.innerHeight
    const ox = originRect.left + originRect.width / 2
    const oy = originRect.top + originRect.height / 2
    const tw = Math.min(vw * 0.9, 1280)
    const th = tw * (9 / 16)
    const clampedH = Math.min(th, vh * 0.85)
    const clampedW = clampedH * (16 / 9)
    const scaleX = originRect.width / clampedW
    const scaleY = originRect.height / clampedH
    const dx = ox - vw / 2
    const dy = oy - vh / 2

    const tl = gsap.timeline({ onComplete: onClose })
    tl.to(panel, { scale: Math.min(scaleX, scaleY), x: dx, y: dy, opacity: 0, duration: 0.38, ease: 'expo.in' }, 0)
    tl.to(backdrop, { opacity: 0, duration: 0.3, ease: 'power2.in' }, 0)
  }, [onClose, originRect])

  /* Escape key */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') close() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [close])

  /* Lock body scroll */
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [])

  return createPortal(
    <div
      ref={backdropRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{ background: 'hsla(0 0% 0% / 0.88)', backdropFilter: 'blur(6px)' }}
      onClick={close}
    >
      <div
        ref={panelRef}
        className="relative w-[96vw] max-w-[1280px] sm:w-[90vw]"
        style={{ maxHeight: '90vh' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button — sits inside the panel on phones so it can't clip off-screen */}
        <button
          onClick={close}
          className="absolute right-1 top-1 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/70 text-white backdrop-blur transition-colors hover:border-accent hover:bg-accent sm:-right-3 sm:-top-3"
          aria-label="Close"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        {/* Video — object-contain at the clip's own ratio, so ultra-wide
            recordings are never cropped and fill the width on phones */}
        <div className={`overflow-hidden rounded-2xl bg-gradient-to-br ${project.hue}`}>
          <video
            ref={videoRef}
            src={project.media}
            muted
            loop
            playsInline
            controls
            className="max-h-[72vh] w-full object-contain"
          />
        </div>

        {/* Info bar */}
        <div className="flex flex-col gap-2 px-1 pt-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:pt-4">
          <div className="min-w-0">
            <h3 className="text-base font-semibold tracking-tight text-white sm:text-lg">
              {project.name}
            </h3>
            <p className="mt-0.5 text-xs text-white/50 sm:text-sm">{project.desc}</p>
          </div>
          <div className="flex flex-wrap gap-1.5 sm:shrink-0 sm:justify-end">
            {project.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/15 px-2.5 py-1 font-mono text-[11px] text-white/50"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
}

/* ——— Lazy video ————————————————————————————————————————————————————————————
   Ten autoplaying videos at once saturates the network and the decoder —
   fetches get aborted and playback stutters. Gate both on visibility:
   attach src only when the card nears the viewport, pause once it leaves. */

function useLazyVideo(enabled: boolean) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    const el = wrapRef.current
    if (!enabled || !el) return

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true)
          videoRef.current?.play().catch(() => {})
        } else {
          videoRef.current?.pause()
        }
      },
      /* preload a screenful ahead so it's already running when scrolled to */
      { rootMargin: '300px 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [enabled])

  return { wrapRef, videoRef, shouldLoad }
}

/* ——— TiltCard ———————————————————————————————————————————————————————————— */

function TiltCard({
  project,
  index,
  featured = false,
  onOpen,
}: {
  project: (typeof projects)[number]
  index: number
  featured?: boolean
  onOpen: (rect: DOMRect) => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [mediaOk, setMediaOk] = useState(true)
  const { wrapRef, videoRef, shouldLoad } = useLazyVideo(mediaOk)

  const onMove = (e: PointerEvent) => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return
    /* tilt is a hover affordance — on touch it just sticks after a drag */
    if (window.matchMedia('(pointer: coarse)').matches) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    el.style.transform = `perspective(900px) rotateY(${px * 7}deg) rotateX(${-py * 7}deg) translateZ(0)`
  }
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = ''
  }

  const handleClick = () => {
    const mediaEl = ref.current?.querySelector('.card-media-wrap')
    const rect = mediaEl
      ? mediaEl.getBoundingClientRect()
      : ref.current?.getBoundingClientRect() ?? new DOMRect()
    onOpen(rect)
  }

  return (
    <Reveal delay={(index % 2) * 100}>
      <div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        onClick={handleClick}
        className="group cursor-pointer rounded-2xl border border-line bg-surface p-2 transition-[transform,border-color] duration-300 ease-out will-change-transform hover:border-accent/40 sm:p-3"
      >
        <div
          ref={wrapRef}
          className={`card-media-wrap relative overflow-hidden rounded-xl bg-gradient-to-br ${'aspect' in project && project.aspect ? project.aspect : featured ? 'aspect-[16/10] md:aspect-[21/9]' : 'aspect-[16/10]'} ${project.hue}`}
        >
          {/* Tap/hover affordance — always visible on touch, hover-only on desktop */}
          <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center opacity-100 transition-opacity duration-200 sm:opacity-0 sm:group-hover:opacity-100">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-black/50 backdrop-blur sm:h-14 sm:w-14">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" className="ml-0.5 text-white">
                <path d="M6.5 4.5l10 5.5-10 5.5V4.5z" />
              </svg>
            </div>
          </div>

          {mediaOk ? (
            <video
              ref={videoRef}
              /* src lands only once the card nears the viewport */
              src={shouldLoad ? project.media : undefined}
              muted
              loop
              playsInline
              autoPlay
              preload="none"
              onError={() => setMediaOk(false)}
              className={`h-full w-full object-cover pointer-events-none ${'noZoom' in project && project.noZoom ? '' : 'scale-[1.08]'}`}
            />
          ) : (
            <div className="grid h-full w-full place-items-center">
              <span className="font-mono text-3xl font-bold tracking-[0.3em] text-ink/25">
                {project.name}
              </span>
            </div>
          )}
        </div>

        {/* stacks on phones — side-by-side clipped the tags and squeezed the copy */}
        <div className="flex flex-col gap-3 px-3 pb-3 pt-5 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
          <div className="min-w-0">
            <h3 className="text-lg font-semibold tracking-tight sm:text-xl">{project.name}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">{project.desc}</p>
          </div>
          <div className="flex flex-wrap gap-1.5 sm:shrink-0 sm:justify-end sm:pt-1">
            {project.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-line px-2.5 py-1 font-mono text-[11px] text-muted"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  )
}

/* ——— Work section ———————————————————————————————————————————————————————— */

export function Work() {
  const [lightbox, setLightbox] = useState<{
    project: LightboxProject
    rect: DOMRect
  } | null>(null)

  return (
    <section id="work" className="mx-auto max-w-[1400px] px-4 py-24 sm:px-5 md:px-10 md:py-32">
      <Reveal>
        <h2 className="max-w-xl text-4xl font-semibold tracking-tighter md:text-5xl">
          Selected work
        </h2>
        <p className="mt-4 max-w-md text-muted">
          Recent products shipped for founders and startups.
        </p>
      </Reveal>
      <div className="mt-14 grid gap-6">
        {projects.map((p, i) => (
          <TiltCard
            key={p.name}
            project={p}
            index={i}
            featured
            onOpen={(rect) => setLightbox({ project: p, rect })}
          />
        ))}
      </div>

      {lightbox && (
        <VideoLightbox
          project={lightbox.project}
          originRect={lightbox.rect}
          onClose={() => setLightbox(null)}
        />
      )}
    </section>
  )
}
