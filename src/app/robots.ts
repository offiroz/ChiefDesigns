import type { MetadataRoute } from 'next'
import { site } from '@/data/site'

export const dynamic = 'force-static'

/*
 * ב-staging צריך לחסום אינדוקס. הדרך: להגדיר
 * NEXT_PUBLIC_SITE_ENV=staging בסביבת ה-build של הסאב-דומיין.
 */
export default function robots(): MetadataRoute.Robots {
  const isStaging = process.env.NEXT_PUBLIC_SITE_ENV === 'staging'

  return {
    rules: isStaging
      ? { userAgent: '*', disallow: '/' }
      : { userAgent: '*', allow: '/' },
    sitemap: `${site.url}/sitemap.xml`,
  }
}
