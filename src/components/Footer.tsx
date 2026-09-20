import Link from 'next/link'
import { site } from '@/data/site'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-white/10 bg-[#1D2F36] on-navy">
      <div className="container-content py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <p className="font-logo text-xl font-bold text-on-dark-fuchsia">
              Chief Designs
            </p>
            <p className="mt-3 text-sm text-on-dark-muted">{site.tagline}</p>

            {/*
              ערוץ מוצג רק אם יש לו כתובת — סעיף 21 ברשימת התיקונים.
              תוויות טקסט ולא אייקונים: הן נגישות מיידית לקורא מסך,
              ואין צורך לשחזר את הלוגואים של הפלטפורמות. אם תרצה
              אייקונים, כל פלטפורמה מפרסמת SVG רשמי בעמוד ה-brand
              resources שלה — להכניס ל-public/images/social/.
            */}
            {site.social.some((s) => s.url) && (
              <ul className="mt-6 flex flex-wrap gap-2">
                {site.social
                  .filter((s) => s.url)
                  .map((s) => (
                    <li key={s.label}>
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer me"
                        className="inline-flex min-h-[44px] items-center rounded-lg
                                   border border-white/20 px-4 py-2 text-sm font-medium
                                   text-on-dark-muted transition-colors
                                   hover:border-on-dark-fuchsia hover:text-white"
                      >
                        {s.label}
                      </a>
                    </li>
                  ))}
              </ul>
            )}
          </div>

          <nav aria-label="ניווט בתחתית העמוד">
            <h2 className="font-display text-sm font-semibold uppercase
                           tracking-widest text-on-dark-teal">
              ניווט
            </h2>
            <ul className="mt-4 space-y-2">
              {site.nav.map((i) => (
                <li key={i.href}>
                  <Link href={i.href} className="text-on-dark-muted hover:text-white">
                    {i.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/*
            פרטי עסק גלויים — דרישת שלב 6.
            נשארים כאן גם אחרי עלייה לאוויר.
          */}
          <div>
            <h2 className="font-display text-sm font-semibold uppercase
                           tracking-widest text-on-dark-teal">
              פרטי העסק
            </h2>
            <address className="mt-4 space-y-2 not-italic text-on-dark-muted">
              <p>{site.business.legalName}</p>
              {/* המספר מופיע רק כשמולא ב-site.ts — סעיף 2 ברשימת התיקונים */}
              <p>
                {site.business.taxId
                  ? `${site.business.type} מס׳ ${site.business.taxId}`
                  : site.business.type}
              </p>
              <p>{site.business.address}</p>
              <p>
                <a
                  href={`tel:${site.contact.phoneIntl}`}
                  className="underline underline-offset-4 hover:text-white"
                >
                  {site.contact.phone}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${site.contact.email}`}
                  className="underline underline-offset-4 hover:text-white"
                >
                  {site.contact.email}
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-8
                        text-sm text-on-dark-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Chief Designs. כל הזכויות שמורות.</p>
          <ul className="flex flex-wrap gap-6">
            {/* שלושת הקישורים האלה חייבים להיות חיים לפני עלייה לאוויר — שלב 6 */}
            <li>
              <Link href="/accessibility/" className="underline underline-offset-4 hover:text-white">
                הצהרת נגישות
              </Link>
            </li>
            <li>
              <Link href="/privacy/" className="underline underline-offset-4 hover:text-white">
                מדיניות פרטיות
              </Link>
            </li>
            <li>
              <Link href="/terms/" className="underline underline-offset-4 hover:text-white">
                תנאי שימוש
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
