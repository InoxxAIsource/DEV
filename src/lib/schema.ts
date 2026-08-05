/*
  JSON-LD graph, built from src/data/site.ts.

  Rendered server-side by src/app/layout.tsx, so search crawlers and LLM
  fetchers get the structured data without executing JavaScript.

  The Organization is the primary entity — an answer engine asked "what is
  wwwdot.dev" should resolve a studio, not an individual. The founder is a
  separate Person node linked via founder/worksFor so the human is still
  discoverable without becoming the subject of the site.
*/
import { SITE_URL, org, socials, services, faqs, projects } from '@/data/site'

/* Only verified profiles: a wrong sameAs damages entity resolution. */
const sameAs = socials.filter((s) => s.verified).map((s) => s.href)

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
      knowsAbout: org.knowsAbout,
      founder: { '@id': `${SITE_URL}/#founder` },
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
    {
      '@type': 'ProfessionalService',
      '@id': `${SITE_URL}/#service`,
      name: `${org.name} — ${org.kind}`,
      description: org.description,
      url: SITE_URL,
      provider: { '@id': `${SITE_URL}/#org` },
      areaServed: 'Worldwide',
      availableLanguage: 'English',
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Engineering services',
        itemListElement: services.map((s) => ({
          '@type': 'OfferCatalog',
          name: s.title,
          itemListElement: s.items.map((i) => ({
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: i },
          })),
        })),
      },
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
      '@type': 'FAQPage',
      '@id': `${SITE_URL}/#faq`,
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
