/*
  JSON-LD graph, built from src/data/site.ts.

  Rendered server-side by src/app/layout.tsx, so search crawlers and LLM
  fetchers get the structured data without executing JavaScript.

  Design notes:
  - Organization is the primary entity. An engine asked "what is wwwdot.dev"
    should resolve a studio, not an individual. The founder is a separate
    Person node linked via founder/worksFor so the human stays discoverable
    without becoming the subject.
  - Each service is emitted as its own `Service` node with a stable @id rather
    than only as OfferCatalog strings. Named service entities are what an
    answer engine can match against "who builds AI agents", and they give the
    future /ai-development style routes something to attach to.
  - Nothing unverifiable is claimed: no address, telephone, foundingDate,
    aggregateRating or review. Fabricated trust signals are worse than absent
    ones, because they are checkable.
*/
import { SITE_URL, org, socials, services, faqs, projects } from '@/data/site'

/* Only verified profiles: a wrong sameAs damages entity resolution. */
const sameAs = socials.filter((s) => s.verified).map((s) => s.href)

const abs = (p: string) => `${SITE_URL}${p}`

export const jsonLdGraph = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#org`,
      name: org.name,
      alternateName: org.kind,
      slogan: org.slogan,
      description: org.summary,
      url: SITE_URL,
      email: `mailto:${org.email}`,
      logo: {
        '@type': 'ImageObject',
        '@id': `${SITE_URL}/#logo`,
        url: abs(org.logo),
        width: 512,
        height: 512,
        caption: org.name,
      },
      image: { '@id': `${SITE_URL}/#logo` },
      knowsAbout: org.knowsAbout,
      founder: { '@id': `${SITE_URL}/#founder` },
      makesOffer: services.map((s) => ({ '@id': `${SITE_URL}/#service-${s.slug}` })),
      ...(sameAs.length ? { sameAs } : {}),
    },
    {
      '@type': 'Person',
      '@id': `${SITE_URL}/#founder`,
      name: org.foundedBy,
      jobTitle: 'Founder & Principal Engineer',
      worksFor: { '@id': `${SITE_URL}/#org` },
      url: SITE_URL,
      ...(sameAs.length ? { sameAs } : {}),
    },

    /* One addressable entity per service. */
    ...services.map((s) => ({
      '@type': 'Service',
      '@id': `${SITE_URL}/#service-${s.slug}`,
      name: s.title,
      description: s.blurb,
      serviceType: s.title,
      provider: { '@id': `${SITE_URL}/#org` },
      areaServed: 'Worldwide',
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: s.title,
        itemListElement: s.items.map((i) => ({
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: i },
        })),
      },
    })),

    {
      '@type': 'ProfessionalService',
      '@id': `${SITE_URL}/#service`,
      name: `${org.name} — ${org.kind}`,
      description: org.description,
      url: SITE_URL,
      provider: { '@id': `${SITE_URL}/#org` },
      areaServed: 'Worldwide',
      availableLanguage: 'English',
      knowsAbout: org.knowsAbout,
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: org.name,
      description: org.description,
      publisher: { '@id': `${SITE_URL}/#org` },
      inLanguage: 'en',
    },
    {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/#webpage`,
      url: SITE_URL,
      name: `${org.name} | ${org.kind}`,
      description: org.description,
      isPartOf: { '@id': `${SITE_URL}/#website` },
      about: { '@id': `${SITE_URL}/#org` },
      primaryImageOfPage: { '@id': `${SITE_URL}/#logo` },
      inLanguage: 'en',
    },
    {
      '@type': 'FAQPage',
      '@id': `${SITE_URL}/#faq`,
      isPartOf: { '@id': `${SITE_URL}/#webpage` },
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
    {
      '@type': 'ItemList',
      '@id': `${SITE_URL}/#work`,
      name: 'Selected work',
      numberOfItems: projects.length,
      itemListElement: projects.map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'CreativeWork',
          name: p.name,
          description: p.desc,
          keywords: p.stack.join(', '),
          creator: { '@id': `${SITE_URL}/#org` },
        },
      })),
    },
  ],
}
