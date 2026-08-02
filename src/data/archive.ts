/*
  Everything outside the three featured experiences. Presented as a
  typographic index rather than a grid — the depth of work stays visible
  without competing with the featured run.
*/
export type ArchiveItem = {
  name: string
  discipline: string
  year: string
  poster: string
}

export const archive: ArchiveItem[] = [
  { name: 'HYPE Terminal', discipline: 'DEX trading terminal', year: '2026', poster: '/posters/terminal.jpg' },
  { name: 'ORCHESTRA', discipline: 'AI orchestration platform', year: '2026', poster: '/posters/orchestr.jpg' },
  { name: 'ORCHESTRA Console', discipline: 'Multi-agent network', year: '2026', poster: '/posters/ai-orchestra.jpg' },
  { name: 'AXIOM', discipline: 'Crypto AI agent platform', year: '2025', poster: '/posters/axiom.jpg' },
  { name: 'L1 Chain', discipline: 'Layer 1 blockchain', year: '2025', poster: '/posters/l1.jpg' },
  { name: 'P2PxBT', discipline: 'P2P crypto exchange', year: '2025', poster: '/posters/p2p.jpg' },
  { name: 'PREDIKT', discipline: 'Prediction market', year: '2025', poster: '/posters/predikt.jpg' },
  { name: 'GeoIQ', discipline: 'AI search visibility SaaS', year: '2025', poster: '/posters/geoiq.jpg' },
  { name: 'AURA', discipline: 'Luxury residence tower', year: '2025', poster: '/posters/aura.jpg' },
  { name: 'VIVID', discipline: 'Eyewear ecommerce', year: '2025', poster: '/posters/vivid.jpg' },
  { name: 'YAP', discipline: 'AI avatar app', year: '2025', poster: '/posters/yap.jpg' },
]
