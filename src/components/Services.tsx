import {
  Globe,
  Blocks,
  CandlestickChart,
  Building2,
  ArrowLeftRight,
  Sparkles,
  CreditCard,
  Store,
  Landmark,
  type LucideIcon,
} from 'lucide-react'
import { Reveal } from '../lib/Reveal'
/* shared with the ProfessionalService OfferCatalog and llms.txt */
import { services } from '../data/site'

const icons: Record<string, LucideIcon> = {
  Globe,
  Blocks,
  CandlestickChart,
  Building2,
  ArrowLeftRight,
  Sparkles,
  CreditCard,
  Store,
  Landmark,
}

export function Services() {
  return (
    <section id="services" className="border-t border-line bg-surface">
      <div className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-32">
        <Reveal>
          <h2 className="max-w-2xl text-4xl font-semibold tracking-tighter md:text-5xl">
            AI engineering services
          </h2>
          <p className="mt-4 max-w-lg text-muted">
            Nine engineering disciplines under one roof. Scoped, architected and shipped
            without a middle layer.
          </p>
          {/* Entry point into the /services tree. Without this the service pages
              have no internal link from the highest-authority page on the site. */}
          <a
            href="/services"
            className="mt-7 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.24em] text-accent transition-opacity hover:opacity-70"
          >
            Explore all services
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path
                d="M3 11L11 3M11 3H5M11 3V9"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {services.map((s, i) => {
            const Icon = icons[s.icon] ?? Globe
            return (
              /* the first card runs full width so the remaining eight pair up
                 evenly instead of leaving an orphan on the last row */
              <Reveal
                key={s.slug}
                delay={(i % 2) * 100}
                className={i === 0 ? 'md:col-span-2' : ''}
              >
                <div className="h-full rounded-2xl border border-line bg-bg p-7 transition-colors hover:border-accent/35 md:p-9">
                  <div className="flex items-center gap-4">
                    <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent">
                      <Icon size={22} strokeWidth={1.75} />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-lg font-semibold tracking-tight">{s.title}</h3>
                      <p className="text-sm text-faint">{s.blurb}</p>
                    </div>
                  </div>
                  <ul
                    className={`mt-6 grid grid-cols-1 gap-x-6 gap-y-2.5 sm:grid-cols-2 ${
                      i === 0 ? 'lg:grid-cols-3' : ''
                    }`}
                  >
                    {s.items.map((item) => (
                      <li key={item} className="flex items-baseline gap-2.5 text-sm text-muted">
                        <span className="font-mono text-[10px] text-accent">＋</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
