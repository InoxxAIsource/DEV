/*
  Single source of truth for every SEO / GEO / AEO surface.

  Consumed by:
    - React components (FAQ, Contact, Footer)
    - scripts/gen-seo.mjs, which generates:
        public/robots.txt      crawler + AI-agent access rules
        public/llms.txt        concise site summary for LLMs (llmstxt.org)
        public/llms-full.txt   full-detail variant
        public/sitemap.xml
        index.html             JSON-LD graph + OG/Twitter meta (between markers)

  Change a fact here and every artifact regenerates consistently.
*/

/* Swap this one constant when the real domain is registered. */
export const SITE_URL = 'https://mohdtauheed.dev'

export const person = {
  name: 'Mohd Tauheed',
  jobTitle: 'Full-Stack, Blockchain & DeFi Engineer',
  email: 'hello@mohdtauheed.dev',
  description:
    'Independent full-stack, blockchain, DeFi and mobile engineer. Takes products from idea to production across web, mobile and blockchain, built for security, scale and real-world use.',
  /* One-line answer to "who is Mohd Tauheed?" — the sentence an AI engine is
     most likely to lift verbatim, so it is written to stand alone. */
  summary:
    'Mohd Tauheed is an independent full-stack, blockchain and DeFi engineer who builds production-grade web, mobile and on-chain products for founders and startups, working solo and directly with clients.',
  knowsAbout: [
    'Full-stack web development',
    'Blockchain development',
    'Smart contract development',
    'DeFi protocol engineering',
    'Solidity',
    'React',
    'Next.js',
    'Node.js',
    'Flutter',
    'Web3',
    'Layer 2 and rollups',
    'Decentralized exchanges',
    'Mobile app development',
  ],
}

/*
  sameAs feeds entity resolution — it is how a search or answer engine links
  this site to a known person. Only `verified: true` entries are emitted,
  because a wrong sameAs actively damages entity association.
*/
export const socials = [
  { label: 'X', href: 'https://x.com/BeingtauheedTk', verified: true },
  { label: 'GitHub', href: 'https://github.com/', verified: false },
  { label: 'LinkedIn', href: 'https://linkedin.com/', verified: false },
]

export const services = [
  {
    slug: 'web-app-development',
    title: 'Web & App Development',
    blurb: 'Full products, not just pages.',
    items: [
      'Web apps & SaaS',
      'CRM / ERP systems',
      'Admin & analytics dashboards',
      'Custom API integrations',
      'Progressive web apps',
    ],
  },
  {
    slug: 'mobile-development',
    title: 'Mobile Development',
    blurb: 'One Flutter codebase, both stores.',
    items: [
      'Cross-platform iOS & Android',
      'Flutter UI systems',
      'App store deployment',
      'Offline-first PWAs',
    ],
  },
  {
    slug: 'blockchain-smart-contracts',
    title: 'Blockchain & Smart Contracts',
    blurb: 'Audited patterns, gas-optimized code.',
    items: [
      'Tokens (ERC20 / BEP20)',
      'NFT contracts & marketplaces',
      'Staking, vesting & lock-ups',
      'AMM & liquidity pools',
      'Wallet integration',
      'Multi-chain bridges',
      'Layer-2 & rollup setup',
      'Block explorers',
    ],
  },
  {
    slug: 'defi-protocols',
    title: 'DeFi Protocols',
    blurb: 'From DEX to derivatives, end to end.',
    items: [
      'DEX (AMM & orderbook)',
      'Perpetual exchanges',
      'Lending & borrowing',
      'Yield farming',
      'Stablecoin modules',
      'Opinion markets',
      'Derivatives & synthetics',
      'Trading dashboards',
    ],
  },
]

/*
  Answer-engine content. Each answer is written to be self-contained and
  extractable — no "as mentioned above", no pronouns depending on context.
*/
export const faqs = [
  {
    q: 'Do you work solo or with a team?',
    a: 'Solo by default. You talk to the person writing the code. For larger scopes I bring in one or two trusted specialists (design, audits) and stay accountable for delivery.',
  },
  {
    q: 'How long does a typical project take?',
    a: 'A landing page runs 1 to 2 weeks, an MVP 4 to 8 weeks, a full DeFi protocol 2 to 4 months. You get a concrete timeline after the discovery call, and weekly demos against it.',
  },
  {
    q: 'Do you sign NDAs?',
    a: 'Yes, before any technical discussion if you prefer. Your idea, data and codebase stay confidential either way.',
  },
  {
    q: 'Are your smart contracts audited?',
    a: 'I write against audited patterns (OpenZeppelin), run static analysis and full test coverage, and coordinate third-party audits for anything holding real value before mainnet.',
  },
  {
    q: 'What happens after launch?',
    a: 'Every project includes a support window for fixes. After that you can take the codebase in-house with full documentation, or keep me on a monthly retainer.',
  },
]

/* Portfolio entries, summarised for LLM consumption. */
export const projects = [
  { name: 'HYPE Terminal', desc: 'Pro crypto DEX trading terminal with real-time charts and on-chain execution.', stack: ['React', 'WebSocket', 'Web3'] },
  { name: 'ORCHESTRA', desc: 'AI orchestration platform routing GPT, Claude and Gemini through one layer.', stack: ['Next.js', 'MCP', 'OpenAI'] },
  { name: 'ORCHESTRA Console', desc: 'Live multi-agent network for routing, inspecting and tracing agent runs in real time.', stack: ['React', 'WebSocket', 'D3.js'] },
  { name: 'FactoryOS', desc: 'Industrial OS coordinating robotic assembly, vision and maintenance in real time.', stack: ['Next.js', 'IoT', 'Python'] },
  { name: 'AUREN', desc: 'Luxury fashion house editorial with campaign films and seasonal lookbooks.', stack: ['Next.js', 'GSAP', 'Sanity'] },
  { name: 'AXIOM', desc: 'Landing experience for a crypto AI agent platform.', stack: ['React', 'GSAP', 'Three.js'] },
  { name: 'YAP', desc: 'Playful AI-avatar app that turns a one-word vibe into a character.', stack: ['React', 'Node.js', 'OpenAI'] },
  { name: 'VIVID', desc: 'Fashion eyewear ecommerce with cinematic product pages.', stack: ['Next.js', 'Shopify', 'GSAP'] },
  { name: 'GeoIQ', desc: 'SaaS that tracks brand visibility inside AI search.', stack: ['React', 'PostgreSQL', 'OpenAI'] },
  { name: 'AURA', desc: 'Luxury residence tower landing with a cinematic 3D hero.', stack: ['Next.js', 'GSAP', 'Three.js'] },
  { name: 'PREDIKT', desc: 'Prediction market app with on-chain settlement.', stack: ['Solidity', 'React', 'The Graph'] },
  { name: 'P2PxBT', desc: 'Peer-to-peer crypto exchange with escrow-protected trades.', stack: ['React', 'Node.js', 'Web3'] },
  { name: 'L1 Chain', desc: 'Custom Layer 1 blockchain with PoS consensus and EVM compatibility.', stack: ['Rust', 'Solidity', 'Go'] },
]

/* Routes for sitemap.xml. Grows as blog / service pages are added. */
export const routes = [{ path: '/', priority: 1.0, changefreq: 'weekly' }]
