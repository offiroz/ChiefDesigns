'use client'

import { useState } from 'react'
import { site } from '@/data/site'

/*
 * באתר סטטי אין צד שרת, ולכן הטופס לא "נשלח" — הוא מרכיב הודעה
 * ופותח אותה בוואטסאפ או במייל. שני יתרונות: אפס תשתית לתחזק,
 * ואפס משטח ספאם (אין endpoint לתקוף, ולכן גם אין צורך ב-reCAPTCHA).
 *
 * אם בהמשך תעבור ל-server (ראה next.config.mjs), מעבירים את
 * optional/contact-route.ts ל-src/app/api/contact/route.ts ומחליפים
 * את buildWhatsAppUrl ב-fetch. אז — וגם רק אז — צריך rate-limiting
 * ו-reCAPTCHA, לפי שלב 5.
 */

type Form = { name: string; email: string; message: string; company: string }

const empty: Form = { name: '', email: '', message: '', company: '' }

export function Contact() {
  const [form, setForm] = useState<Form>(empty)
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({})

  const set = (k: keyof Form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }))

  function validate(f: Form) {
    const next: Partial<Record<keyof Form, string>> = {}
    if (f.name.trim().length < 2) next.name = 'נא להזין שם'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) next.email = 'נא להזין כתובת מייל תקינה'
    if (f.message.trim().length < 10) next.message = 'נא לכתוב לפחות 10 תווים'
    return next
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()

    // honeypot — בוטים ממלאים שדות נסתרים, בני אדם לא
    if (form.company) return

    const found = validate(form)
    setErrors(found)
    if (Object.keys(found).length > 0) {
      const first = document.getElementById(Object.keys(found)[0])
      first?.focus()
      return
    }

    const text = `שלום, הגעתי מהאתר.\n\nשם: ${form.name}\nמייל: ${form.email}\n\n${form.message}`
    window.open(
      `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(text)}`,
      '_blank',
      'noopener,noreferrer'
    )
  }

  const field =
    'mt-2 w-full rounded-xl border border-border bg-white px-4 py-3 text-ink-navy ' +
    'placeholder:text-ink-muted/60 min-h-[44px]'

  return (
    <section id="contact" className="section bg-surface-navy on-navy">
      <div className="container-content grid gap-12 lg:grid-cols-2">
        <div>
          <p className="mb-3 font-display text-sm font-semibold uppercase
                        tracking-widest text-on-dark-teal">
            נעים להכיר
          </p>
          <h2 className="text-3xl font-display font-bold text-white sm:text-4xl">
            צור קשר
          </h2>
          <p className="mt-4 text-lg text-on-dark-muted">
            מוזמנים לכתוב, להתקשר או פשוט לשלוח הודעה בוואטסאפ. עונים מהר.
          </p>

          <dl className="mt-10 space-y-4">
            <div>
              <dt className="text-sm text-on-dark-muted">טלפון</dt>
              <dd>
                <a
                  href={`tel:${site.contact.phoneIntl}`}
                  className="text-lg font-semibold text-on-dark-fuchsia underline underline-offset-4"
                >
                  {site.contact.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-sm text-on-dark-muted">מייל</dt>
              <dd>
                <a
                  href={`mailto:${site.contact.email}`}
                  className="text-lg font-semibold text-on-dark-fuchsia underline underline-offset-4"
                >
                  {site.contact.email}
                </a>
              </dd>
            </div>
          </dl>
        </div>

        <form onSubmit={onSubmit} noValidate className="rounded-3xl bg-white p-8">
          <div>
            <label htmlFor="name" className="font-display font-semibold text-ink-navy">
              שם <span aria-hidden="true" className="text-ink-fuchsia">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              autoComplete="name"
              value={form.name}
              onChange={set('name')}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'name-error' : undefined}
              className={field}
            />
            {errors.name && (
              <p id="name-error" role="alert" className="mt-2 text-sm font-medium text-ink-fuchsia">
                {errors.name}
              </p>
            )}
          </div>

          <div className="mt-5">
            <label htmlFor="email" className="font-display font-semibold text-ink-navy">
              מייל <span aria-hidden="true" className="text-ink-fuchsia">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              dir="ltr"
              value={form.email}
              onChange={set('email')}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
              className={`${field} text-start`}
            />
            {errors.email && (
              <p id="email-error" role="alert" className="mt-2 text-sm font-medium text-ink-fuchsia">
                {errors.email}
              </p>
            )}
          </div>

          <div className="mt-5">
            <label htmlFor="message" className="font-display font-semibold text-ink-navy">
              במה אפשר לעזור? <span aria-hidden="true" className="text-ink-fuchsia">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              value={form.message}
              onChange={set('message')}
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? 'message-error' : undefined}
              className={field}
            />
            {errors.message && (
              <p id="message-error" role="alert" className="mt-2 text-sm font-medium text-ink-fuchsia">
                {errors.message}
              </p>
            )}
          </div>

          {/* honeypot — מוסתר מהעין ומקוראי מסך, נגיש לבוטים */}
          <div aria-hidden="true" className="absolute h-0 w-0 overflow-hidden">
            <label htmlFor="company">אל תמלאו שדה זה</label>
            <input
              id="company"
              name="company"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={form.company}
              onChange={set('company')}
            />
          </div>

          <button
            type="submit"
            className="mt-7 inline-flex min-h-[44px] w-full items-center justify-center
                       rounded-xl bg-ink-fuchsia px-7 py-3.5 font-display text-lg
                       font-semibold text-white transition-colors hover:bg-[#8F2241]"
          >
            שליחה בוואטסאפ
          </button>

          <p className="mt-4 text-center text-sm text-ink-muted">
            הכפתור פותח את וואטסאפ עם ההודעה מוכנה — אפשר לערוך לפני השליחה.
          </p>
        </form>
      </div>
    </section>
  )
}
