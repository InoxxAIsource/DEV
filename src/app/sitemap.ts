import type { MetadataRoute } from 'next'
import { SITE_URL, routes } from '@/data/site'

/*
  Generated at build time. Add entries to `routes` in src/data/site.ts — blog
  posts and service pages will map straight in as they are added.

  lastModified comes from each route's explicit `lastmod`, not from new Date().
  Build time meant every deploy re-dated every URL, which trains crawlers to
  ignore the field.
*/
export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified: new Date(r.lastmod),
    changeFrequency: r.changefreq as MetadataRoute.Sitemap[number]['changeFrequency'],
    priority: r.priority,
  }))
}
