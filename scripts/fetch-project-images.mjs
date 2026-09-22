#!/usr/bin/env node
/*
 * ════════════════════════════════════════════════════════════════
 *  מוריד את תמונות תיק העבודות ל-public/images/projects/.
 *
 *  14 מהתמונות הן אותן תמונות שהאתר הישן הגיש, מחשבון ה-Cloudinary
 *  של הסטודיו. הן לא יושבות בריפו — הן נמשכות כאן, בזמן הבנייה,
 *  ונפרסות כחלק מהאתר. ככה האתר מגיש הכול מהדומיין של עצמו:
 *  אין דומיין שלישי ב-CSP ואין DNS נוסף לכל ביקור.
 *
 *  רץ אוטומטית ב-GitHub Actions לפני `npm run build`.
 *  לבנייה מקומית: `node scripts/fetch-project-images.mjs` פעם אחת.
 *
 *  הסקריפט מדלג על קובץ שכבר קיים, אז אפשר להריץ אותו שוב בלי חשש.
 *  להורדה מחדש: למחוק את הקובץ ולהריץ שוב. להוספת פרויקט: שורה ב-
 *  IMAGES עם אותו id שב-src/data/projects.ts, והנתיב יסתדר לבד.
 * ════════════════════════════════════════════════════════════════
 */

import { mkdir, writeFile, stat } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const OUT_DIR = resolve(ROOT, 'public/images/projects')

// רוחב 1400 כדי שיהיה מרווח לצגי Retina; הכרטיס מציג ~450px
const TRANSFORM = 'f_webp,q_auto:good,w_1400'
const BASE = 'https://res.cloudinary.com/dy4zfgrmu/image/upload'

/** id (זהה ל-projects.ts) → הנתיב ב-Cloudinary */
const IMAGES = {
  'kfar-tikva-names': 'v1773583523/name-changer_i64kfk.png',
  'carmel-magazine': 'v1773583525/carmelmagazin_wqx9ab.png',
  'alkaa-branding': 'v1782322946/alkaa/logo.png',
  'alkaa-social': 'v1782322947/alkaa/post1.jpg',
  'cozze-recipe-book': 'v1774970623/JOeR20SFM0q_ibkm7p.webp',
  'chief-bot': 'v1773593087/whatsapp_mocup_z6b1dt.jpg',
  'chef-julie': 'v1774968294/064daef4a3f4e6e4_apjtzp.webp',
  'space-cv': 'v1773583707/Space_CV_rbniyp.png',
  'event-rsvp': 'v1773583523/hafakothafakot_jsuvlb.png',
  tziluin: 'v1774967609/sjipu1phIM_amttmm.png',
  'music-teacher': 'v1774968786/fTLNcnBSCbO_nbjirs.webp',
  'john-chimuchi': 'v1774966232/6cdd0333af96a38d_rjsfny.jpg',
  'protest-postcards':
    'v1778498036/%D7%9E%D7%97%D7%90%D7%94_%D7%A1%D7%95%D7%A4%D7%99%D7%AA_1_ybppgq.png',
  'music-shop-flyer': 'v1774966866/OA4D6j5OZIm_ni6tom.jpg',
}

/** ניסיון חוזר — רשת שנופלת פעם אחת לא אמורה להפיל בנייה */
async function download(url, attempts = 3) {
  for (let i = 1; ; i++) {
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(30_000) })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)

      const type = res.headers.get('content-type') ?? ''
      if (!type.startsWith('image/')) throw new Error(`לא תמונה (${type})`)

      const buf = Buffer.from(await res.arrayBuffer())
      if (buf.byteLength < 1024) throw new Error(`קטן מדי (${buf.byteLength}B)`)
      return buf
    } catch (err) {
      if (i >= attempts) throw err
      await new Promise((r) => setTimeout(r, 1000 * i))
    }
  }
}

async function exists(path) {
  try {
    const s = await stat(path)
    return s.size > 1024
  } catch {
    return false
  }
}

await mkdir(OUT_DIR, { recursive: true })

const failed = []
let fetched = 0
let skipped = 0

for (const [id, path] of Object.entries(IMAGES)) {
  const dest = resolve(OUT_DIR, `${id}.webp`)

  if (await exists(dest)) {
    skipped++
    continue
  }

  process.stdout.write(`${id.padEnd(22)} `)
  try {
    const buf = await download(`${BASE}/${TRANSFORM}/${path}`)
    await writeFile(dest, buf)
    console.log(`✓ ${String(Math.round(buf.byteLength / 1024)).padStart(5)} KB`)
    fetched++
  } catch (err) {
    console.log(`✗ ${err.message}`)
    failed.push(id)
  }
}

console.log(
  `\n${fetched} הורדו · ${skipped} כבר קיימים · ${failed.length} נכשלו`
)

if (failed.length) {
  console.error(
    `\nנכשלו: ${failed.join(', ')}\n` +
      'הבנייה נעצרת — עדיף להיכשל מאשר לפרוס אתר עם תמונות שבורות.\n' +
      'אם תמונה נמחקה מ-Cloudinary: לעדכן את IMAGES כאן ואת projects.ts.'
  )
  process.exit(1)
}
