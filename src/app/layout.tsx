import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Script from 'next/script'
import './globals.css'
import { SITE_URL, org } from '@/data/site'
import { jsonLdGraph } from '@/lib/schema'
import { SmoothScroll } from '@/components/SmoothScroll'

const title = `${org.name} | ${org.kind}`

/* Google Analytics 4. Marketing site only — /aiagent is a separate application
   and is not measured here. */
const GA_MEASUREMENT_ID = 'G-TY1N2TKFP1'

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
    images: [
      {
        url: org.ogImage,
        width: 1200,
        height: 630,
        alt: `${org.name} — ${org.kind}. ${org.slogan}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description: org.description,
    images: [org.ogImage],
  },
  icons: { icon: '/logo.png', apple: '/logo.png' },
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
        {/* next/script rather than the raw tags Google supplies: the App Router
            streams the document, so a bare <script> in the markup has no
            ordering guarantee against hydration. afterInteractive loads the
            tag once the page is usable, so measurement never competes with
            first paint on pages carrying video. */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
        <SmoothScroll />
        {children}
      </body>
    </html>
  )
}
