import { Nav } from '@/components/Nav'
import { Hero } from '@/components/Hero'
import { TechStrip } from '@/components/TechStrip'
import { Stats } from '@/components/Stats'
import { Work } from '@/components/Work'
import { Services } from '@/components/Services'
import { SeoGeo } from '@/components/SeoGeo'
import { Principles } from '@/components/Principles'
import { Process } from '@/components/Process'
import { Positioning } from '@/components/Positioning'
import { Testimonials } from '@/components/Testimonials'
import { About } from '@/components/About'
import { Faq } from '@/components/Faq'
import { Contact } from '@/components/Contact'
import { Footer } from '@/components/Footer'

/*
  Server component. Interactive pieces below declare their own 'use client'
  boundary, but every section is still server-rendered to HTML first — which
  is what makes the content crawlable.
*/
export default function Home() {
  return (
    <>
      <div id="top-sentinel" className="absolute top-0 h-24 w-px" aria-hidden="true" />
      <Nav />
      <main>
        <Hero />
        <TechStrip />
        <Stats />
        <Work />
        <Services />
        <SeoGeo />
        <Principles />
        <Process />
        <Positioning />
        <Testimonials />
        <About />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
