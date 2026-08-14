import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { SITE_URL, org } from '@/data/site'
import { featured } from '@/data/featured'
import { videoMeta } from '@/data/videoMeta'
import { servicePages } from '@/data/servicePages'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { WatchVideo } from '@/components/WatchVideo'

export function generateStaticParams() {
  return featured.map((p) => ({ slug: p.slug }))
}

const bySlug = (slug: string) => featured.find((p) => p.slug === slug)

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const p = bySlug(slug)
  if (!p) return {}
  const title = `${p.name} — ${p.industry} Case Study`
  return {
    title,
    description: p.story.slice(0, 158),
    alternates: { canonical: `/work/${p.slug}` },
    openGraph: {
      title: `${title} | ${org.name}`,
      description: p.story.slice(0, 158),
      url: `/work/${p.slug}`,
      type: 'article',
      images: [{ url: p.poster, width: 960, height: 540, alt: `${p.name} — ${p.tagline}` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${org.name}`,
      description: p.story.slice(0, 158),
      images: [p.poster],
    },
  }
}

export default async function WorkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const p = bySlug(slug)
  if (!p) notFound()

  const meta = videoMeta[p.media]
  const idx = featured.findIndex((f) => f.slug === p.slug)
  const next = featured[(idx + 1) % featured.length]
  const prev = featured[(idx - 1 + featured.length) % featured.length]

  /* Services this project evidences, so the link graph runs both ways. */
  const relatedServices = servicePages.filter((s) => s.evidence.includes(p.slug))

  /*
    VideoObject is the point of this page. Google will only serve a video as a
    video result when it sits on a watch page — a page whose main content is
    that video. The homepage failed that test because its clips are decorative
    background. Here the video is the subject, above the fold, with a
    transcript-equivalent description beneath it.
  */
  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'VideoObject',
        '@id': `${SITE_URL}/work/${p.slug}#video`,
        name: `${p.name} — ${p.tagline}`,
        description: p.story,
        thumbnailUrl: [`${SITE_URL}${p.poster}`],
        uploadDate: meta?.uploadDate,
        duration: meta?.duration,
        width: meta?.width,
        height: meta?.height,
        contentUrl: `${SITE_URL}${p.media}`,
        embedUrl: `${SITE_URL}/work/${p.slug}`,
        isFamilyFriendly: true,
        inLanguage: 'en',
        creator: { '@id': `${SITE_URL}/#org` },
        publisher: { '@id': `${SITE_URL}/#org` },
      },
      {
        '@type': 'WebPage',
        '@id': `${SITE_URL}/work/${p.slug}#webpage`,
        url: `${SITE_URL}/work/${p.slug}`,
        name: `${p.name} — ${p.industry} Case Study`,
        description: p.story,
        isPartOf: { '@id': `${SITE_URL}/#website` },
        about: { '@id': `${SITE_URL}/#org` },
        primaryImageOfPage: `${SITE_URL}${p.poster}`,
        video: { '@id': `${SITE_URL}/work/${p.slug}#video` },
        inLanguage: 'en',
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${SITE_URL}/work/${p.slug}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Work', item: `${SITE_URL}/work` },
          { '@type': 'ListItem', position: 3, name: p.name },
        ],
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

      <main className="mx-auto max-w-[1100px] px-6 pb-24 pt-36 md:px-12 md:pt-44">
        <nav aria-label="Breadcrumb" className="mb-10">
          <ol className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.24em] text-faint">
            <li>
              <Link href="/" className="transition-colors hover:text-accent">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/work" className="transition-colors hover:text-accent">
                Work
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-muted">{p.name}</li>
          </ol>
        </nav>

        <header className="max-w-[46rem]">
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-accent">
            {p.industry} · {p.year}
          </p>
          <h1 className="mt-5 text-[clamp(2.4rem,5.6vw,4.25rem)] font-semibold leading-[1.02] tracking-[-0.04em]">
            {p.name}
          </h1>
          <p className="mt-5 text-[clamp(1.15rem,2vw,1.6rem)] leading-[1.25] tracking-[-0.02em] text-accent">
            {p.tagline}
          </p>
        </header>

        {/* The video is the main content of this page, not decoration. */}
        <figure className="mt-12">
          <WatchVideo
            src={p.media}
            poster={p.poster}
            label={`${p.name} — ${p.tagline}`}
          />
          <figcaption className="mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-faint">
            {p.name} product walkthrough · {meta?.seconds}s · {meta?.width}×{meta?.height}
          </figcaption>
        </figure>

        <section className="mt-16 grid gap-12 lg:grid-cols-[1.6fr_1fr]">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
              About {p.name}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted">{p.story}</p>
          </div>

          <dl className="grid content-start gap-7 border-t border-line pt-8 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-[0.26em] text-faint">
                Role
              </dt>
              <dd className="mt-2 text-sm leading-snug">{p.role}</dd>
            </div>
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-[0.26em] text-faint">
                Industry
              </dt>
              <dd className="mt-2 text-sm leading-snug">{p.industry}</dd>
            </div>
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-[0.26em] text-faint">
                Year
              </dt>
              <dd className="mt-2 text-sm leading-snug">{p.year}</dd>
            </div>
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-[0.26em] text-faint">
                Technologies
              </dt>
              <dd className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
                {p.tech.map((t) => (
                  <span key={t} className="font-mono text-xs">
                    {t}
                  </span>
                ))}
              </dd>
            </div>
          </dl>
        </section>

        {relatedServices.length > 0 && (
          <section className="mt-20 border-t border-line pt-12">
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
              Services behind this build
            </h2>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {relatedServices.map((s) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="group rounded-2xl border border-line bg-surface p-7 transition-colors hover:border-accent/40"
                >
                  <h3 className="text-lg font-semibold tracking-tight transition-colors group-hover:text-accent">
                    {s.h1}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted">{s.intent}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Prev / next keeps every case study reachable within two clicks. */}
        <nav className="mt-20 grid gap-5 border-t border-line pt-12 sm:grid-cols-2">
          {[
            { p: prev, label: 'Previous' },
            { p: next, label: 'Next' },
          ].map(({ p: n, label }) => (
            <Link
              key={label}
              href={`/work/${n.slug}`}
              className="group flex items-center gap-5 rounded-2xl border border-line p-5 transition-colors hover:border-accent/40"
            >
              <div className="relative aspect-[16/10] w-28 shrink-0 overflow-hidden rounded-lg bg-surface">
                <Image
                  src={n.poster}
                  alt=""
                  fill
                  sizes="112px"
                  className="object-cover"
                />
              </div>
              <div className="min-w-0">
                <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-faint">
                  {label}
                </span>
                <p className="mt-1 truncate font-semibold tracking-tight transition-colors group-hover:text-accent">
                  {n.name}
                </p>
              </div>
            </Link>
          ))}
        </nav>

        <section className="mt-20 rounded-2xl border border-line bg-surface p-10 md:p-14">
          <h2 className="max-w-2xl text-2xl font-semibold tracking-tight md:text-3xl">
            Building something like {p.name}?
          </h2>
          <p className="mt-4 max-w-xl text-muted">
            We reply within one business day, usually with questions and a rough scope.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
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
