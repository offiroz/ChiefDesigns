export const site = {
  name: 'Chief Designs',
  nameHe: 'צ׳יף דיזיינס',
  url: 'https://chiefdesigns.co.il',
  tagline: 'גולשים על הגל של החדשנות 🌊',
  title: 'Chief Designs — מיתוג, אתרים וכלים דיגיטליים',
  description:
    'סטודיו עיצוב שמוביל אופיר עוז: מיתוג, אתרי תדמית ומכירה, אוטומציות וכלי AI מותאמים אישית. איכות של סוכנות במחיר של פרילנסר.',
  locale: 'he_IL',

  contact: {
    phone: '050-2410616',
    phoneIntl: '+972502410616',
    whatsapp: '972502410616',
    email: 'offiroz@chiefdesigns.co.il',
  },

  /* פרטי עסק גלויים בפוטר — שלב 6 + סעיף 2 ברשימת התיקונים */
  business: {
    legalName: 'אופיר עוז — Chief Designs',
    type: 'עוסק פטור',
    taxId: '307978684',
    address: 'עמק יזרעאל',
  },

  /*
   * סעיף 21: באתר הישן ארבעת הכפתורים הצביעו ל-'#'.
   * כאן כל ערוץ מוצג רק אם יש לו כתובת — עדיף בלי כפתור מכפתור מת.
   * להוסיף ערוץ: למלא את ה-url. להסיר: להחזיר למחרוזת ריקה.
   */
  social: [
    { label: 'אינסטגרם', url: 'https://www.instagram.com/chief.designs21/' },
    { label: 'פייסבוק',  url: 'https://www.facebook.com/profile.php?id=61591256966889' },
    { label: 'לינקדאין', url: '' },
    { label: 'Behance',  url: '' },
  ],

  /*
   * מזהי מעקב. אינם סודות — הם גלויים ממילא בקוד המקור של הדף,
   * ולכן הם כאן ולא ב-.env. כל מזהה ריק = הסקריפט שלו לא נטען.
   *
   * ⚠ הוספה או שינוי כאן מחייבת שורת CSP תואמת ב-
   *   deploy/nginx/snippets/security-headers.conf — אחרת הדפדפן
   *   יחסום את הסקריפט בשקט ותחשוב שהמעקב עובד כשהוא לא.
   */
  analytics: {
    /* הועבר מהאתר הישן */
    googleAds: 'AW-17466147922',
    /* TODO: מזהה הפרויקט מ-clarity.microsoft.com → Settings → Overview */
    clarity: '',
  },

  /*
   * ה-anchors נשמרים זהים לאתר הישן (#home, #services, #portfolio,
   * #about, #contact) כדי שקישורים קיימים שמצביעים אליהם לא יישברו.
   */
  nav: [
    { label: 'בית', href: '#home' },
    { label: 'שירותים', href: '#services' },
    { label: 'תיק עבודות', href: '#portfolio' },
    { label: 'אודות', href: '#about' },
    { label: 'צור קשר', href: '#contact' },
  ],
} as const
