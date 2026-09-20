/*
 * ── לא פעיל כרגע ──
 *
 * להפעלה, אם וכאשר עוברים מ-static export ל-server:
 *   1. להסיר מ-next.config.mjs את output:'export' ואת images.unoptimized
 *   2. להעביר את הקובץ הזה ל-src/app/api/contact/route.ts
 *   3. להוסיף ל-.env:  RECAPTCHA_SECRET, CONTACT_TO
 *   4. להריץ תחת PM2 מאחורי nginx, כמו הבוט
 *
 * רק במצב הזה צריך rate-limiting ו-reCAPTCHA — באתר סטטי אין endpoint
 * לתקוף, ולכן אין משטח ספאם.
 */

import { NextResponse } from 'next/server'

// rate-limit בזיכרון. מספיק לאתר תדמית של עסק אחד;
// אם יהיו כמה תהליכי PM2 — להחליף ל-Redis.
const hits = new Map<string, number[]>()
const WINDOW_MS = 60_000
const MAX_PER_WINDOW = 3

function rateLimited(ip: string) {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)
  recent.push(now)
  hits.set(ip, recent)
  return recent.length > MAX_PER_WINDOW
}

async function verifyRecaptcha(token: string) {
  const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      secret: process.env.RECAPTCHA_SECRET ?? '',
      response: token,
    }),
  })
  const data = (await res.json()) as { success: boolean; score?: number }
  return data.success && (data.score ?? 1) >= 0.5
}

export async function POST(req: Request) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown'
  if (rateLimited(ip)) {
    return NextResponse.json({ error: 'יותר מדי בקשות. נסו שוב בעוד דקה.' }, { status: 429 })
  }

  const body = await req.json().catch(() => null)
  if (!body) return NextResponse.json({ error: 'בקשה לא תקינה' }, { status: 400 })

  const { name, email, message, company, token } = body as Record<string, string>

  // honeypot
  if (company) return NextResponse.json({ ok: true })

  if (
    typeof name !== 'string' || name.trim().length < 2 ||
    typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    typeof message !== 'string' || message.trim().length < 10 ||
    message.length > 5000
  ) {
    return NextResponse.json({ error: 'שדות חסרים או לא תקינים' }, { status: 400 })
  }

  if (!(await verifyRecaptcha(token ?? ''))) {
    return NextResponse.json({ error: 'אימות נכשל' }, { status: 400 })
  }

  // TODO: שליחה בפועל — מייל, או הוספה לשיטס כמו הבוט
  console.log('[contact]', { name, email, message })

  return NextResponse.json({ ok: true })
}
