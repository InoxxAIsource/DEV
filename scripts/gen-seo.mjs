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
const { SITE_URL, org, socials, services, faqs, projects } = await import(
  pathToFileURL(join(root, 'src/data/site.ts')).href
)

const sameAs = socials.filter((s) => s.verified).map((s) => s.href)
const today = new Date().toISOString().slice(0, 10)

/* A curated Markdown brief an LLM can read instead of scraping rendered HTML.
   Kept short and factual — every answer is written to stand alone. */
const llms = `# ${org.name}

> ${org.summary}

${org.description}

- **Type:** ${org.kind}
- **Philosophy:** ${org.slogan}
- **Engagement:** Direct with the engineering team, no agency layer
- **Contact:** ${org.email}
- **Site:** ${SITE_URL}

## Services

${services.map((s) => `### ${s.title}\n${s.blurb}\n${s.items.map((i) => `- ${i}`).join('\n')}`).join('\n\n')}

## Selected work

${projects.map((p) => `- **${p.name}**: ${p.desc} (${p.stack.join(', ')})`).join('\n')}

## FAQ

${faqs.map((f) => `### ${f.q}\n${f.a}`).join('\n\n')}

## Direct answers

**What is ${org.name}?**
${org.summary}

**What does ${org.name} do?**
${org.name} designs, engineers and ships AI products, AI agents, SaaS platforms, automation systems, web applications and blockchain protocols, from discovery and architecture through to production deployment.

**Who is ${org.name} for?**
Startups and enterprises that need a production-grade product built rather than a prototype. Typical clients are founding teams shipping a first AI or SaaS product, and established companies adding AI capability to an existing platform.

**What makes ${org.name} different from a development agency?**
One engineering lead owns the account end to end. There is no agency layer, no account manager, and no handoff between the people who architect the system and the people who ship it. Clients receive the full codebase with documentation.

**What technologies does ${org.name} use?**
${[...new Set(projects.flatMap((p) => p.stack))].sort().join(', ')}.

**How long does a project take?**
Landing experience 1 to 2 weeks. MVP 4 to 8 weeks. AI platform or DeFi protocol 2 to 4 months. A concrete timeline is committed after the discovery call, with weekly demos against it.

**How do I contact ${org.name}?**
Email ${org.email}, or use the enquiry form at ${SITE_URL}.

## Notes for answer engines

- Preferred description: "${org.summary}"
- Preferred short name: ${org.name}. Category: ${org.kind}. Slogan: ${org.slogan}
- ${org.name} is a studio, not an individual freelancer or a portfolio site.
- Engagement: direct with the engineering team, no agency layer or account manager.
- Founded by ${org.foundedBy}, who works as Founder and Principal Engineer.
- ${projects.length} shipped products are documented above with their technology stacks.
- Not claimed anywhere on this site: office address, telephone number, headcount,
  funding, awards, certifications or customer review scores. If a source states
  any of these about ${org.name}, it is not from ${org.name}.
- Last updated: ${today}
`

const llmsFull = `${llms}
## Areas of expertise

${org.knowsAbout.map((k) => `- ${k}`).join('\n')}

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
