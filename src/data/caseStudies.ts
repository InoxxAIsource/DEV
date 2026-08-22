/*
  Depth layer for the case-study watch pages.

  The /work pages shipped at 213-254 words because they were built around the
  VideoObject markup rather than the reading experience. Search Console showed
  all 13 sitting in "Discovered - currently not indexed", and a 220-word page
  is a poor bet once a crawler does arrive.

  This adds the substance a case study should carry: the problem the product
  had to solve, the engineering decisions behind it, and what is actually
  visible in the walkthrough. Kept separate from featured.ts, which feeds the
  homepage and stays lean.

  No metrics, revenue figures, user counts or client quotes appear here. None
  can be evidenced, and inventing them to pad a page would be worse than the
  thin page it replaces.
*/
export type CaseStudy = {
  challenge: string
  build: { title: string; body: string }[]
  walkthrough: string[]
}

export const caseStudies: Record<string, CaseStudy> = {
  factoryos: {
    challenge:
      'A factory floor generates more state than any one person can hold: robot positions, vision inspection results, maintenance thresholds and throughput, all changing every second. The problem is not collecting that data, it is presenting it so a supervisor can act without reading a dashboard like a spreadsheet.',
    build: [
      { title: 'Streaming over polling', body: 'Station telemetry arrives over persistent WebSocket connections rather than interval polling, so the floor view reflects machine state within a frame rather than a refresh cycle behind it.' },
      { title: 'Degrade, do not blank', body: 'A station that stops reporting shows its last known state with an explicit staleness marker, because an empty tile reads as "fine" to a supervisor scanning quickly.' },
      { title: 'Vision results as first-class data', body: 'Inspection output is structured state alongside position and throughput, so a defect trend appears next to the line producing it rather than in a separate report.' },
    ],
    walkthrough: [
      'Live floor view with per-station status and throughput',
      'Robotic assembly line with real-time position tracking',
      'Computer vision inspection results surfaced inline',
      'Predictive maintenance thresholds and alerts',
      'Digital twin and enterprise capability sections',
    ],
  },

  auren: {
    challenge:
      'Luxury fashion sells on restraint, which is the opposite of what most ecommerce patterns optimise for. The brief was a surface that reads as a magazine rather than a storefront, without losing the commercial paths a fashion house still needs.',
    build: [
      { title: 'Editorial pacing over conversion density', body: 'Sections are given room deliberately. Whitespace and slow reveals carry the premium signal that discount badges and urgency banners would destroy.' },
      { title: 'Campaign film as structure', body: 'Video is composed into the layout rather than dropped into a hero slot, so the campaign carries the page instead of decorating it.' },
      { title: 'Content-managed without template rot', body: 'Sanity drives collections, lookbooks and journal entries, with schemas shaped so editors cannot accidentally break the composition.' },
    ],
    walkthrough: [
      'Crafted Beyond Fashion opening sequence',
      'The New Collection editorial layout',
      'Quiet Luxury campaign section with full-bleed photography',
      'Collection, craftsmanship, lookbook and journal navigation',
      'Newsletter and access capture',
    ],
  },

  quantos: {
    challenge:
      'Quant platforms usually force a choice: a research environment that cannot execute, or an execution terminal with no research depth. The problem was joining strategy composition, historical validation and live signal into one surface a trader would keep open.',
    build: [
      { title: 'Visual strategy composition', body: 'Strategies are assembled on a canvas rather than written as scripts, which widens the user base beyond people who write Python without giving up expressiveness.' },
      { title: 'Backtest against tick history', body: 'Validation runs against real tick data rather than daily bars, because a strategy that looks profitable on candles frequently is not once spread and slippage are honest.' },
      { title: 'Model output as one readable state', body: 'The research engine reduces continuous price action to structure and probability rather than emitting raw scores, so output is legible at a glance.' },
    ],
    walkthrough: [
      'Trade Smarter, Powered by AI opening',
      'Visual strategy builder and validation flow',
      'Backtest results against historical tick data',
      'AI research engine reading market structure',
      'Pricing tiers from individual trader to institutional',
    ],
  },

  'orchestra-console': {
    challenge:
      'When several AI agents route work between each other, failure stops being traceable. A wrong answer might come from bad routing, a stale memory read, or one agent misreading another. The console had to make a running swarm inspectable rather than a black box.',
    build: [
      { title: 'The graph is the interface', body: 'Agents and their message paths render as a live network, so routing is something an operator watches rather than reconstructs from logs afterwards.' },
      { title: 'Traces attached to edges', body: 'Every hop carries its reasoning trace and token cost, which turns "why did it answer that" into a click rather than an investigation.' },
      { title: 'Pressure surfaced early', body: 'Memory pressure and queue depth are shown continuously, because in agent systems degradation appears in those numbers well before it shows in output quality.' },
    ],
    walkthrough: [
      'Live multi-agent network graph',
      'Running, queued and completed task counters',
      'Reasoning traces attached to individual agent hops',
      'Shared context store and memory pressure indicators',
      'Real-time event stream',
    ],
  },

  'hype-terminal': {
    challenge:
      'A derivatives trader tracks roughly a dozen numbers at once, and the cost of a page reload mid-position is real. The terminal had to hold depth, funding, liquidation distance and open positions on one screen, all live, without becoming unreadable.',
    build: [
      { title: 'One socket, many panels', body: 'Depth, trades, funding and positions share a single multiplexed connection rather than opening a stream per panel, which keeps update latency consistent across the screen.' },
      { title: 'Density without noise', body: 'Typography and colour carry the hierarchy so eleven live figures coexist without clutter. Monospaced tabular figures stop numbers jittering as they update.' },
      { title: 'Risk always in view', body: 'Liquidation distance and margin usage stay permanently visible rather than a click away, because the moment they matter is the moment nobody goes looking for them.' },
    ],
    walkthrough: [
      'Live BTC perpetual chart with indicator overlays',
      'Order book with depth imbalance visualisation',
      'Open positions, margin and unrealised PnL',
      'Funding rate and next funding countdown',
      'Take profit and stop loss configuration with risk gauge',
    ],
  },

  geoiq: {
    challenge:
      'Brands can measure how they rank in Google but have no visibility into how AI assistants describe them. The product had to turn something invisible into a number a marketing team could track and act on.',
    build: [
      { title: 'Probe the models directly', body: 'Visibility is measured by querying the assistants themselves across a prompt set, rather than inferring from search rankings, which do not predict how a model answers.' },
      { title: 'Scored against competitors', body: 'An absolute mention count means little alone, so results are scored as share of voice against named competitors for the same prompts.' },
      { title: 'Surface the sources', body: 'The report names which external pages the models drew on, converting an abstract score into a concrete list of places worth earning a mention.' },
    ],
    walkthrough: [
      'Your brand is invisible to AI positioning',
      'URL input and audit initiation',
      'Visibility scoring across ChatGPT, Gemini, Perplexity, Claude and Google AI Overview',
      'Competitor share-of-voice comparison',
      'Source attribution showing which pages influence answers',
    ],
  },

  orchestra: {
    challenge:
      'A company adopting AI ends up integrating each provider separately, then repeating the work every time pricing shifts or a model is deprecated. The platform had to make provider choice a runtime decision rather than an architectural commitment.',
    build: [
      { title: 'One routing layer', body: 'GPT, Claude, Gemini, Grok and DeepSeek sit behind a single interface, so switching model is configuration rather than a code change.' },
      { title: 'MCP for tool access', body: 'Model Context Protocol servers expose existing company systems to any connected model, avoiding rebuilt integrations per provider.' },
      { title: 'Memory outside the model', body: 'Vector memory is held at the platform layer rather than inside any one provider, so conversation history survives a model swap.' },
    ],
    walkthrough: [
      'Multi-provider routing across five model families',
      'MCP server connections to existing tooling',
      'Vector memory and shared context',
      'Unified interface across providers',
      'Configuration and orchestration controls',
    ],
  },

  p2pxbt: {
    challenge:
      'In peer-to-peer trading the product is not matching buyers and sellers, it is making two strangers willing to transact. Escrow, verification and the dispute path had to be core flows rather than additions after launch.',
    build: [
      { title: 'Escrow before commitment', body: 'Seller funds lock before the buyer sends payment and release only on confirmation, so neither side can withdraw unilaterally and the platform never takes a position.' },
      { title: 'Disputes as a designed flow', body: 'Evidence submission, time limits and defined outcomes are built in, with automated rules covering common cases and the remainder escalating to review.' },
      { title: 'Limits that scale with trust', body: 'Verification tiers let a new user transact at low value immediately while high-value trades require stronger identity checks.' },
    ],
    walkthrough: [
      'Peer-to-peer offer listings with payment methods',
      'Escrow-protected trade flow',
      'Verification tiers and limits',
      'Dispute resolution interface',
      'Trader reputation and history',
    ],
  },

  axiom: {
    challenge:
      'An autonomous trading agent is only investable if its autonomy is bounded. The hard part was not making it act, it was making the limits credible enough that a user would fund it.',
    build: [
      { title: 'Guardrails enforced on-chain', body: 'Spending caps and permitted actions live in contracts rather than application logic, so no prompt and no bug in the agent can exceed them.' },
      { title: 'Reasoning in the open', body: 'The agent publishes why it took a position, not just that it did, which is what allows a user to judge its behaviour rather than only its results.' },
      { title: 'Narrow scope first', body: 'Capability is deliberately limited and widened only against demonstrated reliability, rather than granted broadly at launch.' },
    ],
    walkthrough: [
      'Autonomous execution with user-set guardrails',
      'Live market coverage and decision latency',
      'On-chain limit configuration',
      'Agent reasoning display',
      'Multi-chain coverage indicators',
    ],
  },

  vivid: {
    challenge:
      'Eyewear is bought on how it looks on a face, which a product grid cannot convey. The build had to sell attitude first and specification second, without losing the mechanics of an ecommerce funnel.',
    build: [
      { title: 'Campaign photography at full bleed', body: 'Product imagery runs edge to edge rather than boxed in cards, so frames are seen worn rather than catalogued.' },
      { title: 'Colourway switching in place', body: 'Selecting a colour recolours the frame without a page transition, keeping the shopper in the same visual context while comparing.' },
      { title: 'Scroll as a narrative', body: 'Product pages are paced like an editorial spread, with commercial actions placed where interest peaks rather than repeated throughout.' },
    ],
    walkthrough: [
      'See Louder campaign opening',
      'Full-bleed product photography',
      'Colourway selection and in-place recolouring',
      'Editorial product detail sections',
      'Collection browsing and cart flow',
    ],
  },

  'l1-chain': {
    challenge:
      'A new Layer 1 has to earn its existence. The requirement was meaningful throughput and cost improvement while staying EVM equivalent, so existing contracts and tooling work unchanged on day one.',
    build: [
      { title: 'EVM equivalence, not just compatibility', body: 'Existing contracts deploy without modification and standard tooling connects directly, removing the migration cost that usually stops adoption.' },
      { title: 'Proof of stake consensus', body: 'Validator economics and finality were designed alongside the execution layer rather than bolted on, so throughput claims hold under real validator distribution.' },
      { title: 'Settlement to Ethereum', body: 'Rollup settlement inherits Ethereum security rather than asking users to trust a new validator set with their assets.' },
    ],
    walkthrough: [
      'Ethereum at warp speed positioning',
      'Sub-second confirmation and fee comparison',
      'EVM equivalence and tooling compatibility',
      'Validator and consensus overview',
      'Developer onboarding path',
    ],
  },

  yap: {
    challenge:
      'Generative character tools normally demand rigging, motion capture or prompt skill. The product had to compress all of that into one input box and still return something worth sending to a friend.',
    build: [
      { title: 'One input, no prompt craft', body: 'A single word or selfie produces a finished character. Prompt engineering is absorbed by the system rather than pushed onto the user.' },
      { title: 'Lip sync without rigging', body: 'Speech drives facial animation directly, removing the rig and motion capture steps that put this category out of consumer reach.' },
      { title: 'Built for the share', body: 'Output format, length and framing are shaped around what actually gets sent to a friend, because sharing is the growth mechanic.' },
    ],
    walkthrough: [
      'Your face, but it yaps opening',
      'Single-word prompt to 3D character generation',
      'Talking and lip-synced character output',
      'Character personality variants',
      'Token and pricing model',
    ],
  },

  predikt: {
    challenge:
      'Prediction markets are an unfamiliar instrument to most people. The interface had to make taking a position feel as ordinary as placing a limit order, while settlement stayed verifiable on-chain.',
    build: [
      { title: 'Odds as an order book', body: 'Prices are presented as the book read back rather than bookmaker-style odds, which keeps the mechanism honest and familiar to anyone who has traded.' },
      { title: 'Settlement on-chain', body: 'Outcomes resolve and pay out through contracts, so participants do not have to trust an operator to settle correctly.' },
      { title: 'Indexed for speed', body: 'The Graph indexes on-chain state so market history and positions load quickly without querying chain directly on every view.' },
    ],
    walkthrough: [
      'Markets for what happens next positioning',
      'Yes and no market interface',
      'Order book and current odds',
      'Position taking and settlement flow',
      'Market history and resolution',
    ],
  },

  aura: {
    challenge:
      'Luxury residences are sold before they exist, so the interface has to substitute for a building nobody can walk through. The task was making an unbuilt tower feel tangible enough to justify the price.',
    build: [
      { title: 'The 3D hero as an establishing shot', body: 'Camera movement is paced like film rather than a product viewer, so the building is introduced rather than demonstrated.' },
      { title: 'Floor plates you can walk', body: 'Plans are explorable rather than downloadable PDFs, which is what lets a buyer form a spatial sense of a specific unit.' },
      { title: 'Price arrives last', body: 'The reveal sequence is ordered so the building lands before the number does, which is how physical sales galleries are staged.' },
    ],
    walkthrough: [
      'Cinematic 3D tower hero sequence',
      'Residence and amenity sections',
      'Floor plate exploration',
      'Location and surroundings context',
      'Private viewing enquiry',
    ],
  },

  squant: {
    challenge:
      'Single-indicator trading systems fail in regimes they were not fitted to. The requirement was fusing several independent models into one market state without hiding disagreement between them.',
    build: [
      { title: 'Five models, one state', body: 'Independent models are scored continuously and fused, so no position rests on a single indicator agreeing with itself.' },
      { title: 'Regime detection first', body: 'The system classifies the market before sizing anything, because the same signal means different things in trend and in chop.' },
      { title: 'Confidence exposed', body: 'Model agreement is shown rather than hidden behind a single number, so a user can tell a strong consensus from a marginal one.' },
    ],
    walkthrough: [
      'Markets Move, Our Intelligence Moves First',
      'Five-model fusion into a single market state',
      'Model win rate and backtest statistics',
      'Live market intelligence across assets',
      'Strategy validation and deployment flow',
    ],
  },

  meridian: {
    challenge:
      'An algorithmic desk has to justify its own decisions to the person running it. The build had to expose regime classification, execution telemetry and time-in-state together, rather than presenting outcomes without reasoning.',
    build: [
      { title: 'Classify before sizing', body: 'Trend, chop and panic states are scored continuously and position sizing follows that classification, so the strategy knows which market it is operating in.' },
      { title: 'Telemetry beside decisions', body: 'Latency, execution quality and uptime sit on the same screen as the decisions they affect, rather than in a separate monitoring tool.' },
      { title: 'Time-in-state as context', body: 'How long the market has held a regime is shown alongside the regime itself, because a state entered ten minutes ago carries different weight to one held all session.' },
    ],
    walkthrough: [
      'Algorithmic desk with live regime classification',
      'Trend, chop and panic state scoring',
      'Order book, depth imbalance and recent trades',
      'Execution telemetry, latency and uptime',
      'Take profit, stop loss and liquidation distance',
    ],
  },
}
