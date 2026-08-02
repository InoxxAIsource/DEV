import { Reveal } from '../lib/Reveal'

export function Positioning() {
  return (
    <section className="border-y border-line bg-surface">
      <div className="mx-auto max-w-[1400px] px-5 py-28 md:px-10 md:py-40">
        <Reveal>
          <p className="mx-auto max-w-4xl text-center text-4xl font-semibold leading-[1.12] tracking-tighter md:text-6xl">
            React + motion landing pages that{' '}
            <span className="text-accent">out-convert</span> a generic developer.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
