import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import './globals.css'
import { SITE_URL, person } from '@/data/site'
import { jsonLdGraph } from '@/lib/schema'
import { SmoothScroll } from '@/components/SmoothScroll'

const title = `${person.name} | ${person.jobTitle}`

/*
  Next's Metadata API replaces the static tags the Vite build injected into
  index.html. metadataBase makes every relative OG/canonical URL absolute.
*/
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: title,
    template: `%s | ${person.name}`,
  },
  description: person.description,
  authors: [{ name: person.name, url: SITE_URL }],
  creator: person.name,
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
    siteName: person.name,
    title,
    description: person.description,
    url: '/',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description: person.description,
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
