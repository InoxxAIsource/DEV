import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { SITE_URL, org } from '@/data/site'
import { servicePages, serviceBySlug } from '@/data/servicePages'
import { featured } from '@/data/featured'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'

export function generateStaticParams() {
  return servicePages.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const s = serviceBySlug(slug)
  if (!s) return {}
  return {
    title: s.title,
    description: s.description,
    alternates: { canonical: `/services/${s.slug}` },
    openGraph: {
      title: `${s.title} | ${org.name}`,
      description: s.description,
      url: `/services/${s.slug}`,
      type: 'website',
      images: [{ url: org.ogImage, width: 1200, height: 630, alt: s.h1 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${s.title} | ${org.name}`,
      description: s.description,
      images: [org.ogImage],
    },
  }
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const s = serviceBySlug(slug)
  if (!s) notFound()

  const work = s.evidence
    .map((sl) => featured.find((f) => f.slug === sl))
    .filter((f): f is NonNullable<typeof f> => Boolean(f))

  const related = s.related
    .map((sl) => serviceBySlug(sl))
    .filter((r): r is NonNullable<typeof r> => Boolean(r))

  /*
    Per-page graph. Service carries the same @id as the homepage node so the
    two describe one entity rather than competing duplicates. BreadcrumbList
    gives the hierarchy, FAQPage is scoped to this page's own questions.
  */
  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${SITE_URL}/services/${s.slug}#webpage`,
        url: `${SITE_URL}/services/${s.slug}`,
        name: s.title,
        description: s.description,
        isPartOf: { '@id': `${SITE_URL}/#website` },
        about: { '@id': `${SITE_URL}/#org` },
        inLanguage: 'en',
      },
      {
        '@type': 'Service',
        '@id': `${SITE_URL}/services/${s.slug}#service`,
        name: s.h1,
        description: s.description,
        serviceType: s.h1,
        provider: { '@id': `${SITE_URL}/#org` },
        areaServed: 'Worldwide',
        url: `${SITE_URL}/services/${s.slug}`,
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: s.h1,
          itemListElement: s.capabilities.map((c) => ({
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: c },
          })),
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${SITE_URL}/services/${s.slug}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE_URL}/services` },
          { '@type': 'ListItem', position: 3, name: s.h1 },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': `${SITE_URL}/services/${s.slug}#faq`,
        isPartOf: { '@id': `${SITE_URL}/services/${s.slug}#webpage` },
        mainEntity: s.faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
      />
      <div id="top-sentinel" className="absolute top-0 h-24 w-px" aria-hidden="true" />
      <Nav />

      <main className="mx-auto max-w-[1200px] px-6 pb-24 pt-36 md:px-12 md:pt-44">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-10">
          <ol className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.24em] text-faint">
            <li>
              <Link href="/" className="transition-colors hover:text-accent">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/services" className="transition-colors hover:text-accent">
                Services
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-muted">{s.h1}</li>
          </ol>
        </nav>

        <header className="max-w-[46rem]">
          <h1 className="text-[clamp(2.4rem,5.6vw,4.25rem)] font-semibold leading-[1.02] tracking-[-0.04em]">
            {s.h1}
          </h1>
          <p className="mt-7 text-lg leading-relaxed text-muted md:text-xl">{s.lede}</p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href="#contact-cta"
              className="inline-flex items-center gap-3 rounded-full bg-accent px-7 py-4 text-[15px] font-semibold text-bg transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5"
            >
              Start a project
            </a>
            <Link
              href="/#work"
              className="inline-flex items-center rounded-full border border-line px-7 py-4 text-[15px] font-semibold text-ink transition-[transform,border-color] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:border-accent/50"
            >
              See all work
            </Link>
          </div>
        </header>

        {/* Capabilities */}
        <section className="mt-24 border-t border-line pt-14">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">What we build</h2>
          <ul className="mt-9 grid gap-x-10 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
            {s.capabilities.map((c) => (
              <li key={c} className="flex items-baseline gap-3 text-[15px] text-muted">
                <span aria-hidden="true" className="font-mono text-[10px] text-accent">
                  +
                </span>
                {c}
              </li>
            ))}
          </ul>
        </section>

        {/* Approach */}
        <section className="mt-24 border-t border-line pt-14">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">How we work</h2>
          <div className="mt-10 grid gap-10 md:grid-cols-3">
            {s.approach.map((a) => (
              <div key={a.title}>
                <h3 className="text-lg font-semibold tracking-tight text-accent">{a.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">{a.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Evidence — real shipped products. Hidden entirely when this service
            has none, rather than printing an empty "Shipped work" heading that
            advertises the gap. Honest omission beats a hollow section. */}
        {work.length > 0 && (
        <section className="mt-24 border-t border-line pt-14">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Shipped work</h2>
          <p className="mt-4 max-w-2xl text-muted">
            Products already built and running, not concept pieces.
          </p>
          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            {work.map((p) => (
              <Link
                key={p.slug}
                href={`/#${p.slug}`}
                className="group block overflow-hidden rounded-2xl border border-line transition-colors hover:border-accent/40"
              >
                <div className="relative aspect-[16/9] overflow-hidden bg-surface">
                  <Image
                    src={p.poster}
                    alt={`${p.name} — ${p.tagline}`}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold tracking-tight">{p.name}</h3>
                  <p className="mt-1.5 text-sm text-muted">{p.tagline}</p>
                  <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-faint">
                    {p.industry} · {p.tech.join(' · ')}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
        )}

        {/* FAQ */}
        <section className="mt-24 border-t border-line pt-14">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            {s.h1} questions
          </h2>
          <dl className="mt-10 max-w-3xl">
            {s.faqs.map((f) => (
              <div key={f.q} className="border-b border-line py-7">
                <dt className="text-lg font-semibold tracking-tight">{f.q}</dt>
                <dd className="mt-3 leading-relaxed text-muted">{f.a}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Related services — internal link equity */}
        <section className="mt-24 border-t border-line pt-14">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Related services</h2>
          <div className="mt-9 grid gap-5 md:grid-cols-3">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/services/${r.slug}`}
                className="group rounded-2xl border border-line bg-surface p-7 transition-colors hover:border-accent/40"
              >
                <h3 className="text-lg font-semibold tracking-tight transition-colors group-hover:text-accent">
                  {r.h1}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted">{r.intent}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section
          id="contact-cta"
          className="mt-24 rounded-2xl border border-line bg-surface p-10 md:p-14"
        >
          <h2 className="max-w-2xl text-3xl font-semibold tracking-tight md:text-4xl">
            Tell us what you are trying to ship.
          </h2>
          <p className="mt-4 max-w-xl text-muted">
            We reply within one business day, usually with questions and a rough scope.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${org.email}`}
              className="inline-flex items-center rounded-full bg-accent px-7 py-4 text-[15px] font-semibold text-bg transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5"
            >
              {org.email}
            </a>
            <Link
              href="/#contact"
              className="inline-flex items-center rounded-full border border-line px-7 py-4 text-[15px] font-semibold text-ink transition-[transform,border-color] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:border-accent/50"
            >
              Use the enquiry form
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
