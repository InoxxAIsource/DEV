/*
  Single source of truth for every SEO / GEO / AEO surface.

  Consumed by:
    - React components (FAQ, Services, Contact, Footer)
    - src/lib/schema.ts -> the JSON-LD graph rendered by app/layout.tsx
    - scripts/gen-seo.mjs -> public/llms.txt and public/llms-full.txt

  The studio is the primary entity. The founder is modelled separately and
  linked, so answer engines resolve "wwwdot.dev" to an organisation rather
  than to an individual.
*/

/*
  Canonical origin. Vercel 308-redirects the apex to www, so www is the
  canonical form — canonicals, sitemap entries and JSON-LD @ids must all use it
  or they point at a redirect.
*/
export const SITE_URL = 'https://www.wwwdot.dev'

export const org = {
  name: 'wwwdot.dev',
  slogan: 'WE WRITE WORKFLOWS™',
  kind: 'AI Engineering Studio',
  /* Public address. Route it wherever you read mail. */
  email: 'contact@wwwdot.dev',
  description:
    'AI engineering studio. We partner with startups and enterprises to design, engineer and launch AI products, SaaS platforms, automation systems and interactive digital experiences.',
  /*
    The sentence an answer engine is most likely to quote when asked what
    wwwdot.dev is. Written to stand alone, with no surrounding context.
  */
  summary:
    'wwwdot.dev is an AI engineering studio that designs, engineers and ships AI products, SaaS platforms, automation systems and interactive digital experiences for startups and enterprises.',
  knowsAbout: [
    'AI product engineering',
    'AI agents and multi-agent systems',
    'SaaS platform development',
    'Full-stack web development',
    'Workflow automation',
    'Cloud infrastructure',
    'Smart contract development',
    'DeFi protocol engineering',
    'Real-world asset tokenization',
    'Mobile application development',
    'Next.js',
    'React',
    'Solidity',
    'Python',
  ],
  foundedBy: 'Mohd Tauheed',
  /* Rendered from the real wordmark by scripts/gen-brand-assets.mjs, so the
     logo in structured data matches the site rather than approximating it. */
  logo: '/logo.png',
  ogImage: '/og.png',
  /* Only state what is verifiable. No address, phone, rating or founding date
     is claimed here because none can be evidenced yet — inventing them would
     poison entity resolution rather than help it. */
}

/*
  sameAs feeds entity resolution — it is how a search or answer engine links
  this site to a known profile. Only `verified: true` entries are emitted,
  because a wrong sameAs actively damages entity association.
*/
export const socials = [
  { slug: 'x', label: 'X', href: 'https://x.com/BeingtauheedTk', verified: true },
  { slug: 'github', label: 'GitHub', href: 'https://github.com/', verified: false },
  { slug: 'linkedin', label: 'LinkedIn', href: 'https://linkedin.com/', verified: false },
]

/*
  Service catalogue, kept in sync with the agency site at nexbuild.work.
  `icon` names map to lucide-react exports in components/Services.tsx.
  Feeds the page, the OfferCatalog and llms.txt.
*/
export const services = [
  {
    slug: 'ai-development',
    title: 'AI Development',
    blurb: 'Agents that do real work.',
    icon: 'Sparkles',
    items: [
      'AI agents and copilots',
      'AI trading / portfolio agents',
      'AI research assistants',
      'AI CRM and support agents',
      'Workflow automation tools',
      'Price prediction models',
      'AI-powered dashboards',
    ],
  },
  {
    slug: 'full-stack-development',
    title: 'Full-Stack Development',
    blurb: 'Complete products, not pages.',
    icon: 'Globe',
    items: [
      'Websites, web apps, static sites',
      'SaaS platforms',
      'CRM / ERP systems',
      'Admin dashboards',
      'Custom API integrations',
      'Mobile-friendly PWA apps',
    ],
  },
  {
    slug: 'blockchain-smart-contracts',
    title: 'Blockchain & Smart Contracts',
    blurb: 'Audited patterns, gas-optimized code.',
    icon: 'Blocks',
    items: [
      'Token development (ERC20, BEP20)',
      'NFT smart contracts & marketplaces',
      'Smart contracts for games',
      'Staking contracts',
      'Vesting & lockup contracts',
      'Liquidity pool + AMM contracts',
      'Custom wallet integration',
      'Multi-chain bridges',
      'Layer-2 / rollup chain setup',
      'Custom block explorer',
    ],
  },
  {
    slug: 'defi-protocol-development',
    title: 'DeFi Protocol Development',
    blurb: 'From DEX to derivatives, end to end.',
    icon: 'CandlestickChart',
    items: [
      'DEX (AMM / orderbook)',
      'Perp exchange',
      'Lending / borrowing protocol',
      'Yield farming systems',
      'Stablecoin modules',
      'Opinion markets (yes/no markets)',
      'Derivatives & synthetic assets',
      'Liquidity mining UI',
      'Trading dashboards',
    ],
  },
  {
    slug: 'tokenization-rwa',
    title: 'Tokenization & RWA Systems',
    blurb: 'Real-world assets, brought on-chain.',
    icon: 'Building2',
    items: [
      'Real estate tokenization',
      'RWA onboarding dashboard',
      'Fractional ownership engine',
      'Rent distribution automation',
      'SPV / trust deed logic',
      'Tokenized marketplace',
      'KYC-gated asset access',
    ],
  },
  {
    slug: 'p2p-platforms',
    title: 'P2P Platforms',
    blurb: 'Escrow-protected trading at scale.',
    icon: 'ArrowLeftRight',
    items: [
      'Crypto P2P exchange (Binance-style)',
      'Escrow-based P2P trading',
      'Stablecoin P2P desk',
      'KYC / verification module',
      'Automated dispute resolution',
    ],
  },
  {
    slug: 'payments-finance-automation',
    title: 'Payments & Finance Automation',
    blurb: 'Fiat and crypto, one flow.',
    icon: 'CreditCard',
    items: [
      'Stripe, Razorpay, PayPal integration',
      'Fiat-to-crypto flow',
      'Subscription billing',
      'Micro-payments',
      'Pay-per-use credit wallet',
    ],
  },
  {
    slug: 'marketplace-development',
    title: 'Marketplace Development',
    blurb: 'Two-sided platforms that transact.',
    icon: 'Store',
    items: [
      'NFT marketplace',
      'Service / task marketplace (Fiverr-style)',
      'Tokenized asset marketplace',
      'P2P item buy/sell apps',
    ],
  },
  {
    slug: 'dao-governance',
    title: 'DAO & Governance',
    blurb: 'On-chain decisions, transparent treasury.',
    icon: 'Landmark',
    items: [
      'Governance token',
      'Voting dashboard',
      'On-chain proposals',
      'Treasury dashboard',
    ],
  },
]

/*
  Answer-engine content. Every answer is written to be self-contained and
  extractable: it names the subject rather than relying on the question for
  context, states one concrete fact early, and avoids "as mentioned above".
  An LLM lifting a single entry should still produce a correct, useful answer.

  The first four target commercial questions buyers actually search
  ("what does an AI development company do", "how much does it cost",
  "how long does it take", "how do I choose one"). The rest cover process.
*/
export const faqs = [
  {
    q: 'What does wwwdot.dev build?',
    a: 'wwwdot.dev is an AI engineering studio that builds AI products, AI agents, SaaS platforms, automation systems, web applications and blockchain protocols. Work spans discovery and architecture through to production deployment, in stacks including Next.js, React, Python, Solidity and Node.js.',
  },
  {
    q: 'How much does it cost to build an AI product or SaaS platform?',
    a: 'Cost tracks scope rather than a fixed price list. A landing experience is the smallest engagement, an MVP is the most common, and a full AI platform or DeFi protocol is the largest. wwwdot.dev gives a fixed scope and figure after a discovery call, before any work begins, so the number is not a moving estimate.',
  },
  {
    q: 'How long does it take to build an AI SaaS MVP?',
    a: 'A landing experience runs 1 to 2 weeks, an MVP 4 to 8 weeks, and a full AI platform or DeFi protocol 2 to 4 months. wwwdot.dev commits to a concrete timeline after the discovery call and runs weekly demos against it, so slippage is visible in the first week rather than the last.',
  },
  {
    q: 'How do you choose an AI development company?',
    a: 'Ask who actually writes the code, whether you get the repository, and how progress is demonstrated. At wwwdot.dev one engineering lead owns the account end to end, you receive the full codebase with documentation, and progress is shown as working software every week rather than status reports.',
  },
  {
    q: 'How do you work with clients?',
    a: 'wwwdot.dev partners directly with the founding or product team. One engineering lead owns the account end to end, so there is no agency layer and no handoff between the people who architect the system and the people who ship it.',
  },
  {
    q: 'What does an engagement include?',
    a: 'Discovery and scope, system and data architecture, design, engineering, deployment and a support window. Clients receive the full codebase with documentation, and can either take it in-house or continue on a retainer.',
  },
  {
    q: 'How do you handle security and audits?',
    a: 'wwwdot.dev builds against audited patterns such as OpenZeppelin, runs static analysis and full test coverage, and coordinates third-party audits for any contract holding real value before it reaches mainnet.',
  },
  {
    q: 'Do you sign NDAs?',
    a: 'Yes, before any technical discussion if preferred. Your idea, data and codebase stay confidential either way.',
  },
]

/* Portfolio entries, summarised for LLM consumption. */
export const projects = [
  { name: 'FactoryOS', desc: 'Industrial OS coordinating robotic assembly, vision and maintenance in real time.', stack: ['Next.js', 'IoT', 'Python'] },
  { name: 'AUREN', desc: 'Luxury fashion house editorial with campaign films and seasonal lookbooks.', stack: ['Next.js', 'GSAP', 'Sanity'] },
  { name: 'QuantOS', desc: 'Institutional-grade AI quant research, backtesting and execution platform.', stack: ['React', 'WebSocket', 'Python'] },
  { name: 'ORCHESTRA Console', desc: 'Live multi-agent network for routing, inspecting and tracing agent runs.', stack: ['React', 'WebSocket', 'D3.js'] },
  { name: 'HYPE Terminal', desc: 'Pro crypto DEX trading terminal with real-time charts and on-chain execution.', stack: ['React', 'WebSocket', 'Web3'] },
  { name: 'GeoIQ', desc: 'SaaS that measures brand visibility inside AI search.', stack: ['React', 'PostgreSQL', 'OpenAI'] },
  { name: 'ORCHESTRA', desc: 'AI orchestration platform routing GPT, Claude and Gemini through one layer.', stack: ['Next.js', 'MCP', 'OpenAI'] },
  { name: 'P2PxBT', desc: 'Peer-to-peer crypto exchange with escrow-protected trades.', stack: ['React', 'Node.js', 'Web3'] },
  { name: 'AXIOM', desc: 'Crypto AI agent platform executing strategy inside on-chain guardrails.', stack: ['React', 'GSAP', 'Three.js'] },
  { name: 'VIVID', desc: 'Fashion eyewear ecommerce with cinematic product pages.', stack: ['Next.js', 'Shopify', 'GSAP'] },
  { name: 'L1 Chain', desc: 'Custom Layer 1 blockchain with PoS consensus and EVM compatibility.', stack: ['Rust', 'Solidity', 'Go'] },
  { name: 'YAP', desc: 'Consumer AI app generating talking 3D characters from a single prompt.', stack: ['React', 'Node.js', 'OpenAI'] },
  { name: 'PREDIKT', desc: 'Prediction market with on-chain settlement.', stack: ['Solidity', 'React', 'The Graph'] },
  { name: 'AURA', desc: 'Luxury residence tower landing with a cinematic 3D hero.', stack: ['Next.js', 'GSAP', 'Three.js'] },
]

/*
  Routes for sitemap.xml. Grows as blog / service pages are added.

  `lastmod` is an explicit date, not build time. Deriving it from new Date()
  meant every deploy claimed the content had changed, which teaches crawlers to
  distrust the signal. Bump it when the page's content actually changes.
*/
export const routes = [
  { path: '/', priority: 1.0, changefreq: 'weekly', lastmod: '2026-08-11' },
  { path: '/services', priority: 0.9, changefreq: 'monthly', lastmod: '2026-08-11' },
  { path: '/services/ai-development', priority: 0.9, changefreq: 'monthly', lastmod: '2026-08-11' },
  { path: '/services/ai-agent-development', priority: 0.9, changefreq: 'monthly', lastmod: '2026-08-11' },
  { path: '/services/ai-saas-development', priority: 0.9, changefreq: 'monthly', lastmod: '2026-08-11' },
  { path: '/services/mvp-development', priority: 0.9, changefreq: 'monthly', lastmod: '2026-08-11' },
  { path: '/services/blockchain-development', priority: 0.8, changefreq: 'monthly', lastmod: '2026-08-11' },
  { path: '/work', priority: 0.9, changefreq: 'monthly', lastmod: '2026-08-12' },
]

/*
  Case-study watch pages. Generated from the featured list so a new project
  lands in the sitemap automatically. Kept separate from `routes` because the
  paths are derived rather than authored.
*/
export const workRoutes = (slugs: string[]) =>
  slugs.map((slug) => ({
    path: `/work/${slug}`,
    priority: 0.8,
    changefreq: 'monthly',
    lastmod: '2026-08-12',
  }))
