/*
  JSON-LD graph, built from src/data/site.ts.

  Rendered server-side by src/app/layout.tsx, so search crawlers and LLM
  fetchers get the structured data without executing JavaScript.
*/
import { SITE_URL, person, socials, services, faqs, projects } from '@/data/site'

/* Only verified profiles: a wrong sameAs damages entity resolution. */
const sameAs = socials.filter((s) => s.verified).map((s) => s.href)

export const jsonLdGraph = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${SITE_URL}/#person`,
      name: person.name,
      jobTitle: person.jobTitle,
      description: person.summary,
      email: `mailto:${person.email}`,
      url: SITE_URL,
      knowsAbout: person.knowsAbout,
      ...(sameAs.length ? { sameAs } : {}),
    },
    {
      '@type': 'ProfessionalService',
      '@id': `${SITE_URL}/#service`,
      name: `${person.name} — ${person.jobTitle}`,
      description: person.description,
      url: SITE_URL,
      provider: { '@id': `${SITE_URL}/#person` },
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
      name: `${person.name} | ${person.jobTitle}`,
      description: person.description,
      publisher: { '@id': `${SITE_URL}/#person` },
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
        },
      })),
    },
  ],
}
