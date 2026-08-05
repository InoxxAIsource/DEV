import { Reveal } from '../lib/Reveal'

/* TODO: replace with attributed quotes from real clients before driving traffic. */
const quotes = [
  {
    body: '“They rebuilt our token vesting contracts and cut gas costs enough that our community noticed. Zero incidents since launch.”',
    name: 'Arjun Mehta',
    role: 'Founder, DeFi protocol',
  },
  {
    body: '“They shipped our MVP in six weeks when two agencies quoted four months. We closed our pre-seed off that demo.”',
    name: 'Lena Okafor',
    role: 'Co-founder, SaaS startup',
  },
  {
    body: '“The landing experience they built doubled our waitlist conversion. They argued us out of features we did not need, which saved money.”',
    name: 'Daniyal Khan',
    role: 'Founder, consumer app',
  },
]

export function Testimonials() {
  return (
    <section className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-32">
      <Reveal>
        <h2 className="text-4xl font-semibold tracking-tighter md:text-5xl">
          What clients say
        </h2>
      </Reveal>
      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {quotes.map((q, i) => (
          <Reveal key={q.name} delay={i * 90}>
            <figure className="flex h-full flex-col justify-between rounded-2xl border border-line bg-surface p-7">
              <blockquote className="text-[15px] leading-relaxed text-ink/90">
                {q.body}
              </blockquote>
              <figcaption className="mt-6 border-t border-line pt-4">
                <div className="font-semibold tracking-tight">{q.name}</div>
                <div className="mt-0.5 text-sm text-faint">{q.role}</div>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
