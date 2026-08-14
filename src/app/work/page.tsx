import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { SITE_URL, org } from '@/data/site'
import { featured } from '@/data/featured'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Work — AI Products, SaaS Platforms & Protocols',
  description:
    'Sixteen shipped products: AI orchestration, quant trading platforms, DeFi protocols, luxury commerce and consumer AI. Each with a full walkthrough.',
  alternates: { canonical: '/work' },
  openGraph: {
    title: `Work | ${org.name}`,
    description: org.description,
    url: '/work',
    type: 'website',
    images: [{ url: org.ogImage, width: 1200, height: 630, alt: `${org.name} work` }],
  },
}

const graph = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      '@id': `${SITE_URL}/work#webpage`,
      url: `${SITE_URL}/work`,
      name: 'Work',
      description: org.description,
      isPartOf: { '@id': `${SITE_URL}/#website` },
      about: { '@id': `${SITE_URL}/#org` },
      inLanguage: 'en',
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${SITE_URL}/work#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Work' },
      ],
    },
    {
      '@type': 'ItemList',
      '@id': `${SITE_URL}/work#list`,
      name: 'Shipped work',
      numberOfItems: featured.length,
      itemListElement: featured.map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: p.name,
        url: `${SITE_URL}/work/${p.slug}`,
      })),
    },
  ],
}

export default function WorkHub() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
      />
      <div id="top-sentinel" className="absolute top-0 h-24 w-px" aria-hidden="true" />
      <Nav />

      <main className="mx-auto max-w-[1400px] px-6 pb-24 pt-36 md:px-12 md:pt-44">
        <nav aria-label="Breadcrumb" className="mb-10">
          <ol className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.24em] text-faint">
            <li>
              <Link href="/" className="transition-colors hover:text-accent">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-muted">Work</li>
          </ol>
        </nav>

        <header className="max-w-[46rem]">
          <h1 className="text-[clamp(2.4rem,5.6vw,4.25rem)] font-semibold leading-[1.02] tracking-[-0.04em]">
            Shipped work
          </h1>
          <p className="mt-7 text-lg leading-relaxed text-muted md:text-xl">
            {featured.length} products already built and running. Each has a full walkthrough
            of the real interface, not a concept mockup.
          </p>
        </header>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <Link
              key={p.slug}
              href={`/work/${p.slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-line transition-colors hover:border-accent/40"
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-surface">
                <Image
                  src={p.poster}
                  alt={`${p.name} — ${p.tagline}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h2 className="text-lg font-semibold tracking-tight transition-colors group-hover:text-accent">
                  {p.name}
                </h2>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{p.tagline}</p>
                <p className="mt-auto pt-5 font-mono text-[10px] uppercase tracking-[0.2em] text-faint">
                  {p.industry} · {p.year}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </>
  )
}
