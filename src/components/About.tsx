import { Reveal } from '../lib/Reveal'

export function About() {
  return (
    <section id="about" className="border-t border-line">
      <div className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-32">
        <div className="grid gap-10 lg:grid-cols-[auto_1fr] lg:gap-20">
          <Reveal>
            <h2 className="text-4xl font-semibold tracking-tighter md:text-5xl">About</h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="max-w-2xl text-xl leading-relaxed text-ink/90 md:text-2xl">
              I am Mohd Tauheed, an independent engineer working directly with founders, startups
              and businesses. I take products from idea to production across web, mobile and
              blockchain. Everything I ship is built for security, scale and real-world use, not
              just the demo.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
