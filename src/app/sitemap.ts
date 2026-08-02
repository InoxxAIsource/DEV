import type { MetadataRoute } from 'next'
import { SITE_URL, routes } from '@/data/site'

/*
  Generated at build time. Add entries to `routes` in src/data/site.ts — blog
  posts and service pages will map straight in as they are added.
*/
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  return routes.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified,
    changeFrequency: r.changefreq as MetadataRoute.Sitemap[number]['changeFrequency'],
    priority: r.priority,
  }))
}
