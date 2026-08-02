/*
  The three featured experiences.

  Each carries its own palette. FeaturedWork drives a fixed backdrop layer that
  interpolates between `theme.bg` values as you scroll, so moving from one
  project to the next reads as entering a different product rather than
  scrolling a list. `ink`/`muted`/`line`/`accent` are applied as CSS custom
  properties on the section, so type and rules re-tune per world.

  AUREN is deliberately light — the real product is an ivory editorial, and the
  contrast against the dark shell is the point.
*/

export type Theme = {
  bg: string
  ink: string
  muted: string
  line: string
  accent: string
  onAccent: string
  /* Nav inverts over light worlds so it stays legible. */
  light?: boolean
}

export type Featured = {
  slug: string
  index: string
  name: string
  tagline: string
  story: string
  role: string
  industry: string
  year: string
  tech: string[]
  media: string
  poster: string
  href?: string
  theme: Theme
}

export const featured: Featured[] = [
  {
    slug: 'factoryos',
    index: '01',
    name: 'FactoryOS',
    tagline: 'Autonomous manufacturing, one control plane.',
    story:
      'Robotic assembly, computer vision and predictive maintenance coordinated from a single operational view. Every station on the floor reports live, so the people running the line see the same truth the machines do.',
    role: 'Design & Full-Stack Engineering',
    industry: 'Industrial Automation',
    year: '2026',
    tech: ['Next.js', 'IoT', 'Python', 'WebSocket'],
    media: '/work/factory-os.mp4',
    poster: '/posters/factory-os.jpg',
    theme: {
      bg: 'hsl(213 44% 7%)',
      ink: 'hsl(210 30% 96%)',
      muted: 'hsl(211 18% 64%)',
      line: 'hsl(211 30% 18%)',
      accent: 'hsl(203 92% 62%)',
      onAccent: 'hsl(213 44% 7%)',
    },
  },
  {
    slug: 'auren',
    index: '02',
    name: 'AUREN',
    tagline: "Luxury isn't loud. It's remembered.",
    story:
      'A fashion house presented as an editorial, not a storefront. Campaign films, seasonal lookbooks and craft stories carry the weight, with restraint doing the selling — the quietest surface in the portfolio and the most deliberate.',
    role: 'Art Direction & Frontend',
    industry: 'Luxury Fashion',
    year: '2026',
    tech: ['Next.js', 'GSAP', 'Sanity'],
    media: '/work/auren.mp4',
    poster: '/posters/auren.jpg',
    theme: {
      bg: 'hsl(38 26% 91%)',
      ink: 'hsl(28 16% 11%)',
      muted: 'hsl(30 10% 38%)',
      line: 'hsl(34 18% 80%)',
      accent: 'hsl(24 48% 38%)',
      onAccent: 'hsl(38 26% 95%)',
      light: true,
    },
  },
  {
    slug: 'quantos',
    index: '03',
    name: 'QuantOS',
    tagline: 'Trade smarter. Powered by AI.',
    story:
      'Institutional-grade quant research in the browser. Strategies are composed visually, validated against a decade of tick history, and read by an AI engine that works the tape like a desk analyst before a dollar is at risk.',
    role: 'Product Design & Full-Stack',
    industry: 'Quantitative Finance',
    year: '2026',
    tech: ['React', 'WebSocket', 'Python', 'AI'],
    media: '/work/quantos.mp4',
    poster: '/posters/quantos.jpg',
    theme: {
      bg: 'hsl(222 47% 6%)',
      ink: 'hsl(210 32% 96%)',
      muted: 'hsl(215 18% 62%)',
      line: 'hsl(219 34% 17%)',
      accent: 'hsl(158 64% 52%)',
      onAccent: 'hsl(222 47% 6%)',
    },
  },
]

/* The shell either side of the featured run — hero, studio intro, archive. */
export const shellTheme: Theme = {
  bg: 'hsl(20 10% 5%)',
  ink: 'hsl(32 24% 93%)',
  muted: 'hsl(28 7% 58%)',
  line: 'hsl(24 9% 15%)',
  accent: 'hsl(28 100% 55%)',
  onAccent: 'hsl(20 10% 5%)',
}
