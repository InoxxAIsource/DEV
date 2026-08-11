/*
  Every project is a world.

  Palettes were sampled from each recording's poster frame (average colour for
  the world, most-saturated legible pixel for the accent) then hand-tuned where
  the sample was too dark or desaturated to read as type.

  Light and dark worlds alternate so the run has rhythm rather than fourteen
  variations of the same darkness. `light: true` tells the nav to invert.

  FeaturedWork interpolates a fixed backdrop across theme.bg, so crossing from
  one project to the next reads as entering a different product.
*/

export type Theme = {
  bg: string
  ink: string
  muted: string
  line: string
  accent: string
  onAccent: string
  light?: boolean
}

export type Featured = {
  slug: string
  index: string
  name: string
  tagline: string
  story: string
  role: string
  industry: string
  year: string
  tech: string[]
  media: string
  poster: string
  href?: string
  theme: Theme
}

/* Two bases keep contrast honest without writing six values fourteen times. */
const dark = (bg: string, line: string, accent: string): Theme => ({
  bg,
  ink: 'hsl(210 30% 96%)',
  muted: 'hsl(212 14% 62%)',
  line,
  accent,
  onAccent: bg,
})

const light = (bg: string, line: string, accent: string, onAccent = bg): Theme => ({
  bg,
  ink: 'hsl(220 18% 10%)',
  muted: 'hsl(220 8% 38%)',
  line,
  accent,
  onAccent,
  light: true,
})

export const featured: Featured[] = [
  {
    slug: 'factoryos',
    index: '01',
    name: 'FactoryOS',
    tagline: 'Autonomous manufacturing, one control plane.',
    story:
      'Robotic assembly, computer vision and predictive maintenance coordinated from a single operational view. Every station on the floor reports live, so the people running the line see the same truth the machines do.',
    role: 'Design & Full-Stack Engineering',
    industry: 'Industrial Automation',
    year: '2026',
    tech: ['Next.js', 'IoT', 'Python', 'WebSocket'],
    media: '/work/factory-os.mp4',
    poster: '/posters/factory-os.jpg',
    theme: dark('hsl(213 44% 7%)', 'hsl(211 30% 18%)', 'hsl(203 92% 62%)'),
  },
  {
    slug: 'auren',
    index: '02',
    name: 'AUREN',
    tagline: "Luxury isn't loud. It's remembered.",
    story:
      'A fashion house presented as an editorial, not a storefront. Campaign films, seasonal lookbooks and craft stories carry the weight, with restraint doing the selling. The quietest surface in the portfolio and the most deliberate.',
    role: 'Art Direction & Frontend',
    industry: 'Luxury Fashion',
    year: '2026',
    tech: ['Next.js', 'GSAP', 'Sanity'],
    media: '/work/auren.mp4',
    poster: '/posters/auren.jpg',
    theme: {
      ...light('hsl(38 26% 91%)', 'hsl(34 18% 80%)', 'hsl(24 48% 38%)', 'hsl(38 26% 95%)'),
      ink: 'hsl(28 16% 11%)',
      muted: 'hsl(30 10% 38%)',
    },
  },
  {
    slug: 'quantos',
    index: '03',
    name: 'QuantOS',
    tagline: 'Trade smarter. Powered by AI.',
    story:
      'Institutional-grade quant research in the browser. Strategies are composed visually, validated against a decade of tick history, and read by an AI engine that works the tape like a desk analyst before a dollar is at risk.',
    role: 'Product Design & Full-Stack',
    industry: 'Quantitative Finance',
    year: '2026',
    tech: ['React', 'WebSocket', 'Python', 'AI'],
    media: '/work/quantos.mp4',
    poster: '/posters/quantos.jpg',
    theme: dark('hsl(222 47% 6%)', 'hsl(219 34% 17%)', 'hsl(158 64% 52%)'),
  },
  {
    slug: 'orchestra-console',
    index: '04',
    name: 'ORCHESTRA Console',
    tagline: 'Mission control for a fleet of agents.',
    story:
      'A live orchestration network rendered as a graph: agents route work between each other while an operator watches reasoning traces, token throughput and memory pressure resolve in real time. Debugging a swarm, made legible.',
    role: 'Product Design & Frontend',
    industry: 'AI Infrastructure',
    year: '2026',
    tech: ['React', 'WebSocket', 'D3.js'],
    media: '/work/ai-orchestra.mp4',
    poster: '/posters/ai-orchestra.jpg',
    theme: light('hsl(220 30% 96%)', 'hsl(220 18% 86%)', 'hsl(266 72% 56%)', 'hsl(220 30% 98%)'),
  },
  {
    slug: 'hype-terminal',
    index: '05',
    name: 'HYPE Terminal',
    tagline: 'A trading desk that fits in a tab.',
    story:
      'Depth-of-book, funding, liquidation distance and open positions on one screen, streaming without a reload. Built for traders who keep eleven numbers in their head and want all of them visible at once.',
    role: 'Product Design & Full-Stack',
    industry: 'Crypto Derivatives',
    year: '2026',
    tech: ['React', 'WebSocket', 'Web3'],
    media: '/work/terminal.mp4',
    poster: '/posters/terminal.jpg',
    theme: dark('hsl(203 30% 7%)', 'hsl(203 24% 17%)', 'hsl(168 76% 48%)'),
  },
  {
    slug: 'geoiq',
    index: '06',
    name: 'GeoIQ',
    tagline: 'Find out what AI says about you.',
    story:
      'Brands can no longer see how they are described inside AI search. GeoIQ probes the models directly, scores visibility against competitors, and shows which sources the answers are actually drawn from.',
    role: 'Product Design & Full-Stack',
    industry: 'Marketing Intelligence',
    year: '2025',
    tech: ['React', 'PostgreSQL', 'OpenAI'],
    media: '/work/geoiq.mp4',
    poster: '/posters/geoiq.jpg',
    theme: light('hsl(266 26% 96%)', 'hsl(266 16% 87%)', 'hsl(255 88% 62%)', 'hsl(266 26% 98%)'),
  },
  {
    slug: 'orchestra',
    index: '07',
    name: 'ORCHESTRA',
    tagline: 'Orchestrate every AI. One platform.',
    story:
      'GPT, Claude, Gemini, Grok and DeepSeek behind a single routing layer, with MCP servers, vector memory and the tools a company already runs wired in underneath. One integration instead of nine.',
    role: 'Design & Full-Stack Engineering',
    industry: 'AI Infrastructure',
    year: '2026',
    tech: ['Next.js', 'MCP', 'OpenAI'],
    media: '/work/orchestr.mp4',
    poster: '/posters/orchestr.jpg',
    theme: dark('hsl(232 38% 8%)', 'hsl(232 28% 19%)', 'hsl(212 96% 68%)'),
  },
  {
    slug: 'p2pxbt',
    index: '08',
    name: 'P2PxBT',
    tagline: 'Peer to peer, escrow protected.',
    story:
      'A P2P exchange where the escrow, the dispute path and the verification tiers are the product. Traders match on their own terms; the platform only holds the middle and settles it when both sides are satisfied.',
    role: 'Design & Full-Stack Engineering',
    industry: 'Crypto Exchange',
    year: '2025',
    tech: ['React', 'Node.js', 'Web3'],
    media: '/work/p2p.mp4',
    poster: '/posters/p2p.jpg',
    theme: light('hsl(216 44% 96%)', 'hsl(216 24% 86%)', 'hsl(216 92% 52%)', 'hsl(216 44% 98%)'),
  },
  {
    slug: 'axiom',
    index: '09',
    name: 'AXIOM',
    tagline: 'Autonomous execution. Your guardrails.',
    story:
      'A crypto agent that watches every market you trade, reasons in the open, and executes strategy strictly inside the limits you set on-chain. The landing had to make autonomy feel accountable rather than reckless.',
    role: 'Art Direction & Frontend',
    industry: 'Crypto AI Agents',
    year: '2025',
    tech: ['React', 'GSAP', 'Three.js'],
    media: '/work/axiom.mp4',
    poster: '/posters/axiom.jpg',
    theme: dark('hsl(150 18% 6%)', 'hsl(150 16% 16%)', 'hsl(96 76% 58%)'),
  },
  {
    slug: 'vivid',
    index: '10',
    name: 'VIVID',
    tagline: 'See louder.',
    story:
      'Eyewear sold on attitude. Full-bleed campaign photography, colourway switching that recolours the frame in place, and product pages built to be scrolled like a magazine rather than a catalogue.',
    role: 'Art Direction & Frontend',
    industry: 'Fashion Ecommerce',
    year: '2025',
    tech: ['Next.js', 'Shopify', 'GSAP'],
    media: '/work/vivid.mp4',
    poster: '/posters/vivid.jpg',
    theme: light('hsl(34 34% 93%)', 'hsl(30 20% 82%)', 'hsl(20 86% 46%)', 'hsl(34 34% 97%)'),
  },
  {
    slug: 'l1-chain',
    index: '11',
    name: 'L1 Chain',
    tagline: 'Ethereum, at warp speed.',
    story:
      'A zk-rollup settling to Ethereum with sub-second confirmations and fees under a tenth of a cent. Fully EVM equivalent, so existing contracts deploy unchanged and the tooling a team already uses works on day one.',
    role: 'Protocol & Full-Stack Engineering',
    industry: 'Blockchain Infrastructure',
    year: '2025',
    tech: ['Rust', 'Solidity', 'Go'],
    media: '/work/l1.mp4',
    poster: '/posters/l1.jpg',
    theme: dark('hsl(206 62% 8%)', 'hsl(206 42% 19%)', 'hsl(196 96% 58%)'),
  },
  {
    slug: 'yap',
    index: '12',
    name: 'YAP',
    tagline: 'Your face, but it yaps.',
    story:
      'Type one word, get a 3D character that talks, lip-syncs and reacts. No rigging, no mocap, no prompt engineering. The whole product is a single input box and a result worth sending to a friend.',
    role: 'Design & Full-Stack Engineering',
    industry: 'Consumer AI',
    year: '2025',
    tech: ['React', 'Node.js', 'OpenAI'],
    media: '/work/yap.mp4',
    poster: '/posters/yap.jpg',
    theme: light('hsl(40 42% 94%)', 'hsl(36 22% 84%)', 'hsl(324 88% 52%)', 'hsl(40 42% 98%)'),
  },
  {
    slug: 'predikt',
    index: '13',
    name: 'PREDIKT',
    tagline: 'Markets for what happens next.',
    story:
      'A prediction market where positions settle on-chain and the odds are just the order book read back to you. The interface had to make an unfamiliar instrument feel as ordinary as placing a limit order.',
    role: 'Design & Full-Stack Engineering',
    industry: 'Prediction Markets',
    year: '2025',
    tech: ['Solidity', 'React', 'The Graph'],
    media: '/work/predikt.mp4',
    poster: '/posters/predikt.jpg',
    theme: dark('hsl(258 34% 9%)', 'hsl(258 26% 20%)', 'hsl(266 88% 70%)'),
  },
  {
    slug: 'aura',
    index: '14',
    name: 'AURA',
    tagline: 'A tower, told cinematically.',
    story:
      'Luxury residences sold before they exist. A 3D hero that moves like an establishing shot, floor plates you can walk, and a reveal sequence paced so the building arrives before the price does.',
    role: 'Art Direction & Frontend',
    industry: 'Luxury Real Estate',
    year: '2025',
    tech: ['Next.js', 'GSAP', 'Three.js'],
    media: '/work/aura.mp4',
    poster: '/posters/aura.jpg',
    theme: dark('hsl(28 32% 8%)', 'hsl(28 24% 19%)', 'hsl(36 88% 60%)'),
  },
  {
    slug: 'squant',
    index: '15',
    name: 'SQUANT',
    tagline: 'Markets move. Our intelligence moves first.',
    story:
      'Five independent models score every regime shift and fuse into a single market state, so no position rests on one indicator. Regime, probability and signal read continuously across every asset traded.',
    role: 'Product Design & Full-Stack',
    industry: 'Quantitative Trading',
    year: '2026',
    tech: ['Next.js', 'Python', 'AI', 'WebSocket'],
    media: '/work/quat-ai.mp4',
    poster: '/posters/quat-ai.jpg',
    /* sampled near-black at hue 192; accent lifted to stay legible as type */
    theme: dark('hsl(200 20% 5%)', 'hsl(198 18% 16%)', 'hsl(187 86% 55%)'),
  },
]

/* The shell either side of the featured run. */
export const shellTheme: Theme = {
  bg: 'hsl(20 10% 5%)',
  ink: 'hsl(32 24% 93%)',
  muted: 'hsl(28 7% 58%)',
  line: 'hsl(24 9% 15%)',
  accent: 'hsl(28 100% 55%)',
  onAccent: 'hsl(20 10% 5%)',
}
