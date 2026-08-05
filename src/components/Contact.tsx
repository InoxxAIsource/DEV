'use client'

import { useState, type FormEvent } from 'react'
import { Mail } from 'lucide-react'
import { Reveal } from '../lib/Reveal'
import { BrandIcon, socials } from './socials'
import { person } from '../data/site'

/* Same address the Person schema publishes as mailto: */
const EMAIL = person.email

const inputCls =
  'w-full rounded-lg border border-line bg-bg px-4 py-3 text-sm text-ink placeholder:text-faint outline-none transition-colors focus:border-accent/60 focus:ring-2 focus:ring-accent/20'

export function Contact() {
  const [errors, setErrors] = useState<Record<string, string>>({})

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const name = String(data.get('name') || '').trim()
    const email = String(data.get('email') || '').trim()
    const type = String(data.get('type') || '')
    const message = String(data.get('message') || '').trim()

    const errs: Record<string, string> = {}
    if (!name) errs.name = 'Please add your name.'
    if (!/^\S+@\S+\.\S+$/.test(email)) errs.email = 'Please use a valid email.'
    if (!message) errs.message = 'A sentence or two about the project helps.'
    setErrors(errs)
    if (Object.keys(errs).length) return

    const subject = encodeURIComponent(`Project inquiry: ${type}`)
    const body = encodeURIComponent(`${message}\n\nFrom: ${name} (${email})`)
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`
  }

  return (
    <section id="contact" className="border-t border-line bg-surface">
      <div className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-32">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <h2 className="text-5xl font-semibold tracking-tighter md:text-6xl">
              Let&apos;s build <span className="text-accent">something.</span>
            </h2>
            <p className="mt-5 max-w-md text-muted">
              Tell me what you are trying to ship. I reply within one business day, usually with
              questions and a rough scope.
            </p>

            <div className="mt-10 space-y-4">
              <a
                href={`mailto:${EMAIL}`}
                className="flex w-fit items-center gap-3 text-ink transition-colors hover:text-accent"
              >
                <Mail size={18} strokeWidth={1.75} className="text-accent" />
                <span className="font-mono text-sm">{EMAIL}</span>
              </a>
              <div className="flex items-center gap-3 pt-2">
                {socials.map((s) => (
                  <a
                    key={s.slug}
                    href={s.href}
                    aria-label={s.label}
                    className="grid size-10 place-items-center rounded-full border border-line transition-colors hover:border-accent/50"
                  >
                    <BrandIcon slug={s.slug} size={16} />
                  </a>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <form onSubmit={onSubmit} noValidate className="rounded-2xl border border-line bg-bg p-7 md:p-9">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="grid gap-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Name
                  </label>
                  <input id="name" name="name" placeholder="Your name" className={inputCls} />
                  {errors.name && <p className="text-xs text-accent">{errors.name}</p>}
                </div>
                <div className="grid gap-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@company.com"
                    className={inputCls}
                  />
                  {errors.email && <p className="text-xs text-accent">{errors.email}</p>}
                </div>
              </div>

              <div className="mt-5 grid gap-2">
                <label htmlFor="type" className="text-sm font-medium">
                  Project type
                </label>
                <select id="type" name="type" className={inputCls} defaultValue="Web app / SaaS">
                  <option>Web app / SaaS</option>
                  <option>Landing page</option>
                  <option>Mobile app (Flutter)</option>
                  <option>Smart contracts</option>
                  <option>DeFi protocol</option>
                  <option>Something else</option>
                </select>
              </div>

              <div className="mt-5 grid gap-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="What are you building, and when do you want it live?"
                  className={`${inputCls} resize-none`}
                />
                {errors.message && <p className="text-xs text-accent">{errors.message}</p>}
              </div>

              <button
                type="submit"
                className="mt-7 w-full rounded-full bg-accent py-3.5 font-semibold text-bg transition-transform hover:brightness-110 active:scale-[0.99]"
              >
                Send message
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
