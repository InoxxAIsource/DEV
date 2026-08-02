import { Reveal } from '../lib/Reveal'

const steps = [
  {
    n: '01',
    title: 'Discovery & scope',
    line: 'We define what success looks like, what ships first and what waits.',
  },
  {
    n: '02',
    title: 'Design & architecture',
    line: 'System design, data models and contract architecture before any code.',
  },
  {
    n: '03',
    title: 'Build & iterate',
    line: 'Weekly demos with working software. You see progress, not promises.',
  },
  {
    n: '04',
    title: 'Deploy & support',
    line: 'Production launch, monitoring and a clear handover or retainer.',
  },
]

export function Process() {
  return (
    <section className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-32">
      <Reveal>
        <h2 className="text-4xl font-semibold tracking-tighter md:text-5xl">
          From first call to production
        </h2>
      </Reveal>

      <ol className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-4">
        {steps.map((s, i) => (
          <Reveal as="li" key={s.n} delay={i * 90} className="bg-surface">
            <div className="flex h-full flex-col p-7 md:p-8">
              <span className="font-mono text-sm text-accent">{s.n}</span>
              <h3 className="mt-5 text-lg font-semibold tracking-tight">{s.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted">{s.line}</p>
            </div>
          </Reveal>
        ))}
      </ol>
    </section>
  )
}
