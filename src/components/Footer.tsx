import { BrandIcon, socials } from './socials'
import { Wordmark } from './Wordmark'

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-[1400px] px-5 py-14 md:px-10">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <Wordmark className="text-[22px] text-ink" />
            <p className="mt-4 max-w-xs text-sm text-muted">
              AI engineering studio. AI products, SaaS platforms and automation systems, built
              to production standard.
            </p>
          </div>

          <nav className="flex gap-12 text-sm">
            <div className="grid gap-3">
              <a href="#work" className="text-muted transition-colors hover:text-ink">
                Work
              </a>
              <a href="#services" className="text-muted transition-colors hover:text-ink">
                Services
              </a>
            </div>
            <div className="grid gap-3">
              <a href="#about" className="text-muted transition-colors hover:text-ink">
                About
              </a>
              <a href="#contact" className="text-muted transition-colors hover:text-ink">
                Contact
              </a>
            </div>
          </nav>

          <div className="flex items-center gap-3">
            {socials.map((s) => (
              <a
                key={s.slug}
                href={s.href}
                aria-label={s.label}
                className="grid size-9 place-items-center rounded-full border border-line transition-colors hover:border-accent/50"
              >
                <BrandIcon slug={s.slug} size={14} />
              </a>
            ))}
          </div>
        </div>

        <p className="mt-12 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-line pt-6 font-mono text-xs text-faint">
          <span>© 2026 wwwdot.dev</span>
          <span aria-hidden="true" className="text-line">•</span>
          <span>WE WRITE WORKFLOWS™</span>
        </p>
      </div>
    </footer>
  )
}
