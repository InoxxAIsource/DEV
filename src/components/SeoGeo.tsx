import { Search, Bot, Gauge, FileCode2 } from 'lucide-react'
import { Reveal } from '../lib/Reveal'

const points = [
  {
    icon: Search,
    label: 'Technical & on-page SEO',
    line: 'Clean architecture, metadata and internal linking that Google can actually crawl.',
  },
  {
    icon: Gauge,
    label: 'Core Web Vitals',
    line: 'Fast LCP, stable layout and snappy interactions, measured, not guessed.',
  },
  {
    icon: FileCode2,
    label: 'Structured data',
    line: 'Schema markup so your pages qualify for rich results.',
  },
  {
    icon: Bot,
    label: 'GEO: AI search visibility',
    line: 'Content and structure tuned to show up in ChatGPT, Gemini, Perplexity and Claude.',
  },
]

export function SeoGeo() {
  return (
    <section className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-32">
      <Reveal className="max-w-2xl">
        <h2 className="text-4xl font-semibold tracking-tighter md:text-5xl">
          Get found on Google <span className="text-accent">and</span> in AI search.
        </h2>
        <p className="mt-4 text-muted">
          Ranking on Google is half the game now. Buyers ask AI assistants first, so I build for
          both.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {points.map((p, i) => (
          <Reveal key={p.label} delay={i * 80}>
            <div className="text-accent">
              <p.icon size={24} strokeWidth={1.75} />
            </div>
            <h3 className="mt-4 font-semibold tracking-tight">{p.label}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{p.line}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
