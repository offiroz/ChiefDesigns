export type ProjectKind = 'client' | 'demo'

export type Project = {
  id: string
  title: string
  /** שם הלקוח. null = דמו אישי או לקוח שלא אישר שם */
  client: string | null
  /** 'client' = לקוח אמיתי, 'demo' = דמו אישי/AI. מוצג כתגית על הכרטיס. */
  kind: ProjectKind
  tags: string[]
  summary: string
  /** נתיב תחת public/ (WebP). null = מציג placeholder */
  image: string | null
  /** alt תיאורי — לא "תמונת פרויקט" */
  imageAlt: string
  href: string | null
  featured: boolean
  /** true = מותר להציג פומבית. ראו הערת האישורים למטה. */
  approved: boolean
}

/*
 * ════════════════════════════════════════════════════════════════
 *  התמונות
 *
 *  14 מהתמונות הן אותן תמונות שהאתר הישן הגיש, מחשבון ה-Cloudinary
 *  של הסטודיו. הן *לא* יושבות בריפו — הן נמשכות בזמן הבנייה:
 *  `scripts/fetch-project-images.mjs` רץ ב-GitHub Actions לפני
 *  `npm run build`, מוריד אותן כ-WebP ל-public/images/projects/,
 *  והן נפרסות כחלק מהאתר.
 *
 *  למה ככה ולא קישור ישיר ל-Cloudinary: ככה האתר מגיש הכול מהדומיין
 *  של עצמו. אין דומיין שלישי ב-CSP, אין DNS נוסף לכל ביקור, ואם
 *  חשבון ה-Cloudinary ייעלם יום אחד — התמונות כבר אצלנו.
 *
 *  לבנייה מקומית: `node scripts/fetch-project-images.mjs` פעם אחת.
 *  הסקריפט מדלג על קבצים שכבר קיימים, אז אפשר להריץ אותו שוב בלי חשש.
 * ════════════════════════════════════════════════════════════════
 */

/*
 * ════════════════════════════════════════════════════════════════
 *  אישורי לקוחות — סעיף 4 ברשימת התיקונים
 *
 *  approved: true ניתן כאן רק לשני מקרים:
 *    1. פרויקט שכבר היה מוצג באתר הישן הפומבי (5 פרויקטי לקוח).
 *    2. פרויקט של הסטודיו עצמו — אין למי לבקש אישור.
 *
 *  פרויקט לקוח שלא היה באתר הישן נשאר false עד אישור בכתב.
 * ════════════════════════════════════════════════════════════════
 */
export const projects: Project[] = [
  /* ── בולטים ─────────────────────────────────────────────── */
  {
    id: '4dawn',
    title: '4Dawn',
    client: null,
    kind: 'demo',
    tags: ['מיתוג', 'אתרים'],
    summary:
      'קונספט אישי בעיצוב מקצה לקצה: זהות מותג, אתר, אפליקציה ומערכת עיצוב מלאה.',
    image: null, // TODO: סקרינשוט מהוויירפריימים
    imageAlt: 'מסכי האפליקציה ומערכת העיצוב של 4Dawn',
    href: null,
    featured: true,
    approved: true,
  },
  {
    id: 'kfar-tikva-names',
    title: 'כלי החלפת שמות',
    client: 'כפר תקווה',
    kind: 'client',
    tags: ['כלי AI'],
    summary:
      'כלי להסרת שמות ופרטים מזהים ממסמכים, עם עיבוד מקומי בלבד — שום נתון לא עוזב את המחשב. תמיכה רב-לשונית.',
    image: '/images/projects/kfar-tikva-names.webp',
    imageAlt: 'ממשק כלי החלפת השמות של כפר תקווה',
    href: null,
    featured: true,
    approved: true, // היה מוצג באתר הישן
  },
  {
    id: 'carmel-magazine',
    title: 'מגזין חודשי אינטראקטיבי',
    client: 'כרמל',
    kind: 'client',
    tags: ['עיצוב גרפי'],
    summary:
      'מגזין דיגיטלי חודשי מותאם לקוראים עם צרכים מיוחדים — ניווט פשוט, ניגודיות גבוהה וטיפוגרפיה קריאה.',
    image: '/images/projects/carmel-magazine.webp',
    imageAlt: 'עמוד מתוך המגזין החודשי האינטראקטיבי',
    href: null,
    featured: true,
    approved: true, // היה מוצג באתר הישן
  },

  /* ── לקוחות ─────────────────────────────────────────────── */
  {
    id: 'alkaa-branding',
    title: 'מיתוג וזהות ויזואלית',
    client: 'אלקה כהן',
    kind: 'client',
    tags: ['מיתוג', 'עיצוב גרפי'],
    summary:
      'זהות ויזואלית מלאה למאמנת עסקית־רוחנית: לוגו, פלטת צבעים, טיפוגרפיה ושפה חזותית לרשתות.',
    image: '/images/projects/alkaa-branding.webp',
    imageAlt: 'הלוגו והשפה הוויזואלית של אלקה',
    href: null,
    featured: false,
    approved: true, // היה מוצג באתר הישן
  },
  {
    id: 'alkaa-social',
    title: 'ניהול תוכן לאינסטגרם',
    client: 'אלקה כהן',
    kind: 'client',
    tags: ['סושיאל', 'עיצוב גרפי'],
    summary:
      'לוח תוכן חודשי ועיצוב פוסטים בשפת המותג — מהקונספט ועד הפרסום.',
    image: '/images/projects/alkaa-social.webp',
    imageAlt: 'סדרת פוסטים מעוצבים לאינסטגרם של אלקה',
    href: null,
    featured: false,
    approved: true, // היה מוצג באתר הישן
  },
  {
    id: 'cozze-recipe-book',
    title: 'ספר מתכונים לפיצה נפוליטנית',
    client: 'COZZE',
    kind: 'client',
    tags: ['עיצוב גרפי'],
    summary:
      'ספר מתכונים מעוצב לטאבון הפיצה של COZZE — עימוד, צילום ואיורים.',
    image: '/images/projects/cozze-recipe-book.webp',
    imageAlt: 'עמודים מתוך ספר המתכונים של COZZE',
    href: null,
    featured: false,
    approved: true, // היה מוצג באתר הישן
  },
  {
    id: 'alumot-beomer',
    title: 'אתר עמותת אלומות בעומר',
    client: 'עמותת אלומות בעומר',
    kind: 'client',
    tags: ['אתרים'],
    summary: 'אתר תדמית לעמותה.',
    image: null,
    imageAlt: 'עמוד הבית של אתר עמותת אלומות בעומר',
    href: null,
    featured: false,
    approved: false, // ⚠ לא היה באתר הישן — צריך אישור מהעמותה
  },

  /* ── מוצרים של הסטודיו ──────────────────────────────────── */
  {
    id: 'chief-bot',
    title: 'Chief Bot — בוט וואטסאפ עסקי',
    client: null,
    kind: 'demo',
    tags: ['אוטומציות'],
    summary:
      'בוט וואטסאפ עסקי חי, מחובר ישירות ל-Meta WhatsApp Business API. מוצר של הסטודיו, רץ בפרודקשן.',
    image: '/images/projects/chief-bot.webp',
    imageAlt: 'מסך שיחה של בוט הוואטסאפ העסקי',
    href: null,
    featured: false,
    approved: true,
  },

  /* ── דמו אישי וקונספטים ─────────────────────────────────── */
  {
    id: 'chef-julie',
    title: "שף ג'ולי — מתכונים עם AI",
    client: null,
    kind: 'demo',
    tags: ['כלי AI', 'אתרים'],
    summary:
      'אפליקציית ווב מלאה שמייצרת מתכונים לפי מה שיש במקרר, עם בינה מלאכותית.',
    image: '/images/projects/chef-julie.webp',
    imageAlt: "מסכי אפליקציית המתכונים שף ג'ולי",
    href: null,
    featured: false,
    approved: true,
  },
  {
    id: 'space-cv',
    title: 'Space CV — התאמת קורות חיים',
    client: null,
    kind: 'demo',
    tags: ['כלי AI'],
    summary:
      'מערכת שמתאימה קורות חיים לתיאורי משרות ומסמנת את הפערים — ניסוי בעיבוד שפה.',
    image: '/images/projects/space-cv.webp',
    imageAlt: 'מסך התוצאות של מערכת Space CV',
    href: null,
    featured: false,
    approved: true,
  },
  {
    id: 'event-rsvp',
    title: 'מערכת אישורי הגעה לאירועים',
    client: null,
    kind: 'demo',
    tags: ['אתרים', 'אוטומציות'],
    summary:
      'אתר אירוע ומערכת ניהול אישורי הגעה — הזמנות, מעקב ורשימת מוזמנים.',
    image: '/images/projects/event-rsvp.webp',
    imageAlt: 'מסך ניהול אישורי ההגעה של מערכת האירועים',
    href: null,
    featured: false,
    approved: true,
  },
  {
    id: 'tziluin',
    title: 'צילוין — חנות תכשיטים',
    client: null,
    kind: 'demo',
    tags: ['אתרים'],
    summary: 'קונספט אתר חנות תכשיטים בעיצוב מינימליסטי.',
    image: '/images/projects/tziluin.webp',
    imageAlt: 'עמוד הבית של קונספט אתר התכשיטים צילוין',
    href: null,
    featured: false,
    approved: true,
  },
  {
    id: 'music-teacher',
    title: 'אתר תדמית למורה לנגינה',
    client: null,
    kind: 'demo',
    tags: ['אתרים'],
    summary:
      'אתר תדמית אישי עם עמוד שיעורים ואזור להעלאת חומרים לתלמידים.',
    image: '/images/projects/music-teacher.webp',
    imageAlt: 'עמוד הבית של אתר התדמית למורה לנגינה',
    href: null,
    featured: false,
    approved: true,
  },
  {
    id: 'john-chimuchi',
    title: 'מיתוג מוזיקלי — John Chimuchi',
    client: null,
    kind: 'demo',
    tags: ['מיתוג', 'עיצוב גרפי'],
    summary:
      'קונספט זהות ויזואלית לאומן עצמאי: לוגו, עטיפות ושפה לרשתות.',
    image: '/images/projects/john-chimuchi.webp',
    imageAlt: 'הזהות הוויזואלית של האומן John Chimuchi',
    href: null,
    featured: false,
    approved: true,
  },
  {
    id: 'protest-postcards',
    title: 'גלויות מחאה — אחדות חברתית',
    client: null,
    kind: 'demo',
    tags: ['עיצוב גרפי'],
    summary: 'סדרת גלויות גרפיות בנושא אחדות החברה. פרויקט אישי.',
    image: '/images/projects/protest-postcards.webp',
    imageAlt: 'גלויות גרפיות מסדרת המחאה בנושא אחדות חברתית',
    href: null,
    featured: false,
    approved: true,
  },
  {
    id: 'music-shop-flyer',
    title: 'פלאייר לחנות כלי נגינה',
    client: null,
    kind: 'demo',
    tags: ['עיצוב גרפי'],
    summary: 'פלאייר שיווקי לחנות נגינה — קונספט.',
    image: '/images/projects/music-shop-flyer.webp',
    imageAlt: 'הפלאייר השיווקי לחנות כלי הנגינה',
    href: null,
    featured: false,
    approved: true,
  },
]

/** רק פרויקטים שאושרו להצגה פומבית עולים לאוויר */
export const visibleProjects = projects.filter((p) => p.approved)

export const featuredProjects = visibleProjects.filter((p) => p.featured)

/**
 * סדר התגיות בסרגל הסינון. תגית בלי פרויקט גלוי לא מוצגת.
 * סדר קבוע ולא אלפביתי — כדי ששורת הכפתורים לא תקפוץ כשמוסיפים פרויקט.
 */
const TAG_ORDER = [
  'מיתוג',
  'אתרים',
  'עיצוב גרפי',
  'סושיאל',
  'כלי AI',
  'אוטומציות',
]

const usedTags = new Set(visibleProjects.flatMap((p) => p.tags))

export const allTags = [
  ...TAG_ORDER.filter((t) => usedTags.has(t)),
  ...Array.from(usedTags)
    .filter((t) => !TAG_ORDER.includes(t))
    .sort(),
]
