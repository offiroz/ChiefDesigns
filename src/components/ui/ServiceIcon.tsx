/*
 * ════════════════════════════════════════════════════════════════
 *  אייקוני השירותים
 *
 *  קו אחד, צבע אחד, נמשכים מ-currentColor — כך שהצבע נקבע ב-CSS
 *  ולא כאן, והאייקון יורש אותו גם ב-hover וגם על רקע כהה.
 *
 *  למה SVG ולא אמוג'י: אמוג'י נצבע בידי מערכת ההפעלה. אותו סעיף
 *  נראה אחרת בווינדוס, במק ובאנדרואיד, תמיד רב-צבעי, ותמיד קצת
 *  ילדותי לצד טיפוגרפיה רצינית. זה גם אומר שאין שליטה על המשקל
 *  של הקו מול הטקסט שלידו.
 *
 *  הגריד: 24×24, stroke 1.75, קצוות מעוגלים. אותו משקל קו כמו
 *  הטיפוגרפיה — לכן הם יושבים טוב ליד Rubik.
 *
 *  להוספת אייקון: מפתח חדש ב-PATHS, ואותו מפתח ב-services.ts.
 *  לצייר על גריד 24×24, בלי fill, בלי צבע קשיח.
 * ════════════════════════════════════════════════════════════════
 */

export type ServiceIconName =
  | 'shapes'
  | 'window'
  | 'bubbles'
  | 'flow'
  | 'chip'
  | 'target'

const PATHS: Record<ServiceIconName, React.ReactNode> = {
  /* עיצוב ומיתוג — ריבוע ועיגול חופפים, שפת הצורה הבסיסית */
  shapes: (
    <>
      <rect x="3" y="3" width="12" height="12" rx="2.5" />
      <circle cx="15.5" cy="15.5" r="5.5" />
    </>
  ),

  /* אתרים — חלון דפדפן */
  window: (
    <>
      <rect x="2.5" y="4" width="19" height="16" rx="2.5" />
      <path d="M2.5 9h19" />
      <path d="M6 6.5h.01M8.75 6.5h.01" />
    </>
  ),

  /* ניהול תוכן לרשתות — שתי בועות שיחה */
  bubbles: (
    <>
      <path d="M3 8.5a3 3 0 0 1 3-3h7a3 3 0 0 1 3 3v3a3 3 0 0 1-3 3H8l-4 3v-3a3 3 0 0 1-1-2.2z" />
      <path d="M16.5 9.5H18a3 3 0 0 1 3 3v2.7a3 3 0 0 1-1 2.2v2.6l-3-2.5" />
    </>
  ),

  /* אוטומציות ובוטים — צמתים מחוברים, זרימה שרצה לבד */
  flow: (
    <>
      <circle cx="5.5" cy="6" r="2.5" />
      <circle cx="18.5" cy="6" r="2.5" />
      <circle cx="12" cy="18" r="2.5" />
      <path d="M8 6h8" />
      <path d="M6.6 8.2 10.8 15.9" />
      <path d="M17.4 8.2 13.2 15.9" />
    </>
  ),

  /* כלי AI — שבב: ליבה מרובעת עם רגליים */
  chip: (
    <>
      <rect x="6.5" y="6.5" width="11" height="11" rx="2" />
      <rect x="10.25" y="10.25" width="3.5" height="3.5" rx="0.75" />
      <path d="M9.5 3v3.5M14.5 3v3.5M9.5 17.5V21M14.5 17.5V21" />
      <path d="M3 9.5h3.5M3 14.5h3.5M17.5 9.5H21M17.5 14.5H21" />
    </>
  ),

  /* אסטרטגיה — מטרה, כי אסטרטגיה היא בחירה של נקודה אחת */
  target: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="1" />
    </>
  ),
}

export function ServiceIcon({
  name,
  className = '',
}: {
  name: ServiceIconName
  className?: string
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="28"
      height="28"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      /* דקורטיבי — הכותרת שמתחת נושאת את המשמעות */
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {PATHS[name]}
    </svg>
  )
}
