import Script from 'next/script'
import { site } from '@/data/site'

/*
 * מעקב — הועבר מהאתר הישן.
 *
 * שני הכלים נטענים רק אם המזהה שלהם מלא ב-site.ts, כך שסביבת
 * הפיתוח והסטייג'ינג נשארות נקיות אם משאירים אותם ריקים.
 *
 * afterInteractive = נטען אחרי שהדף אינטראקטיבי, ולא חוסם רינדור.
 * זה משאיר את יעד ה-Lighthouse של שלב 7 בר-השגה.
 *
 * ⚠ שניהם מוזכרים במפורש במדיניות הפרטיות. אם מסירים אחד מהם —
 *   להסיר גם את הסעיף שם.
 *
 * ⚠ רצים בפרודקשן בלבד. בלי התנאי הזה כל פריסה לסטייג'ינג וכל
 *   בדיקה מקומית היו נרשמות כ-page_view ב-Google Ads, ומזהמות את
 *   נתוני הקמפיינים בתנועה שלך עצמך. NEXT_PUBLIC_SITE_ENV נקבע
 *   ב-Action: 'production' רק בדחיפה ל-main.
 */
export function Analytics() {
  if (process.env.NEXT_PUBLIC_SITE_ENV !== 'production') return null

  const { googleAds, clarity } = site.analytics

  return (
    <>
      {googleAds && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${googleAds}`}
            strategy="afterInteractive"
          />
          <Script id="gtag-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${googleAds}');
            `}
          </Script>
        </>
      )}

      {clarity && (
        <Script id="clarity-init" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${clarity}");
          `}
        </Script>
      )}
    </>
  )
}
