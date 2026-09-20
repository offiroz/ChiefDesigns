# Chief Designs — שלד האתר

מימוש שלב 5 בתכנית העבודה. Next.js 14 (App Router) + Tailwind + TypeScript, RTL מלא.

## הרצה

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # מייצר out/ — HTML סטטי
npm run serve:static
```

הבנייה דורשת חיבור לרשת בפעם הראשונה: `next/font` מוריד את Rubik, Heebo ו-Frank Ruhl Libre מגוגל **בזמן build** ומגיש אותם מהדומיין שלנו. בזמן ריצה אין שום בקשה לגוגל.

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
  lib/fonts.ts  שלושת הפונטים, self-hosted דרך next/font
  app/{accessibility,privacy,terms}/  שלושת העמודים המשפטיים
deploy/         nginx/ · server-setup.md · rollback.sh
.github/        workflows/deploy.yml
optional/       contact-route.ts
scripts/        check-contrast.mjs
```

להוספת פרויקט לתיק: רשומה אחת ב-`src/data/projects.ts`. אין צורך לגעת בקומפוננטה.

## מה חסר, לפי סדר

1. **סקרינשוטים** — `public/images/projects/`, פורמט WebP. כל רשומה ב-`projects.ts` עם `image: null` מציגה placeholder.
2. **`approved: true`** — רק פרויקט מאושר מוצג. כרגע 2 מתוך 5 עדיין `false`, ולכן לא עולים לאוויר.
3. **10 הפרויקטים הנותרים** — להעתיק את מבנה הרשומה.
4. **לוגו הפרלקס** (שלב 4) — מסומן `TODO` ב-`Header.tsx` וב-`Hero.tsx`. עד אז לוגוטייפ טקסטואלי.
5. **`og-image.jpg`** — 1200×630, ל-`public/images/`.
6. **אישור עו״ד לשלושת העמודים המשפטיים** — הם כתובים ועובדים, אבל הם טיוטה. בראש כל קובץ יש בלוק הערה עם נקודות הבדיקה.
7. **מזהה Clarity** — `analytics.clarity` ב-`site.ts`. Google Ads כבר פעיל; Clarity לא נטען עד שהמזהה ימולא.
8. **לינקדאין ו-Behance** — `site.social`, אם יש פרופילים. אינסטגרם ופייסבוק כבר מוגדרים.

הצלבה מלאה מול רשימת התיקונים מ-25/06/2026 נמצאת בפרויקט, `chiefdesigns-fixes-crosscheck.md` — כל 29 הסעיפים סגורים.

## פריסה

הכול ב-`deploy/`. ההקמה החד-פעמית מתוארת שלב-שלב ב-`deploy/server-setup.md`; אחריה כל פריסה היא `git push`.

```
redesign  →  staging.chiefdesigns.co.il   (מוגן בסיסמה, חסום לאינדוקס)
main      →  chiefdesigns.co.il
```

`.github/workflows/deploy.yml` בונה, מריץ את בדיקת הניגודיות ואת `tsc --noEmit`, מעלה ב-rsync לתיקיית release חדשה, ומחליף symlink. ההחלפה אטומית. חזרה אחורה: `cd-rollback` על השרת, פחות משנייה.

הקונפיגורציות ב-`deploy/nginx/` נבדקו מול nginx אמיתי שהגיש את הבנייה: הריידיירקטים, ה-404, כותרות האבטחה, ה-gzip והקאשינג כולם אומתו.
