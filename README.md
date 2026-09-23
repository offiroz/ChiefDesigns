# Chief Designs — שלד האתר

מימוש שלב 5 בתכנית העבודה. Next.js 14 (App Router) + Tailwind + TypeScript, RTL מלא.

## הרצה

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # מייצר out/ — HTML סטטי
npm run serve:static
```

הבנייה לא דורשת רשת לפונטים. שלושת הפונטים — Rubik, Heebo ו-Frank Ruhl Libre — יושבים ב-`public/fonts/` ונכנסים לגיט. פרטים ב"פונטים" למטה.

## מה כבר עובד

- שבע הקומפוננטות משלב 5, עם הטקסטים הסגורים משלב 2
- `tailwind.config.ts` עם כל טוקני הצבע בשמות שנקבעו
- `lang="he" dir="rtl"`, skip link, focus-visible, `prefers-reduced-motion`
- סינון תיק עבודות לפי תגית, מבוסס `src/data/projects.ts`
- טופס יצירת קשר עם ולידציה, הודעות שגיאה מקושרות ל-`aria-describedby`, ו-honeypot
- `sitemap.xml`, `robots.txt`, JSON-LD מסוג `ProfessionalService`, Open Graph
- עמוד 404 מעוצב, עם סטטוס 404 אמיתי
- הצהרת נגישות, מדיניות פרטיות ותנאי שימוש
- פריסה אוטומטית משני ברנצ'ים, עם rollback
- Google Ads ו-Microsoft Clarity, נטענים afterInteractive ומופעלים לפי מזהה
- CSP, favicon, וכל כותרות האבטחה
- פונטים מאוחסנים עצמית, בלי תלות בגוגל בבנייה או בריצה

## החלטה שהוכרעה: אתר סטטי

`next.config.mjs` מוגדר ל-`output: 'export'`. הבנייה מייצרת `out/` ש-nginx מגיש ישירות — בלי PM2, בלי תהליך Node, בלי ניטור.

הטופס עובד בלי שרת: הוא מרכיב הודעה ופותח אותה בוואטסאפ. אין endpoint, ולכן גם אין משטח ספאם — ולכן גם reCAPTCHA לא נחוץ.

אם בכל זאת יידרש צד שרת, `optional/contact-route.ts` מוכן עם rate-limiting, ולידציה ו-reCAPTCHA. ההוראות להחלפה בראש הקובץ.

## כלל הצבע

הפלטה מפוצלת לשניים:

- `surface.*` — רקעים, גרדיאנטים, דקורציה. **אסור כטקסט.**
- `ink.*` / `on-dark.*` — טקסט. כל ערך נבדק ועובר WCAG AA.

`#E75480` כטקסט נותן 3.51:1 על לבן ו-3.20:1 על נייבי — שניהם נכשלים. לטקסט פוקסיה משתמשים ב-`ink-fuchsia` (`#A82A4C`, 6.77:1).

```bash
node scripts/check-contrast.mjs
```

בודק את כל 21 צמדי הצבע שבשימוש בפועל. כרגע כולם עוברים. כדאי להריץ אחרי כל שינוי צבע.

## מבנה

```
src/
  app/          layout (RTL, פונטים, metadata, JSON-LD), page, 404, sitemap, robots
  components/   Header Hero Services Portfolio About Contact Footer + ui/Button
  data/         site.ts · services.ts · projects.ts   ← התוכן חי כאן, לא בקומפוננטות
  lib/fonts.ts  רשימת ה-preload. ה-@font-face ב-styles/fonts.css
  styles/fonts.css  נוצר על ידי scripts/fetch-fonts.ps1 — לא לערוך ביד
  app/{accessibility,privacy,terms}/  שלושת העמודים המשפטיים
deploy/         nginx/ · server-setup.md · rollback.sh
.github/        workflows/deploy.yml
optional/       contact-route.ts
scripts/        check-contrast.mjs · fetch-project-images.mjs · fetch-fonts.ps1
public/fonts/   14 קבצי woff2, בגיט
```

להוספת פרויקט לתיק: רשומה אחת ב-`src/data/projects.ts`. אין צורך לגעת בקומפוננטה.

## מה חסר, לפי סדר

1. **שני סקרינשוטים** — 4Dawn ואלומות בעומר, היחידים עם `image: null`. שאר 14 התמונות מגיעות מהאתר הישן אוטומטית. פורמט WebP, ל-`public/images/projects/`.
2. **אישור מעמותת אלומות בעומר** — הפרויקט היחיד עם `approved: false`, כי הוא לא היה באתר הישן הפומבי. 15 האחרים מאושרים.
3. **לוגו הפרלקס** (שלב 4) — מסומן `TODO` ב-`Header.tsx` וב-`Hero.tsx`. עד אז לוגוטייפ טקסטואלי.
4. **`og-image.jpg`** — 1200×630, ל-`public/images/`.
5. **אישור עו״ד לשלושת העמודים המשפטיים** — הם כתובים ועובדים, אבל הם טיוטה. בראש כל קובץ יש בלוק הערה עם נקודות הבדיקה.
6. **מזהה Clarity** — `analytics.clarity` ב-`site.ts`. Google Ads כבר פעיל; Clarity לא נטען עד שהמזהה ימולא.
7. **לינקדאין ו-Behance** — `site.social`, אם יש פרופילים. אינסטגרם ופייסבוק כבר מוגדרים.

הצלבה מלאה מול רשימת התיקונים מ-25/06/2026 נמצאת בפרויקט, `chiefdesigns-fixes-crosscheck.md` — כל 29 הסעיפים סגורים.

## פונטים

שלושת הפונטים יושבים ב-`public/fonts/` — 14 קבצי woff2, 300KB בסך הכול, בגיט.

היה כאן `next/font/google`, שהוריד אותם מגוגל **בכל בנייה**. ב-23.09 גוגל לא הייתה זמינה מהראנר והבנייה נפלה על שלושה `Failed to fetch`. עכשיו אין תלות: לא בזמן build, ולא בזמן ריצה.

`src/styles/fonts.css` נוצר אוטומטית ומכיל את כללי ה-`@font-face`, כולל `unicode-range` לכל תת-קבוצה — דפדפן שמציג רק עברית לא מוריד את הקובץ הלטיני. שלושת קבצי העברית שנטענים בכל עמוד מקבלים `preload` ב-`layout.tsx` (`preloadedFonts` ב-`src/lib/fonts.ts`).

להוספת משקל או פונט:

```powershell
powershell -ExecutionPolicy Bypass -File scripts\fetch-fonts.ps1
```

הסקריפט קורא את `$families` שבתוכו, מוריד מגוגל וכותב מחדש את `fonts.css`. לערוך את הרשימה שם, להריץ, ולקמט את הקבצים החדשים. **לא לערוך את `fonts.css` ביד** — הוא נדרס בכל הרצה.

## תיק העבודות

16 פרויקטים ב-`src/data/projects.ts`: 6 לקוחות אמיתיים, 10 דמו/קונספט. כל כרטיס נושא תגית שאומרת מה הוא — סעיף 4 ברשימת התיקונים.

`approved: false` על פרויקט = הוא לא מוצג, נקודה. היחיד שממתין לאישור הוא אלומות בעומר, כי הוא לא היה באתר הישן הפומבי.

### התמונות

14 מהן הן אותן תמונות שהאתר הישן הגיש, מחשבון ה-Cloudinary של הסטודיו. הן **לא בריפו** — הן נמשכות בזמן הבנייה:

```bash
node scripts/fetch-project-images.mjs
```

ב-GitHub Actions זה קורה אוטומטית לפני `npm run build`. לבנייה מקומית — להריץ פעם אחת. הסקריפט מדלג על קבצים שכבר קיימים, אז הרצה חוזרת לא עולה כלום.

התוצאה: האתר מגיש את התמונות מהדומיין של עצמו. אין דומיין שלישי ב-CSP, אין DNS נוסף לכל ביקור, ואם חשבון ה-Cloudinary ייעלם — הן כבר אצלנו. אם תמונה נכשלת, הבנייה נעצרת; עדיף מאשר לפרוס תיק עבודות עם ריבועים שבורים.

14 השמות האלה נמצאים ב-`.gitignore` — אבל רק הם. סקרינשוט שאתה מוסיף בעצמך לאותה תיקייה נכנס לגיט כרגיל.

## פריסה

הכול ב-`deploy/`. ההקמה החד-פעמית מתוארת שלב-שלב ב-`deploy/server-setup.md`; אחריה כל פריסה היא `git push`.

```
redesign  →  staging.chiefdesigns.co.il   (מוגן בסיסמה, חסום לאינדוקס)
main      →  chiefdesigns.co.il
```

`.github/workflows/deploy.yml` בונה, מריץ את בדיקת הניגודיות ואת `tsc --noEmit`, מעלה ב-rsync לתיקיית release חדשה, ומחליף symlink. ההחלפה אטומית. חזרה אחורה: `cd-rollback` על השרת, פחות משנייה.

הקונפיגורציות ב-`deploy/nginx/` נבדקו מול nginx אמיתי שהגיש את הבנייה: הריידיירקטים, ה-404, כותרות האבטחה, ה-gzip והקאשינג כולם אומתו.
