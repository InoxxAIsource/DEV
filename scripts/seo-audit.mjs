/* SEO/GEO evidence-gathering pass against production. Read-only. */
import { chromium } from 'playwright'

const BASE = 'https://www.wwwdot.dev'
const out = (h) => console.log('\n' + '='.repeat(64) + '\n' + h + '\n' + '='.repeat(64))

/* ── 1. RAW HTML (what a non-rendering crawler sees) ───────────────────── */
out('1. RAW SERVER HTML')
const t0 = Date.now()
const res = await fetch(BASE + '/?cb=' + Date.now(), { cache: 'no-store' })
const html = await res.text()
const ttfb = Date.now() - t0

const strip = (s) =>
  s.replace(/<script[\s\S]*?<\/script>/gi, ' ')
   .replace(/<style[\s\S]*?<\/style>/gi, ' ')
   .replace(/<[^>]+>/g, ' ')
   .replace(/\s+/g, ' ')
   .trim()

const rawText = strip(html)
console.log('  status            :', res.status)
console.log('  fetch ms          :', ttfb)
console.log('  html bytes        :', html.length.toLocaleString())
console.log('  visible words     :', rawText.split(' ').length.toLocaleString())
console.log('  title             :', (html.match(/<title>([^<]*)<\/title>/) || [])[1])
console.log('  title length      :', ((html.match(/<title>([^<]*)<\/title>/) || [])[1] || '').length, '(50-60 ideal)')
const desc = (html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || ''
console.log('  meta description  :', desc.slice(0, 90) + (desc.length > 90 ? '…' : ''))
console.log('  desc length       :', desc.length, '(150-160 ideal)')

/* headings from raw html */
const heads = [...html.matchAll(/<(h[1-6])[^>]*>([\s\S]*?)<\/\1>/gi)].map((m) => ({
  tag: m[1].toLowerCase(),
  text: strip(m[2]).slice(0, 58),
}))
console.log('\n  heading counts    :', ['h1','h2','h3','h4','h5','h6']
  .map((t) => t + '=' + heads.filter((h) => h.tag === t).length).join('  '))
console.log('  first 12 headings :')
heads.slice(0, 12).forEach((h) => console.log(`    <${h.tag}> ${h.text}`))

/* ── 2. INDEXABLE SURFACE ──────────────────────────────────────────────── */
out('2. INDEXABLE SURFACE')
const sm = await (await fetch(BASE + '/sitemap.xml')).text()
const locs = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
console.log('  URLs in sitemap   :', locs.length)
locs.forEach((l) => console.log('    ', l))
const internal = [...new Set([...html.matchAll(/href="(\/[^"#?]*)"/g)].map((m) => m[1]))]
console.log('  internal href targets (non-anchor):', internal.length ? internal : 'NONE — every link is an on-page #anchor')
const anchors = [...new Set([...html.matchAll(/href="(#[^"]+)"/g)].map((m) => m[1]))]
console.log('  on-page anchors   :', anchors.length, anchors.slice(0, 10).join(' '))

/* ── 3. STRUCTURED DATA ────────────────────────────────────────────────── */
out('3. STRUCTURED DATA')
const ld = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)
if (ld) {
  const g = JSON.parse(ld[1])
  const nodes = g['@graph'] || [g]
  console.log('  nodes:', nodes.length)
  nodes.forEach((n) => {
    const keys = Object.keys(n).filter((k) => !k.startsWith('@'))
    console.log(`    ${n['@type'].padEnd(22)} ${keys.length} props  [${keys.slice(0, 7).join(', ')}]`)
  })
  const orgN = nodes.find((n) => n['@type'] === 'Organization')
  if (orgN) {
    console.log('\n  Organization detail:')
    console.log('    sameAs      :', orgN.sameAs || 'MISSING')
    console.log('    logo        :', orgN.logo || 'MISSING')
    console.log('    address     :', orgN.address || 'MISSING')
    console.log('    telephone   :', orgN.telephone || 'MISSING')
    console.log('    foundingDate:', orgN.foundingDate || 'MISSING')
    console.log('    aggregateRating:', orgN.aggregateRating || 'MISSING (correct if no real reviews)')
  }
} else console.log('  NO JSON-LD FOUND')

/* ── 4. SOCIAL / OG ────────────────────────────────────────────────────── */
out('4. OPEN GRAPH / TWITTER')
for (const p of ['og:title','og:description','og:url','og:type','og:image','og:site_name','twitter:card','twitter:image']) {
  const v = (html.match(new RegExp(`(?:property|name)="${p}" content="([^"]*)"`)) || [])[1]
  console.log(`  ${p.padEnd(18)} ${v ? v.slice(0, 70) : '*** MISSING ***'}`)
}

/* ── 5. RENDERED DOM + PERFORMANCE ─────────────────────────────────────── */
out('5. RENDERED DOM vs RAW  +  WEIGHT')
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
const reqs = []
page.on('response', (r) => reqs.push({ url: r.url(), type: r.request().resourceType(), status: r.status() }))
await page.goto(BASE, { waitUntil: 'networkidle' })
await page.waitForTimeout(2500)

const rendered = await page.evaluate(() => ({
  words: document.body.innerText.trim().split(/\s+/).length,
  images: document.querySelectorAll('img').length,
  imagesNoAlt: [...document.querySelectorAll('img')].filter((i) => !i.getAttribute('alt')).length,
  videos: document.querySelectorAll('video').length,
  links: document.querySelectorAll('a').length,
  externalLinks: [...document.querySelectorAll('a[href^="http"]')].filter((a) => !a.href.includes('wwwdot.dev')).map((a) => a.href),
  h1: [...document.querySelectorAll('h1')].map((h) => h.innerText.trim()),
}))
console.log('  raw words         :', rawText.split(' ').length.toLocaleString())
console.log('  rendered words    :', rendered.words.toLocaleString())
console.log('  delta (JS-only)   :', (rendered.words - rawText.split(' ').length).toLocaleString())
console.log('  H1                :', rendered.h1)
console.log('  images / no alt   :', rendered.images, '/', rendered.imagesNoAlt)
console.log('  videos            :', rendered.videos)
console.log('  total links       :', rendered.links)
console.log('  external links    :', rendered.externalLinks.length, rendered.externalLinks.slice(0, 5))

const byType = {}
for (const r of reqs) byType[r.type] = (byType[r.type] || 0) + 1
console.log('\n  requests by type  :', JSON.stringify(byType))

const perf = await page.evaluate(() => {
  const n = performance.getEntriesByType('navigation')[0]
  const lcp = performance.getEntriesByType('largest-contentful-paint').pop()
  return {
    domContentLoaded: Math.round(n.domContentLoadedEventEnd),
    load: Math.round(n.loadEventEnd),
    transferMB: +(performance.getEntriesByType('resource').reduce((s, r) => s + (r.transferSize || 0), 0) / 1048576).toFixed(2),
    lcpMs: lcp ? Math.round(lcp.startTime) : null,
  }
})
console.log('  DOMContentLoaded  :', perf.domContentLoaded, 'ms')
console.log('  load              :', perf.load, 'ms')
console.log('  transferred       :', perf.transferMB, 'MB')
console.log('  LCP               :', perf.lcpMs, 'ms  (<2500 good)')

/* CLS */
const cls = await page.evaluate(() => new Promise((res) => {
  let v = 0
  new PerformanceObserver((l) => { for (const e of l.getEntries()) if (!e.hadRecentInput) v += e.value }).observe({ type: 'layout-shift', buffered: true })
  setTimeout(() => res(+v.toFixed(4)), 1200)
}))
console.log('  CLS               :', cls, '(<0.1 good)')

await browser.close()
console.log('\nAUDIT COMPLETE')
