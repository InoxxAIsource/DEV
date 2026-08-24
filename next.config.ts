import type { NextConfig } from 'next'

/* Origin of the Agent Factory zone.

   A separate application, in its own repository, on its own Vercel project,
   against its own Supabase project. Nothing is shared with this codebase — not
   a schema, not a secret, not a session. The only connection between the two is
   the rewrite below. */
const AIAGENT_ORIGIN = process.env.AIAGENT_ORIGIN || 'https://agent-force-xi.vercel.app'

const nextConfig: NextConfig = {
  /* Mount the Agent Factory at /aiagent.

     The Factory sets basePath: '/aiagent' on its side, so its routes, its
     /_next assets and its API routes all already live under that prefix. That
     is what lets one rule forward the entire zone instead of a rule per asset
     path — and it is why the destination repeats /aiagent rather than
     stripping it.

     Rewrites proxy rather than redirect, so the URL the visitor sees stays on
     wwwdot.dev and no existing route changes shape. Nothing here matches any
     path this site already serves: every WWWDOT route is /, /services/* or
     /work/*, and /aiagent intersects none of them. */
  async rewrites() {
    return [
      { source: '/aiagent', destination: `${AIAGENT_ORIGIN}/aiagent` },
      { source: '/aiagent/:path*', destination: `${AIAGENT_ORIGIN}/aiagent/:path*` },
    ]
  },

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
