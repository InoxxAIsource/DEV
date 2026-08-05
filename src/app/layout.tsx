import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import './globals.css'
import { SITE_URL, org } from '@/data/site'
import { jsonLdGraph } from '@/lib/schema'
import { SmoothScroll } from '@/components/SmoothScroll'

const title = `${org.name} | ${org.kind}`

/*
  Next's Metadata API replaces the static tags the Vite build injected into
  index.html. metadataBase makes every relative OG/canonical URL absolute.
*/
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: title,
    template: `%s | ${org.name}`,
  },
  description: org.description,
  authors: [{ name: org.name, url: SITE_URL }],
  creator: org.name,
  publisher: org.name,
  alternates: { canonical: '/' },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    siteName: org.name,
    title,
    description: org.description,
    url: '/',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description: org.description,
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600,700&display=swap"
          rel="stylesheet"
        />
        {/* Static JSON-LD: server-rendered, so crawlers and LLM fetchers read it
            without executing JavaScript. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGraph) }}
        />
      </head>
      <body>
        <SmoothScroll />
        {children}
      </body>
    </html>
  )
}
