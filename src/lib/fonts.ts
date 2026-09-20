import { Rubik, Heebo, Frank_Ruhl_Libre } from 'next/font/google'

/*
 * next/font מוריד את הפונטים בזמן build ומגיש אותם מהדומיין שלנו.
 * אין בקשה ל-fonts.googleapis.com בזמן ריצה — מהירות ופרטיות,
 * כפי שנדרש בשלב 1 ובשלב 7.
 */

export const rubik = Rubik({
  subsets: ['hebrew', 'latin'],
  weight: ['500', '600', '700'],
  variable: '--font-rubik',
  display: 'swap',
})

export const heebo = Heebo({
  subsets: ['hebrew', 'latin'],
  weight: ['400', '500', '700'],
  variable: '--font-heebo',
  display: 'swap',
})

export const frankRuhl = Frank_Ruhl_Libre({
  subsets: ['hebrew', 'latin'],
  weight: ['700'],
  variable: '--font-frank',
  display: 'swap',
})

export const fontVariables = `${rubik.variable} ${heebo.variable} ${frankRuhl.variable}`
