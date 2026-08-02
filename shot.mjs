import { spawn, exec } from 'node:child_process'
import { chromium } from 'playwright'

const PORT = 5199
const URL = `http://localhost:${PORT}`

const server = spawn('npm', ['run', 'dev', '--', '--port', String(PORT), '--strictPort'], {
  stdio: 'ignore',
  shell: true,
})

function killServer() {
  if (process.platform === 'win32') {
    exec(`taskkill /pid ${server.pid} /T /F`)
  } else {
    server.kill()
  }
}

async function waitForServer(timeoutMs = 30_000) {
  const start = Date.now()
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(URL)
      if (res.ok) return
    } catch {
      /* not up yet */
    }
    await new Promise((r) => setTimeout(r, 250))
  }
  throw new Error(`Dev server did not respond on ${URL} within ${timeoutMs}ms`)
}

async function settle(page) {
  // let lazy content, fonts and scroll-triggered animations finish
  await page.waitForTimeout(1000)
}

try {
  await waitForServer()
  const browser = await chromium.launch()

  // --- Desktop 1440x900 ---
  const desktop = await browser.newPage({ viewport: { width: 1440, height: 900 } })
  await desktop.goto(URL, { waitUntil: 'networkidle' })
  await settle(desktop)
  await desktop.screenshot({ path: '_hero.png' })

  const maxScroll = await desktop.evaluate(
    () => document.documentElement.scrollHeight - window.innerHeight,
  )

  await desktop.evaluate((y) => window.scrollTo(0, y), Math.round(maxScroll * 0.35))
  await settle(desktop)
  await desktop.screenshot({ path: '_mid.png' })

  await desktop.evaluate((y) => window.scrollTo(0, y), maxScroll)
  await settle(desktop)
  await desktop.screenshot({ path: '_bottom.png' })
  await desktop.close()

  // --- Mobile 390x844 ---
  const mobile = await browser.newPage({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
    deviceScaleFactor: 2,
    userAgent:
      'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
  })
  await mobile.goto(URL, { waitUntil: 'networkidle' })
  await settle(mobile)
  await mobile.screenshot({ path: '_mobile.png' })
  await mobile.close()

  await browser.close()
  console.log('Saved: _hero.png, _mid.png, _bottom.png, _mobile.png')
} finally {
  killServer()
}
