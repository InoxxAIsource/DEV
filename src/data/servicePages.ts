/*
  Commercial service pages.

  Five were chosen on the intersection of commercial intent and evidence we
  actually hold. Every page is backed by shipped products from data/featured.ts
  — that proof is the differentiator, since most agency service pages are
  generic copy with nothing behind them. A page with no real work behind it
  would be a thin doorway, so it is not here.

  Deliberately NOT built yet: tokenization/RWA, P2P, marketplace, DAO and
  payments. They are real capabilities, but each is backed by one project or
  none, and five strong pages beat nine weak ones.

  Routes render at /services/<slug>, with /services as the hub.
*/

export type ServicePage = {
  slug: string
  /* <h1> — carries the primary commercial keyword */
  h1: string
  /* <title> — 50-60 chars including the brand suffix added by the template */
  title: string
  /* meta description — 150-160 chars */
  description: string
  /* the query this page exists to answer */
  intent: string
  /* opening paragraph: what this is and who it is for */
  lede: string
  /* what we actually build, concrete deliverables */
  capabilities: string[]
  /* substantive sections. Not filler — each makes a claim a buyer can test. */
  approach: { title: string; body: string }[]
  /* slugs from data/featured.ts used as evidence on this page */
  evidence: string[]
  /* page-specific FAQ, feeds a per-page FAQPage schema */
  faqs: { q: string; a: string }[]
  /* other service slugs to cross-link, for internal link equity */
  related: string[]
}

export const servicePages: ServicePage[] = [
  {
    slug: 'ai-development',
    h1: 'AI Development Services',
    title: 'AI Development Services',
    description:
      'AI development company building production AI products, agents and automation. Shipped platforms in AI orchestration, quant research and market intelligence.',
    intent: 'Find a company that builds production AI products, not prototypes.',
    lede: 'Most AI projects stall between a working demo and something a business can depend on. wwwdot.dev builds the second kind: AI products with real evaluation, observable failure modes, and an operational cost you can forecast before launch.',
    capabilities: [
      'AI agents and copilots',
      'Multi-model routing and orchestration',
      'Retrieval pipelines over private data',
      'AI research and analysis engines',
      'Workflow and process automation',
      'Prediction and scoring models',
      'AI-powered dashboards and consoles',
    ],
    approach: [
      {
        title: 'Evaluation before scale',
        body: 'A model that works on ten hand-picked inputs tells you nothing about the eleven-thousandth. We build an evaluation set from your real data first, so quality is a number that moves rather than an impression, and regressions surface before users find them.',
      },
      {
        title: 'Model-agnostic by default',
        body: 'Providers change pricing, deprecate models and shift capability quarterly. Systems are built behind a routing layer so a model can be swapped without touching product code. ORCHESTRA routes GPT, Claude and Gemini through exactly this pattern.',
      },
      {
        title: 'Cost modelled, not discovered',
        body: 'Token spend is designed in: caching, context trimming, cheaper models for cheaper decisions. You get a per-request cost estimate during architecture, not a surprise on the first invoice.',
      },
    ],
    evidence: ['orchestra', 'orchestra-console', 'axiom', 'geoiq', 'quantos'],
    faqs: [
      {
        q: 'What is the difference between an AI prototype and a production AI product?',
        a: 'A prototype answers whether something is possible. A production AI product handles the inputs nobody planned for: it has an evaluation set, defined failure behaviour, cost controls, observability and a path to change models without a rewrite. wwwdot.dev builds the second, and treats the first as a step rather than a deliverable.',
      },
      {
        q: 'Which AI models does wwwdot.dev work with?',
        a: 'GPT, Claude, Gemini and open models, routed behind a provider-agnostic layer so a model can be replaced without changing product code. Model choice is made per task on cost and quality rather than fixed up front.',
      },
      {
        q: 'How long does an AI product take to build?',
        a: 'An AI MVP typically runs 4 to 8 weeks and a full AI platform 2 to 4 months. A concrete timeline is committed after the discovery call, with working software demonstrated weekly.',
      },
    ],
    related: ['ai-agent-development', 'ai-saas-development', 'mvp-development'],
  },

  {
    slug: 'ai-agent-development',
    h1: 'AI Agent Development',
    title: 'AI Agent Development Company',
    description:
      'We build AI agents that execute inside real guardrails: tool use, multi-agent routing, reasoning traces and hard limits on what an agent is allowed to do.',
    intent: 'Hire a company to build autonomous AI agents that can be trusted.',
    lede: 'An agent that can act is only useful if you can predict what it will do. wwwdot.dev builds agent systems where autonomy is bounded by explicit limits, every decision leaves a trace, and a human can see why the agent did what it did.',
    capabilities: [
      'Single-purpose and multi-agent systems',
      'Tool and function calling',
      'Agent orchestration and routing',
      'Reasoning trace capture and inspection',
      'On-chain and policy-based guardrails',
      'Memory and long-running state',
      'Live agent monitoring consoles',
    ],
    approach: [
      {
        title: 'Guardrails are the product',
        body: 'The hard part of an agent is not making it act, it is bounding what it may do. Limits are enforced outside the model — in policy, in code, or on-chain — so a prompt cannot talk its way past them. AXIOM executes trading strategy strictly inside limits set on-chain.',
      },
      {
        title: 'Traceable by construction',
        body: 'Every agent decision records its inputs, tool calls and reasoning, so a failure can be replayed rather than guessed at. ORCHESTRA Console renders a live agent network where an operator watches routing, traces and memory pressure resolve in real time.',
      },
      {
        title: 'Scoped autonomy',
        body: 'Agents are given the narrowest capability that accomplishes the task. Broad autonomy is earned by demonstrated reliability on a narrow scope, not assumed at the start.',
      },
    ],
    evidence: ['axiom', 'orchestra-console', 'orchestra'],
    faqs: [
      {
        q: 'How do you stop an AI agent doing something harmful?',
        a: 'Constraints are enforced outside the model. Spending caps, allowed actions and rate limits live in policy, application code or on-chain contracts, so no prompt can override them. The model proposes; the guardrail decides.',
      },
      {
        q: 'What is a multi-agent system?',
        a: 'Several specialised agents that route work between each other rather than one agent attempting everything. It improves reliability because each agent has a narrow, testable job, and it makes failures easier to isolate. ORCHESTRA Console is a live example.',
      },
      {
        q: 'Can AI agents connect to our existing tools?',
        a: 'Yes. Agents connect to existing systems through tool and function calling, MCP servers, or direct API integration, so they operate against the data and services a company already runs.',
      },
    ],
    related: ['ai-development', 'ai-saas-development', 'blockchain-development'],
  },

  {
    slug: 'ai-saas-development',
    h1: 'AI SaaS Development',
    title: 'AI SaaS Development Company',
    description:
      'We build AI SaaS platforms end to end: multi-tenant architecture, usage-based billing, model cost controls and the dashboards customers actually log in for.',
    intent: 'Find a company to build and ship an AI-powered SaaS product.',
    lede: 'An AI SaaS is two products: the intelligence, and the platform that bills, isolates and scales it. wwwdot.dev builds both, so per-customer model cost is understood before pricing is set rather than after margin disappears.',
    capabilities: [
      'Multi-tenant SaaS architecture',
      'Usage metering and billing integration',
      'Per-tenant model cost tracking',
      'Authentication, roles and permissions',
      'Analytics and reporting dashboards',
      'Admin and back-office tooling',
      'Subscription and credit-based pricing',
    ],
    approach: [
      {
        title: 'Unit economics designed first',
        body: 'AI SaaS margins die when inference cost per customer is discovered after pricing is published. Cost per tenant is instrumented from the first week so a pricing model can be set against real numbers.',
      },
      {
        title: 'Tenancy decided early',
        body: 'Shared, siloed or hybrid tenancy is an architectural decision that is expensive to reverse. It is settled during architecture against your actual compliance and scale requirements, not defaulted.',
      },
      {
        title: 'The dashboard is the product',
        body: 'Customers renew because the interface makes the intelligence legible, not because the model is strong. GeoIQ turns AI-search visibility into a score a marketer can act on; QuantOS turns five models into one market state a trader can read.',
      },
    ],
    evidence: ['geoiq', 'quantos', 'squant', 'meridian'],
    faqs: [
      {
        q: 'How much does it cost to build an AI SaaS platform?',
        a: 'Cost follows scope. An AI SaaS MVP is the most common engagement and typically runs 4 to 8 weeks; a full platform runs 2 to 4 months. wwwdot.dev fixes scope and figure after a discovery call, before work begins.',
      },
      {
        q: 'How do you handle AI costs in a SaaS product?',
        a: 'Per-tenant inference cost is metered from the start, with caching, context trimming and model tiering applied so cheaper decisions run on cheaper models. That produces a real cost-per-customer figure to set pricing against.',
      },
      {
        q: 'Do we own the code?',
        a: 'Yes. Clients receive the full codebase with documentation, and can take it in-house or continue on a retainer.',
      },
    ],
    related: ['ai-development', 'mvp-development', 'ai-agent-development'],
  },

  {
    slug: 'mvp-development',
    h1: 'MVP Development for Startups',
    title: 'MVP Development Company for Startups',
    description:
      'MVP development in 4 to 8 weeks. We build the smallest product that proves the thesis, on architecture that survives if it works.',
    intent: 'Find a company to build a startup MVP quickly without wasting the code.',
    lede: 'Most MVPs fail in one of two ways: they take so long the market moves, or they are built so disposably that success forces a rewrite. wwwdot.dev aims at the narrow path between — the smallest product that proves the thesis, on foundations that hold if it does.',
    capabilities: [
      'Scope definition and thesis framing',
      'Web and mobile-ready product builds',
      'AI features integrated from day one',
      'Authentication, payments and onboarding',
      'Analytics and instrumentation',
      'Production deployment and monitoring',
      'Investor-ready demo environments',
    ],
    approach: [
      {
        title: 'Cut scope, not quality',
        body: 'Speed comes from building fewer things, not from building things badly. Features are argued down before the timeline is, because a shipped MVP with three solid flows outperforms a delayed one with ten shaky ones.',
      },
      {
        title: 'Weekly working software',
        body: 'Progress is demonstrated as software you can use, every week, from week one. Slippage becomes visible in the first fortnight rather than the last, when there is still time to change scope.',
      },
      {
        title: 'Built to survive success',
        body: 'Architecture is chosen so that traction does not trigger a rewrite. Nothing is gold-plated, but the data model, auth and deployment path are ones you can still be using at ten times the load.',
      },
    ],
    evidence: ['yap', 'geoiq', 'predikt', 'p2pxbt'],
    faqs: [
      {
        q: 'How long does it take to build an MVP?',
        a: 'An MVP typically takes 4 to 8 weeks depending on scope. A landing experience runs 1 to 2 weeks. A concrete timeline is committed after the discovery call, with working software demonstrated every week against it.',
      },
      {
        q: 'What should be in an MVP and what should be cut?',
        a: 'An MVP should contain only what is needed to test the central assumption. Everything that can be done manually, faked, or postponed without invalidating the test should be cut. wwwdot.dev argues scope down during discovery, before the timeline is set.',
      },
      {
        q: 'Will the MVP need rewriting if it succeeds?',
        a: 'It should not. Speed comes from building fewer features rather than lower-quality ones, and the data model, authentication and deployment path are chosen so they remain viable at significantly higher load.',
      },
    ],
    related: ['ai-saas-development', 'ai-development', 'ai-agent-development'],
  },

  {
    slug: 'blockchain-development',
    h1: 'Blockchain & DeFi Development',
    title: 'Blockchain & DeFi Development Company',
    description:
      'Smart contracts, DeFi protocols and Layer 1 chains built against audited patterns, with full test coverage and third-party audits before mainnet.',
    intent: 'Hire a company to build smart contracts or a DeFi protocol safely.',
    lede: 'On-chain code is public, immutable and holds real money. wwwdot.dev builds against audited patterns, proves behaviour with full test coverage, and coordinates third-party audits before anything holding value reaches mainnet.',
    capabilities: [
      'Token contracts (ERC20, BEP20)',
      'DEX, AMM and orderbook protocols',
      'Lending, borrowing and yield systems',
      'Staking, vesting and lock-up contracts',
      'Layer 1 and rollup chain setup',
      'Escrow-based P2P exchange platforms',
      'Trading terminals and protocol dashboards',
    ],
    approach: [
      {
        title: 'Audited patterns, not clever code',
        body: 'Contracts are built on established implementations such as OpenZeppelin. Novelty in a contract holding funds is a liability, so invention is reserved for the parts of the protocol that genuinely require it.',
      },
      {
        title: 'Tested to the edges',
        body: 'Full test coverage plus static analysis, with adversarial cases written deliberately: reentrancy, rounding, oracle failure and access-control paths. The tests are part of what is handed over.',
      },
      {
        title: 'Audited before value',
        body: 'Third-party audits are coordinated for any contract that will hold real value, before mainnet. Audit findings are resolved and re-verified rather than acknowledged.',
      },
    ],
    evidence: ['l1-chain', 'hype-terminal', 'p2pxbt', 'predikt'],
    faqs: [
      {
        q: 'Are the smart contracts audited?',
        a: 'wwwdot.dev builds against audited patterns such as OpenZeppelin, runs static analysis and full test coverage, and coordinates third-party audits for any contract holding real value before it reaches mainnet. Audits are arranged with independent firms rather than performed in-house.',
      },
      {
        q: 'Which chains do you build on?',
        a: 'EVM-compatible chains primarily, including Layer 2 rollups, plus custom Layer 1 work. L1 Chain is a custom Layer 1 with proof-of-stake consensus and EVM compatibility, so existing contracts deploy unchanged.',
      },
      {
        q: 'How long does a DeFi protocol take to build?',
        a: 'A full DeFi protocol typically runs 2 to 4 months including testing and audit coordination. Simpler contract work such as tokens, staking or vesting is considerably shorter.',
      },
    ],
    related: ['ai-agent-development', 'ai-development', 'mvp-development'],
  },
  {
    slug: 'full-stack-development',
    h1: 'Full-Stack Development',
    title: 'Full-Stack Development Company',
    description:
      'Complete products, not pages. SaaS platforms, dashboards, CRM and ERP systems built end to end in Next.js, React, Node and Python.',
    intent: 'Find a company to build a complete web product end to end.',
    lede: 'Handoffs are where products lose their shape. wwwdot.dev takes a product from data model to deployed interface without passing it between a design agency, a frontend contractor and a backend team, so the decisions stay coherent.',
    capabilities: [
      'Web applications and SaaS platforms',
      'CRM and ERP systems',
      'Admin and analytics dashboards',
      'Custom API design and integration',
      'Authentication, roles and permissions',
      'Mobile-friendly progressive web apps',
      'Production deployment and monitoring',
    ],
    approach: [
      {
        title: 'The data model comes first',
        body: 'Most expensive rewrites trace back to a schema decided in week one to unblock a screen. The data model is designed against the actual domain before interface work begins, because it is the hardest thing to change later.',
      },
      {
        title: 'One team, no handoff',
        body: 'The engineers who design the architecture build the interface. Nothing is lost translating a design file into a system, and edge cases surface during design rather than during QA.',
      },
      {
        title: 'Interfaces built for real data',
        body: 'Screens are built against realistic volume and failure states from the start: empty, loading, partial, error, and far more rows than the mockup showed. FactoryOS renders live telemetry from every station on a factory floor.',
      },
    ],
    evidence: ['factoryos', 'auren', 'vivid', 'aura'],
    faqs: [
      {
        q: 'What does full-stack development include?',
        a: 'Data modelling, backend and API design, frontend interface, authentication, deployment and monitoring. At wwwdot.dev one team owns all of it, so there is no handoff between the people who design the system and the people who ship it.',
      },
      {
        q: 'Which technologies does wwwdot.dev use?',
        a: 'Next.js, React and TypeScript on the frontend, Node.js and Python on the backend, PostgreSQL for data, deployed on modern edge and serverless infrastructure. Stack choices are made per project rather than applied by default.',
      },
      {
        q: 'Can you work with our existing codebase?',
        a: 'Yes. Engagements include extending existing platforms as well as greenfield builds. The first step is a review of the current architecture so scope is based on what is really there.',
      },
    ],
    related: ['ai-saas-development', 'mvp-development', 'ai-development'],
  },

  {
    slug: 'defi-protocol-development',
    h1: 'DeFi Protocol Development',
    title: 'DeFi Protocol Development Company',
    description:
      'DEX, perpetuals, lending and yield protocols built against audited patterns, with the trading interfaces traders actually use.',
    intent: 'Hire a company to build a DeFi protocol and its trading interface.',
    lede: 'A DeFi protocol is judged on two things that rarely come from the same team: whether the contracts hold under adversarial conditions, and whether a trader can read the interface at speed. wwwdot.dev builds both sides.',
    capabilities: [
      'DEX with AMM or orderbook',
      'Perpetual and derivatives exchanges',
      'Lending and borrowing protocols',
      'Yield farming and liquidity mining',
      'Stablecoin modules',
      'Opinion and prediction markets',
      'Professional trading terminals',
    ],
    approach: [
      {
        title: 'Adversarial from the first test',
        body: 'Protocol tests are written as attacks: reentrancy, oracle manipulation, rounding, liquidation cascades and access-control paths. Coverage that only proves the happy path proves very little about money.',
      },
      {
        title: 'The interface is part of the protocol',
        body: 'Depth, funding, liquidation distance and open positions belong on one screen without a reload. HYPE Terminal and MERIDIAN are built for traders who hold a dozen numbers in their head and want every one of them visible.',
      },
      {
        title: 'Audited before value',
        body: 'Third-party audits are coordinated for any contract that will hold real funds, before mainnet, and findings are resolved and re-verified rather than acknowledged.',
      },
    ],
    evidence: ['hype-terminal', 'quantos', 'squant', 'meridian'],
    faqs: [
      {
        q: 'How long does it take to build a DeFi protocol?',
        a: 'A full DeFi protocol typically runs 2 to 4 months including testing and audit coordination. Simpler contract work such as staking, vesting or token launches is considerably shorter.',
      },
      {
        q: 'Do you build the trading interface as well as the contracts?',
        a: 'Yes. wwwdot.dev builds the protocol and the interface traders use against it, including live orderbooks, depth, funding and position management streaming without a reload.',
      },
      {
        q: 'How are the contracts secured?',
        a: 'Contracts are built on audited implementations such as OpenZeppelin, tested with adversarial cases, checked with static analysis, and submitted to independent third-party audit before any contract holds real value.',
      },
    ],
    related: ['blockchain-development', 'p2p-platforms', 'ai-development'],
  },

  {
    slug: 'tokenization-rwa',
    h1: 'Tokenization & RWA Systems',
    title: 'RWA Tokenization Development Company',
    description:
      'Real-world asset tokenization: fractional ownership, KYC-gated access, rent distribution and the SPV logic that makes it defensible.',
    intent: 'Find a company to build a real-world asset tokenization platform.',
    lede: 'Tokenizing an asset is the easy part. The hard part is everything around it: who is allowed to hold it, how income reaches holders, and what the token actually represents in law. wwwdot.dev builds the whole apparatus, not just the contract.',
    capabilities: [
      'Real estate and asset tokenization',
      'Fractional ownership engines',
      'KYC-gated transfer restrictions',
      'Rent and income distribution automation',
      'SPV and trust deed logic',
      'Investor onboarding dashboards',
      'Tokenized asset marketplaces',
    ],
    approach: [
      {
        title: 'Transfer restrictions are the design',
        body: 'An RWA token that anyone can hold is usually a compliance problem. Eligibility, lock-ups and jurisdiction rules are enforced in the contract itself rather than assumed at the interface layer, where they can be bypassed.',
      },
      {
        title: 'Distribution has to be boring',
        body: 'Income reaching holders is the part that must never surprise anyone. Distribution logic is built to be auditable, repeatable and independently verifiable against on-chain records.',
      },
      {
        title: 'Built alongside your counsel',
        body: 'The on-chain structure is designed to mirror the legal structure your lawyers define. wwwdot.dev builds the system; it does not provide legal or investment advice, and the two are kept clearly separate.',
      },
    ],
    evidence: [],
    faqs: [
      {
        q: 'What is real-world asset tokenization?',
        a: 'Representing ownership of a physical or off-chain asset, such as property, as transferable on-chain tokens. The system typically needs fractional ownership, restricted transfers limited to verified holders, and automated distribution of income to those holders.',
      },
      {
        q: 'How is compliance handled in an RWA platform?',
        a: 'Eligibility rules are enforced in the token contract rather than only in the interface, so restricted transfers cannot be bypassed. wwwdot.dev builds to the legal structure defined by your counsel and does not provide legal advice.',
      },
      {
        q: 'Can token holders receive rental income automatically?',
        a: 'Yes. Distribution can be automated so income is allocated to holders on-chain, with records that can be verified independently rather than taken on trust.',
      },
    ],
    related: ['blockchain-development', 'defi-protocol-development', 'marketplace-development'],
  },

  {
    slug: 'p2p-platforms',
    h1: 'P2P Platform Development',
    title: 'P2P Exchange Development Company',
    description:
      'Peer-to-peer exchange platforms where escrow, verification tiers and dispute resolution are the product, not an afterthought.',
    intent: 'Hire a company to build a peer-to-peer crypto exchange platform.',
    lede: 'In a P2P exchange the product is not matching, it is trust. wwwdot.dev builds the escrow, the verification tiers and the dispute path first, because those are what make strangers willing to trade with each other.',
    capabilities: [
      'Crypto P2P exchange platforms',
      'Escrow-based trade settlement',
      'Stablecoin P2P desks',
      'KYC and verification tiers',
      'Automated dispute resolution',
      'Reputation and rating systems',
      'Multi-currency payment methods',
    ],
    approach: [
      {
        title: 'Escrow holds the middle',
        body: 'Funds are locked before either side commits and released only when both conditions are met. The platform never takes a position, so it can arbitrate honestly when something goes wrong.',
      },
      {
        title: 'Disputes are designed, not improvised',
        body: 'The dispute path is built as a first-class flow with evidence submission, time limits and defined outcomes. A dispute process invented after launch is what turns a trust product into a support burden.',
      },
      {
        title: 'Verification in tiers',
        body: 'Limits scale with verification level so new users can transact at low value immediately while high-value trades require stronger identity checks. P2PxBT uses exactly this pattern.',
      },
    ],
    evidence: ['p2pxbt'],
    faqs: [
      {
        q: 'How does escrow work in a P2P exchange?',
        a: 'The seller’s funds are locked in escrow before the buyer sends payment, and released only once payment is confirmed. Neither party can withdraw unilaterally, which is what makes trading with a stranger viable.',
      },
      {
        q: 'How are disputes resolved?',
        a: 'Through a defined flow with evidence submission, time limits and set outcomes, built as a core feature rather than handled ad hoc through support. Automated rules cover common cases; the rest escalate to human review.',
      },
      {
        q: 'Can a P2P platform support multiple payment methods?',
        a: 'Yes. Bank transfer, mobile money, card rails and stablecoin settlement can all be supported, with per-method limits and verification requirements set independently.',
      },
    ],
    related: ['blockchain-development', 'payments-finance-automation', 'defi-protocol-development'],
  },

  {
    slug: 'payments-finance-automation',
    h1: 'Payments & Finance Automation',
    title: 'Payments Integration & Finance Automation',
    description:
      'Stripe, Razorpay and PayPal integration, fiat-to-crypto flows, subscription billing and usage-based credit systems.',
    intent: 'Find a company to build payments and billing infrastructure.',
    lede: 'Billing is where products quietly lose money: failed renewals nobody chases, usage nobody meters, refunds nobody reconciles. wwwdot.dev builds payment flows that account for the unhappy paths, because that is where the revenue leaks.',
    capabilities: [
      'Stripe, Razorpay and PayPal integration',
      'Subscription and recurring billing',
      'Usage-based and metered pricing',
      'Pay-per-use credit wallets',
      'Fiat-to-crypto payment flows',
      'Micro-payment handling',
      'Invoicing and reconciliation',
    ],
    approach: [
      {
        title: 'Idempotency is not optional',
        body: 'Payment endpoints are built idempotent from the start. Network retries, duplicate webhooks and double-clicks are normal traffic, and a billing system that double-charges once loses more trust than it earns in a year.',
      },
      {
        title: 'Webhooks as the source of truth',
        body: 'Payment state is driven by verified provider webhooks rather than client callbacks, which can be lost, replayed or forged. Reconciliation runs against the provider so the ledger cannot silently drift.',
      },
      {
        title: 'Failure paths built first',
        body: 'Declined cards, expired methods, partial refunds, chargebacks and mid-cycle plan changes are designed at the outset. They are the majority of real billing traffic and the usual source of unbilled revenue.',
      },
    ],
    evidence: [],
    faqs: [
      {
        q: 'Which payment providers do you integrate?',
        a: 'Stripe, Razorpay and PayPal for card and local rails, plus on-chain settlement where crypto payment is required. Provider choice follows your market and currency needs rather than a default.',
      },
      {
        q: 'Can you build usage-based billing?',
        a: 'Yes. Metered usage, credit wallets and pay-per-use pricing are all supported, including per-customer cost tracking so pricing can be set against real unit economics rather than estimates.',
      },
      {
        q: 'How do you prevent double charging?',
        a: 'Payment endpoints are idempotent and state is driven by verified provider webhooks rather than client callbacks. Reconciliation runs against the provider so the internal ledger cannot drift unnoticed.',
      },
    ],
    related: ['ai-saas-development', 'marketplace-development', 'p2p-platforms'],
  },

  {
    slug: 'marketplace-development',
    h1: 'Marketplace Development',
    title: 'Marketplace Development Company',
    description:
      'Two-sided marketplaces that actually transact: matching, escrow, payouts, ratings and the supply-side tooling sellers need.',
    intent: 'Hire a company to build a two-sided marketplace platform.',
    lede: 'Marketplaces fail on the supply side long before demand is the problem. wwwdot.dev builds the seller tooling, payout rails and trust mechanics that make a marketplace worth listing on, not just browsing.',
    capabilities: [
      'Two-sided marketplace platforms',
      'NFT and tokenized asset marketplaces',
      'Service and task marketplaces',
      'Escrow and split payouts',
      'Ratings and reputation systems',
      'Search, filtering and matching',
      'Seller dashboards and analytics',
    ],
    approach: [
      {
        title: 'Build for the seller first',
        body: 'A marketplace with no supply has nothing to sell. Listing, inventory, pricing and payout tooling are treated as primary product surface rather than an admin afterthought.',
      },
      {
        title: 'Money movement is the hard part',
        body: 'Split payouts, holds, refunds and platform fees are designed up front with the payment provider, because retrofitting marketplace payouts onto simple checkout is close to a rewrite.',
      },
      {
        title: 'Trust before scale',
        body: 'Ratings, verification and dispute handling are built in early. They cost far more to add once a marketplace already has users whose history predates the system.',
      },
    ],
    evidence: [],
    faqs: [
      {
        q: 'What makes a two-sided marketplace different from an ecommerce site?',
        a: 'An ecommerce site sells its own inventory. A marketplace connects independent sellers with buyers, which adds seller onboarding, split payouts, platform fees, ratings and dispute resolution. Those systems, not the storefront, are the real build.',
      },
      {
        q: 'How are payouts to sellers handled?',
        a: 'Through provider-level split payments with holds, platform fees and refund handling designed in from the start. Retrofitting marketplace payouts onto standard checkout is close to a rewrite, so it is settled during architecture.',
      },
      {
        q: 'Can you build an NFT or tokenized asset marketplace?',
        a: 'Yes. On-chain marketplaces with custom contracts, royalties and wallet integration are supported, as are conventional service and product marketplaces settled in fiat.',
      },
    ],
    related: ['payments-finance-automation', 'full-stack-development', 'tokenization-rwa'],
  },

  {
    slug: 'dao-governance',
    h1: 'DAO & Governance Development',
    title: 'DAO Development & Governance Systems',
    description:
      'Governance tokens, on-chain proposals, voting dashboards and treasury systems built so decisions are legible and verifiable.',
    intent: 'Find a company to build DAO governance and treasury systems.',
    lede: 'Most DAO tooling makes voting possible but not legible. wwwdot.dev builds governance systems where a member can see what is being decided, who decided it, and what happened to the treasury as a result.',
    capabilities: [
      'Governance token design',
      'On-chain proposal systems',
      'Voting dashboards and delegation',
      'Treasury management and reporting',
      'Timelock and execution controls',
      'Multi-signature integration',
      'Member and contributor tooling',
    ],
    approach: [
      {
        title: 'Execution is the risky part',
        body: 'Passing a proposal is straightforward. Executing it safely needs timelocks, guardrails and a clear path to cancel, so a passed vote cannot immediately drain a treasury before anyone can react.',
      },
      {
        title: 'Turnout is a design problem',
        body: 'Low participation is usually an interface failure rather than apathy. Proposals are presented so a member can understand the decision and its treasury impact without reading a contract.',
      },
      {
        title: 'Treasury visible by default',
        body: 'Holdings, flows and spend against approved proposals are shown continuously rather than compiled on request, because governance without visible finances is theatre.',
      },
    ],
    evidence: [],
    faqs: [
      {
        q: 'What does a DAO governance system need?',
        a: 'A governance token or membership rule, a proposal system, a voting mechanism with delegation, timelocked execution with the ability to cancel, and treasury reporting. Execution controls matter most, because that is where a passed proposal becomes irreversible action.',
      },
      {
        q: 'How do you protect the treasury?',
        a: 'Through timelocks between a vote passing and executing, multi-signature control on high-value actions, and spending limits enforced in contract rather than by policy. The delay is what gives members time to react to a malicious proposal.',
      },
      {
        q: 'Can governance work without a token?',
        a: 'Yes. Membership can be based on NFTs, allowlists or contribution records rather than a tradeable token, which avoids governance weight simply following whoever has the most capital.',
      },
    ],
    related: ['blockchain-development', 'defi-protocol-development', 'tokenization-rwa'],
  },
]

export const serviceBySlug = (slug: string) => servicePages.find((s) => s.slug === slug)
