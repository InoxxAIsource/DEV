import { NextResponse } from 'next/server'
import { Resend } from 'resend'

/*
  Server-side delivery for the contact form.

  The form previously built a mailto: link and redirected the browser to it —
  no message ever reached the server, and delivery depended entirely on the
  visitor having a default mail client configured. This route replaces that
  with a real send: Resend, from a wwwdot.dev address, to the studio inbox.

  CONTACT_TO defaults to contact@wwwdot.dev rather than reading org.email from
  data/site.ts on purpose — that constant is the *publicly displayed* address
  (shown in the footer, in mailto: links, in the Organization schema) and can
  differ from where form submissions should land. Two separate concerns kept
  separate; set CONTACT_TO explicitly if they should diverge further.
*/
/*
  Constructed lazily, inside the handler. Resend's constructor throws
  synchronously when no key is passed, and Next evaluates route modules at
  build time to collect page data — an eager `new Resend(...)` at module scope
  fails the production build itself on any machine without RESEND_API_KEY set,
  which is every machine except the deployed one.
*/
let resend: Resend | null = null
function client(): Resend {
  if (!resend) resend = new Resend(process.env.RESEND_API_KEY)
  return resend
}

const FROM = process.env.CONTACT_FROM || 'wwwdot.dev <contact@wwwdot.dev>'
const TO = process.env.CONTACT_TO || 'contact@wwwdot.dev'

const EMAIL_RE = /^\S+@\S+\.\S+$/

/* Cheap spam trap: a real visitor never fills this in, since it is hidden
   from sighted users by CSS and never announced to a screen reader. A bot
   filling every field on the form fills it too. No external dependency, no
   scoring — just silently accept and drop. */
function isHoneypot(value: unknown) {
  return typeof value === 'string' && value.trim().length > 0
}

export async function POST(req: Request) {
  if (!process.env.RESEND_API_KEY) {
    console.error('[contact] RESEND_API_KEY is not set — message not sent')
    return NextResponse.json(
      { error: 'Email delivery is not configured yet.' },
      { status: 500 },
    )
  }

  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  const name = String(body.name ?? '').trim().slice(0, 200)
  const email = String(body.email ?? '').trim().slice(0, 200)
  const type = String(body.type ?? '').trim().slice(0, 100)
  const message = String(body.message ?? '').trim().slice(0, 5000)

  if (isHoneypot(body.company)) {
    return NextResponse.json({ ok: true })
  }

  const errors: Record<string, string> = {}
  if (!name) errors.name = 'Please add your name.'
  if (!EMAIL_RE.test(email)) errors.email = 'Please use a valid email.'
  if (!message) errors.message = 'A sentence or two about the project helps.'
  if (Object.keys(errors).length) {
    return NextResponse.json({ errors }, { status: 400 })
  }

  try {
    const { error } = await client().emails.send({
      from: FROM,
      to: TO,
      /* Replying to the notification goes straight to the visitor, not back
         through the studio's own sending address. */
      replyTo: email,
      subject: `Project inquiry: ${type || 'General'} — ${name}`,
      text: `${message}\n\n—\nFrom: ${name} <${email}>\nProject type: ${type || 'Not specified'}`,
    })

    if (error) {
      console.error('[contact] Resend rejected the send:', error)
      return NextResponse.json({ error: 'Could not send your message. Please try again.' }, { status: 502 })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[contact] Send failed:', err)
    return NextResponse.json({ error: 'Could not send your message. Please try again.' }, { status: 500 })
  }
}
