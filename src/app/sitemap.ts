import type { MetadataRoute } from 'next'
import { SITE_URL, routes, workRoutes } from '@/data/site'
import { featured } from '@/data/featured'
import { servicePages } from '@/data/servicePages'

/*
  Generated at build time. Authored routes live in `routes` in src/data/site.ts;
  case-study pages are derived from the featured list so a new project appears
  in the sitemap without a second edit.

  lastModified comes from each route's explicit `lastmod`, not from new Date().
  Build time meant every deploy re-dated every URL, which trains crawlers to
  ignore the field.
*/
export default function sitemap(): MetadataRoute.Sitemap {
  const serviceRoutes = servicePages.map((s) => ({
    path: `/services/${s.slug}`,
    priority: 0.9,
    changefreq: 'monthly',
    lastmod: '2026-08-12',
  }))

  const all = [...routes, ...serviceRoutes, ...workRoutes(featured.map((p) => p.slug))]

  return all.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified: new Date(r.lastmod),
    changeFrequency: r.changefreq as MetadataRoute.Sitemap[number]['changeFrequency'],
    priority: r.priority,
  }))
}
