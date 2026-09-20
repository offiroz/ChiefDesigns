/** @type {import('next').NextConfig} */

/*
 * החלטה פתוחה משלב 5 — הוכרעה כאן לטובת אתר סטטי.
 *
 * output: 'export' מייצר תיקיית out/ עם HTML סטטי ש-nginx מגיש ישירות.
 * אין תהליך Node לתחזק, אין PM2, אין ניטור — אותה חוויית פיתוח, אפס ops.
 *
 * מתי להחליף ל-server: רק אם צריך API route בצד שרת (למשל טיפול בטופס
 * עם reCAPTCHA server-side). אז מוחקים את שתי השורות המסומנות,
 * מעבירים את optional/contact-route.ts ל-src/app/api/contact/route.ts,
 * ומריצים תחת PM2 כמו הבוט.
 */
const nextConfig = {
  output: 'export',                    // <- להסיר במעבר ל-server
  images: { unoptimized: true },       // <- להסיר במעבר ל-server
  trailingSlash: true,
  reactStrictMode: true,
  poweredByHeader: false,
}

export default nextConfig
