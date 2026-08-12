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
]

export const serviceBySlug = (slug: string) => servicePages.find((s) => s.slug === slug)
