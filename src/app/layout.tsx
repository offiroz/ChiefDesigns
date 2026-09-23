import type { Metadata } from 'next'
import { preloadedFonts } from '@/lib/fonts'
import { site } from '@/data/site'
import { Analytics } from '@/components/Analytics'
import '@/styles/fonts.css'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    'עיצוב גרפי',
    'מיתוג',
    'בניית אתרים',
    'אוטומציות',
    'כלי AI',
    'סטודיו עיצוב',
    'עמק יזרעאל',
  ],
  authors: [{ name: 'אופיר עוז' }],
  creator: 'Chief Designs',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: site.locale,
    url: site.url,
    siteName: site.name,
    title: site.title,
    description: site.description,
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Chief Designs — סטודיו לעיצוב ופיתוח דיגיטלי',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: site.title,
    description: site.description,
    images: ['/images/og-image.jpg'],
  },
  robots: { index: true, follow: true },
}

/*
 * Schema.org — LocalBusiness.
 * שלב 7. מוזרק כ-JSON-LD, לא כתגיות meta.
 */
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: site.name,
  description: site.description,
  url: site.url,
  telephone: site.contact.phoneIntl,
  email: site.contact.email,
  founder: { '@type': 'Person', name: 'אופיר עוז' },
  areaServed: { '@type': 'Country', name: 'ישראל' },
  address: {
    '@type': 'PostalAddress',
    addressRegion: site.business.address,
    addressCountry: 'IL',
  },
  knowsLanguage: ['he', 'en'],
  vatID: site.business.taxId,
  /* מקשר את פרופילי הסושיאל לעסק בגרף הידע של גוגל */
  sameAs: site.social.filter((s) => s.url).map((s) => s.url),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="he" dir="rtl">
      <head>
        {/*
          הפונטים מוגשים מהדומיין שלנו (ראו src/lib/fonts.ts).
          preload רק לשלושת קבצי העברית שנטענים בכל עמוד — בלעדיו
          הדפדפן מגלה אותם רק אחרי שהוא מפרסר את ה-CSS, וזה FOUT מיותר.
        */}
        {preloadedFonts.map((href) => (
          <link
            key={href}
            rel="preload"
            href={href}
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
        ))}
      </head>
      <body>
        {/* דילוג לתוכן — ראשון בסדר ה-Tab, מופיע רק בפוקוס */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:right-4 focus:z-[100]
                     focus:rounded-lg focus:bg-ink-fuchsia focus:px-5 focus:py-3
                     focus:text-white focus:font-semibold"
        >
          דילוג לתוכן הראשי
        </a>

        {children}

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <Analytics />
      </body>
    </html>
  )
}
