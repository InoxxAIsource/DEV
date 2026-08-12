import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL, org } from '@/data/site'
import { servicePages } from '@/data/servicePages'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  title: 'AI Engineering Services',
  description:
    'AI development, AI agents, AI SaaS, MVP and blockchain engineering. Production software built by the team that designs it, with shipped work behind every service.',
  alternates: { canonical: '/services' },
  openGraph: {
    title: `AI Engineering Services | ${org.name}`,
    description: org.description,
    url: '/services',
    type: 'website',
    images: [{ url: org.ogImage, width: 1200, height: 630, alt: `${org.name} services` }],
  },
}

const graph = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      '@id': `${SITE_URL}/services#webpage`,
      url: `${SITE_URL}/services`,
      name: 'AI Engineering Services',
      description: org.description,
      isPartOf: { '@id': `${SITE_URL}/#website` },
      about: { '@id': `${SITE_URL}/#org` },
      inLanguage: 'en',
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${SITE_URL}/services#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Services' },
      ],
    },
    {
      '@type': 'ItemList',
      '@id': `${SITE_URL}/services#list`,
      name: 'Services',
      numberOfItems: servicePages.length,
      itemListElement: servicePages.map((s, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: s.h1,
        url: `${SITE_URL}/services/${s.slug}`,
      })),
    },
  ],
}

export default function ServicesHub() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
      />
      <div id="top-sentinel" className="absolute top-0 h-24 w-px" aria-hidden="true" />
      <Nav />

      <main className="mx-auto max-w-[1200px] px-6 pb-24 pt-36 md:px-12 md:pt-44">
        <nav aria-label="Breadcrumb" className="mb-10">
          <ol className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.24em] text-faint">
            <li>
              <Link href="/" className="transition-colors hover:text-accent">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-muted">Services</li>
          </ol>
        </nav>

        <header className="max-w-[46rem]">
          <h1 className="text-[clamp(2.4rem,5.6vw,4.25rem)] font-semibold leading-[1.02] tracking-[-0.04em]">
            AI engineering services
          </h1>
          <p className="mt-7 text-lg leading-relaxed text-muted md:text-xl">
            Five disciplines, each backed by products already running in production. The
            engineers who architect the system are the ones who ship it.
          </p>
        </header>

        <div className="mt-20 grid gap-6 md:grid-cols-2">
          {servicePages.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="group flex flex-col rounded-2xl border border-line bg-surface p-8 transition-colors hover:border-accent/40 md:p-10"
            >
              <h2 className="text-2xl font-semibold tracking-tight transition-colors group-hover:text-accent">
                {s.h1}
              </h2>
              <p className="mt-4 leading-relaxed text-muted">{s.lede}</p>
              <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
                {s.capabilities.slice(0, 4).map((c) => (
                  <li key={c} className="font-mono text-[11px] text-faint">
                    {c}
                  </li>
                ))}
              </ul>
              <span className="mt-8 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
                Explore
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path
                    d="M3 11L11 3M11 3H5M11 3V9"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </>
  )
}
