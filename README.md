# wwwdot.dev

Personal site for **Mohd Tauheed** — independent full-stack, blockchain, DeFi and mobile engineer.

Next.js App Router · React 19 · TypeScript · Tailwind v4 · GSAP · Lenis

---

## Getting started

```bash
npm install
npm run dev
```

| Script | Does |
| --- | --- |
| `npm run dev` | Dev server |
| `npm run build` | Regenerates `llms.txt`, then builds |
| `npm start` | Serves the production build |
| `npm run seo` | Regenerates the LLM-facing text files only |
| `npm run typecheck` | `tsc --noEmit` |

## Structure

```
src/
  app/            layout (metadata + JSON-LD), page, robots.ts, sitemap.ts
  components/     sections; interactive ones declare 'use client'
  data/site.ts    single source of truth for all SEO/GEO content
  lib/
    Reveal.tsx    IntersectionObserver scroll reveals
    schema.ts     JSON-LD graph built from data/site.ts
scripts/
  gen-seo.mjs     writes public/llms.txt + llms-full.txt
public/work/      project recordings
```

## SEO / GEO / AEO

Everything derives from [`src/data/site.ts`](src/data/site.ts) — change a fact there and
every surface updates together.

| Surface | Source |
| --- | --- |
| `/robots.txt` | `src/app/robots.ts` — allows 16 AI crawlers incl. GPTBot, ClaudeBot, PerplexityBot, Google-Extended |
| `/sitemap.xml` | `src/app/sitemap.ts` — driven by `routes` |
| `/llms.txt`, `/llms-full.txt` | `scripts/gen-seo.mjs` ([llmstxt.org](https://llmstxt.org)) |
| JSON-LD | `src/lib/schema.ts` — `Person`, `ProfessionalService`, `WebSite`, `FAQPage`, `ItemList` |
| Titles, canonical, OG, Twitter | Next Metadata API in `src/app/layout.tsx` |

The FAQ component and the `FAQPage` schema read the same array, so on-page copy
and structured data cannot drift apart.

**Changing the domain:** edit `SITE_URL` in `src/data/site.ts`. Nothing else needs touching.

## Notes

- Work videos lazy-load via IntersectionObserver — only clips near the viewport
  attach a `src`, and they pause when scrolled away. One video loads on first paint.
- Card containers use each recording's exact native ratio (`aspect-[1920/936]` etc.)
  so nothing is cropped. Re-encodes must preserve resolution or those need updating.
- Videos are served with immutable cache headers (`next.config.ts`).

## Deployment

Deployed on Vercel from `main`. Every push builds and deploys automatically.
