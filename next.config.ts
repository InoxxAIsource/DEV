import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* Long-lived immutable caching for the work recordings — they never change
     once published, and they are by far the heaviest thing this site serves. */
  async headers() {
    return [
      {
        source: '/work/:path*.mp4',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        source: '/hero.mp4',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
    ]
  },
}

export default nextConfig
