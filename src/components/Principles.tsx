import { ShieldCheck, Rocket, Fuel, MessagesSquare } from 'lucide-react'
import { Reveal } from '../lib/Reveal'

const principles = [
  {
    icon: ShieldCheck,
    label: 'Clean architecture & secure code',
    line: 'Typed, tested and reviewed. Security is a habit, not a phase.',
  },
  {
    icon: Rocket,
    label: 'Startup-friendly MVP approach',
    line: 'Ship the smallest version that proves the business, then iterate.',
  },
  {
    icon: Fuel,
    label: 'Scalable & gas-optimized contracts',
    line: 'Contracts written for mainnet costs, not just testnet demos.',
  },
  {
    icon: MessagesSquare,
    label: 'Clear communication & fast delivery',
    line: 'Weekly demos, honest timelines, no disappearing acts.',
  },
]

export function Principles() {
  return (
    <section className="border-t border-line">
      <div className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-32">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
          <Reveal>
            <h2 className="text-4xl font-semibold tracking-tighter md:text-5xl">How I work</h2>
            <p className="mt-4 max-w-sm text-muted">
              The habits that keep projects on time and codebases maintainable.
            </p>
          </Reveal>

          <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
            {principles.map((p, i) => (
              <Reveal key={p.label} delay={i * 80}>
                <div className="flex items-start gap-4">
                  <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent">
                    <p.icon size={20} strokeWidth={1.75} />
                  </div>
                  <div>
                    <h3 className="font-semibold leading-snug tracking-tight">{p.label}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{p.line}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
