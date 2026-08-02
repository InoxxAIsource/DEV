const tech = [
  ['react', 'React'],
  ['typescript', 'TypeScript'],
  ['nextdotjs', 'Next.js'],
  ['nodedotjs', 'Node.js'],
  ['solidity', 'Solidity'],
  ['flutter', 'Flutter'],
  ['ethereum', 'Ethereum'],
  ['tailwindcss', 'Tailwind CSS'],
  ['python', 'Python'],
  ['postgresql', 'PostgreSQL'],
] as const

function LogoRow() {
  return (
    <>
      {tech.map(([slug, name]) => (
        <img
          key={slug}
          src={`https://cdn.simpleicons.org/${slug}/white`}
          alt={name}
          title={name}
          loading="lazy"
          className="mx-8 h-7 w-auto shrink-0 opacity-45 transition-opacity hover:opacity-90 md:mx-10 md:h-8"
        />
      ))}
    </>
  )
}

export function TechStrip() {
  return (
    <section className="border-y border-line py-10">
      <p className="mb-8 text-center font-mono text-xs uppercase tracking-[0.2em] text-faint">
        Built with
      </p>
      <div className="relative overflow-hidden">
        <div className="marquee-track flex w-max items-center" aria-hidden="true">
          <LogoRow />
          <LogoRow />
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-bg to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-bg to-transparent" />
      </div>
    </section>
  )
}
