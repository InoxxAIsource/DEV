import { Nav } from '@/components/Nav'
import { Hero } from '@/components/Hero'
import { StudioIntro } from '@/components/StudioIntro'
import { FeaturedWork } from '@/components/FeaturedWork'
import { Process } from '@/components/Process'
import { Testimonials } from '@/components/Testimonials'
import { Services } from '@/components/Services'
import { Faq } from '@/components/Faq'
import { Contact } from '@/components/Contact'
import { Footer } from '@/components/Footer'
import { Cursor } from '@/components/Cursor'

/*
  Scroll story:
    Hero -> Studio intro -> 14 project worlds -> Process -> Testimonials
    -> Services -> FAQ -> Contact

  Services and FAQ sit after the narrative rather than inside it: they carry
  the OfferCatalog and FAQPage structured data, so removing them from the page
  would drop that markup. They belong on dedicated /services and /faq routes
  next — better for the experience and better for ranking.
*/
export default function Home() {
  return (
    <>
      <div id="top-sentinel" className="absolute top-0 h-24 w-px" aria-hidden="true" />
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <StudioIntro />
        <FeaturedWork />
        <Process />
        <Testimonials />
        <Services />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
