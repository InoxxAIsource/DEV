/*
  Renders brand raster assets from the real wordmark, so the logo in
  structured data and the OG card use the same type as the site rather than
  a hand-drawn approximation.

  Writes:
    public/logo.png            512x512, square, for Organization.logo
    public/og.png              1200x630, for og:image / twitter:image

  Run with `npm run brand`.
*/
import { chromium } from 'playwright'

const FONT =
  'https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600,700&display=swap'

const shell = (body, w, h) => `
<!doctype html><html><head><meta charset="utf-8">
<link href="${FONT}" rel="stylesheet">
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  html,body{width:${w}px;height:${h}px}
  body{
    background:hsl(20 10% 5%);
    color:hsl(32 24% 93%);
    font-family:"General Sans",system-ui,sans-serif;
    display:flex;align-items:center;justify-content:center;
    -webkit-font-smoothing:antialiased;
  }
  .accent{color:hsl(28 100% 55%)}
</style></head><body>${body}</body></html>`

const browser = await chromium.launch()

/* ── square logo ─────────────────────────────────────────────────────── */
const logo = await browser.newPage({ viewport: { width: 512, height: 512 } })
await logo.setContent(
  shell(
    `<div style="font-size:96px;font-weight:600;letter-spacing:-.045em">www<span class="accent">dot</span></div>`,
    512,
    512,
  ),
)
await logo.waitForTimeout(2500) // let the webfont land
await logo.screenshot({ path: 'public/logo.png' })
console.log('wrote public/logo.png            512x512')

/* ── OG card ─────────────────────────────────────────────────────────── */
const og = await browser.newPage({ viewport: { width: 1200, height: 630 } })
await og.setContent(
  shell(
    `<div style="width:100%;height:100%;display:flex;flex-direction:column;justify-content:space-between;padding:72px">
       <div style="font-size:44px;font-weight:600;letter-spacing:-.045em">www<span class="accent">dot</span></div>
       <div>
         <div style="font-family:ui-monospace,monospace;font-size:15px;letter-spacing:.28em;text-transform:uppercase;color:hsl(28 100% 55%);margin-bottom:22px">WE WRITE WORKFLOWS&trade;</div>
         <div style="font-size:74px;font-weight:600;line-height:1.02;letter-spacing:-.04em;max-width:16ch">Engineering AI Products <span class="accent">That Scale.</span></div>
       </div>
       <div style="font-family:ui-monospace,monospace;font-size:14px;letter-spacing:.2em;text-transform:uppercase;color:hsl(28 7% 58%)">AI Products &nbsp;&middot;&nbsp; SaaS Platforms &nbsp;&middot;&nbsp; AI Agents &nbsp;&middot;&nbsp; Full-Stack Engineering</div>
     </div>`,
    1200,
    630,
  ),
)
await og.waitForTimeout(2500)
await og.screenshot({ path: 'public/og.png' })
console.log('wrote public/og.png              1200x630')

await browser.close()
