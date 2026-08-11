import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/data/site'

/*
  Explicitly allowing AI crawlers is the entry ticket for GEO. Several of these
  will not crawl without an allow rule, and Google-Extended is the switch that
  governs eligibility for AI Overviews / Gemini grounding.
*/
const AI_AGENTS = [
  'GPTBot', // OpenAI training + browsing
  'OAI-SearchBot', // ChatGPT search results
  'ChatGPT-User', // ChatGPT live user fetches
  'ClaudeBot', // Anthropic crawler
  'Claude-User',
  'anthropic-ai',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended', // gates AI Overviews / Gemini
  'Applebot-Extended',
  'CCBot', // Common Crawl - feeds many models
  'Bytespider',
  'meta-externalagent',
  'cohere-ai',
  'Diffbot',
  'Amazonbot',
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      ...AI_AGENTS.map((userAgent) => ({ userAgent, allow: '/' })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    /* No `host`: it is a Yandex-only directive that Google ignores, and Next
       emits it as a full URL ("Host: https://...") which is not valid Host
       syntax anyway. Canonicalisation is handled by <link rel="canonical">. */
  }
}
