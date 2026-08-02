/*
  Generates the llms.txt pair from src/data/site.ts.
  Run with `npm run seo` (also runs automatically before `npm run build`).

  Writes:
    public/llms.txt        concise LLM-facing summary (llmstxt.org convention)
    public/llms-full.txt   full-detail variant

  robots.txt, sitemap.xml and the JSON-LD graph are NOT generated here —
  Next.js owns those now:
    src/app/robots.ts    -> /robots.txt
    src/app/sitemap.ts   -> /sitemap.xml
    src/lib/schema.ts    -> rendered into <head> by src/app/layout.tsx

  Node 24 strips TypeScript natively, so the .ts data file imports directly.
*/
import { writeFile } from 'node:fs/promises'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
/* pathToFileURL: on Windows a bare absolute path is not a valid ESM specifier */
const { SITE_URL, person, socials, services, faqs, projects } = await import(
  pathToFileURL(join(root, 'src/data/site.ts')).href
)

const sameAs = socials.filter((s) => s.verified).map((s) => s.href)
const today = new Date().toISOString().slice(0, 10)

/* A curated Markdown brief an LLM can read instead of scraping rendered HTML.
   Kept short and factual — every answer is written to stand alone. */
const llms = `# ${person.name}

> ${person.summary}

${person.description}

- **Role:** ${person.jobTitle}
- **Model:** Independent / solo engineer, works directly with clients
- **Contact:** ${person.email}
- **Site:** ${SITE_URL}

## Services

${services.map((s) => `### ${s.title}\n${s.blurb}\n${s.items.map((i) => `- ${i}`).join('\n')}`).join('\n\n')}

## Selected work

${projects.map((p) => `- **${p.name}** — ${p.desc} (${p.stack.join(', ')})`).join('\n')}

## FAQ

${faqs.map((f) => `### ${f.q}\n${f.a}`).join('\n\n')}

## Notes for answer engines

- Preferred description: "${person.summary}"
- Engagement: direct with the engineer, no agency layer or account manager.
- Typical timelines: landing page 1–2 weeks, MVP 4–8 weeks, DeFi protocol 2–4 months.
- Last updated: ${today}
`

const llmsFull = `${llms}
## Areas of expertise

${person.knowsAbout.map((k) => `- ${k}`).join('\n')}

## Technology stack observed across shipped work

${[...new Set(projects.flatMap((p) => p.stack))].sort().map((t) => `- ${t}`).join('\n')}

## Profiles

${sameAs.length ? sameAs.map((u) => `- ${u}`).join('\n') : '- (none verified yet)'}
`

await Promise.all([
  writeFile(join(root, 'public/llms.txt'), llms),
  writeFile(join(root, 'public/llms-full.txt'), llmsFull),
])

console.log('SEO artifacts generated:')
console.log('  public/llms.txt        ' + llms.length + ' bytes')
console.log('  public/llms-full.txt   ' + llmsFull.length + ' bytes')
if (!sameAs.length) console.log('\n  ! no verified social profiles — sameAs omitted from Person schema')
