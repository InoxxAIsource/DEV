import { Globe, Smartphone, Blocks, CandlestickChart } from 'lucide-react'
import { Reveal } from '../lib/Reveal'

const services = [
  {
    icon: Globe,
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
    icon: Smartphone,
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
    icon: Blocks,
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
    icon: CandlestickChart,
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

export function Services() {
  return (
    <section id="services" className="border-t border-line bg-surface">
      <div className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-32">
        <Reveal>
          <h2 className="max-w-2xl text-4xl font-semibold tracking-tighter md:text-5xl">
            What I build
          </h2>
          <p className="mt-4 max-w-md text-muted">
            Four disciplines, one engineer. Scoped, built and shipped without a middle layer.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={(i % 2) * 100}>
              <div className="h-full rounded-2xl border border-line bg-bg p-7 transition-colors hover:border-accent/35 md:p-9">
                <div className="flex items-center gap-4">
                  <div className="grid size-11 place-items-center rounded-xl bg-accent-soft text-accent">
                    <s.icon size={22} strokeWidth={1.75} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight">{s.title}</h3>
                    <p className="text-sm text-faint">{s.blurb}</p>
                  </div>
                </div>
                <ul className="mt-6 grid grid-cols-1 gap-x-6 gap-y-2.5 sm:grid-cols-2">
                  {s.items.map((item) => (
                    <li key={item} className="flex items-baseline gap-2.5 text-sm text-muted">
                      <span className="font-mono text-[10px] text-accent">＋</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
