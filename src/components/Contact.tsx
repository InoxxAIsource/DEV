'use client'

import { useState, type FormEvent } from 'react'
import { Mail } from 'lucide-react'
import { Reveal } from '../lib/Reveal'
import { BrandIcon, socials } from './socials'
import { org } from '../data/site'

/* Same address the Organization schema publishes as mailto:. This is the
   *displayed* address (footer link, "email us directly") — the form below
   submits to /api/contact, which delivers to CONTACT_TO on the server and can
   be a different inbox (contact@wwwdot.dev) than what is shown here. */
const EMAIL = org.email

const inputCls =
  'w-full rounded-lg border border-line bg-bg px-4 py-3 text-sm text-ink placeholder:text-faint outline-none transition-colors focus:border-accent/60 focus:ring-2 focus:ring-accent/20'

type Status = 'idle' | 'sending' | 'sent' | 'error'

export function Contact() {
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<Status>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const name = String(data.get('name') || '').trim()
    const email = String(data.get('email') || '').trim()
    const type = String(data.get('type') || '')
    const message = String(data.get('message') || '').trim()
    /* Honeypot: real visitors never see or fill this field (see input below). */
    const company = String(data.get('company') || '')

    const errs: Record<string, string> = {}
    if (!name) errs.name = 'Please add your name.'
    if (!/^\S+@\S+\.\S+$/.test(email)) errs.email = 'Please use a valid email.'
    if (!message) errs.message = 'A sentence or two about the project helps.'
    setErrors(errs)
    if (Object.keys(errs).length) return

    setStatus('sending')
    setErrorMessage('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, type, message, company }),
      })
      const json = await res.json().catch(() => ({}))

      if (!res.ok) {
        if (json.errors) {
          setErrors(json.errors)
          setStatus('idle')
        } else {
          setStatus('error')
          setErrorMessage(json.error || 'Something went wrong. Please try again.')
        }
        return
      }

      setStatus('sent')
      form.reset()
    } catch {
      setStatus('error')
      setErrorMessage('Could not reach the server. Please try again or email us directly.')
    }
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
              Tell us what you are trying to ship. We reply within one business day, usually with
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
              {/* Honeypot — hidden from sighted users and never announced to a
                  screen reader. A human never fills it; a bot filling every
                  field on the form fills it too. */}
              <div aria-hidden="true" className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden">
                <label htmlFor="company">Company</label>
                <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
              </div>

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
                disabled={status === 'sending'}
                className="mt-7 w-full rounded-full bg-accent py-3.5 font-semibold text-bg transition-transform hover:brightness-110 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === 'sending' ? 'Sending…' : 'Send message'}
              </button>

              {status === 'sent' && (
                <p className="mt-4 text-center text-sm text-accent" role="status">
                  Message sent. We reply within one business day.
                </p>
              )}
              {status === 'error' && (
                <p className="mt-4 text-center text-sm text-accent" role="alert">
                  {errorMessage || 'Something went wrong. Please try again.'}
                </p>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
