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

/*
  Service catalogue, kept in sync with the agency site at nexbuild.work.
  `icon` names map to lucide-react exports in components/Services.tsx.
  Feeds the page, the ProfessionalService OfferCatalog and llms.txt.
*/
export const services = [
  {
    slug: 'full-stack-development',
    title: 'Full-Stack Development',
    blurb: 'Full products, not just pages.',
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
    slug: 'ai-development',
    title: 'AI Development',
    blurb: 'Agents that do real work.',
    icon: 'Sparkles',
    items: [
      'AI chatbots',
      'AI trading / portfolio agents',
      'AI research assistants',
      'AI CRM and support agents',
      'AI automation tools',
      'Price prediction models',
      'AI-powered dashboards',
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
