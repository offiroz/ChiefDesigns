'use client'

import { useEffect, useRef } from 'react'

/*
 * ════════════════════════════════════════════════════════════════
 *  סימן הגל — מיושם לפי claude/chief-studios-brand-spec.md
 *
 *  גל אחד, שלושה עותקים לפי וקטור קבוע (8−, 22−). ההבדל היחיד
 *  בין השכבות הוא העובי — זה מה שיוצר את הפרספקטיבה האווירית.
 *  לא לשנות את הנתיב או את הווקטור בלי לעדכן את המפרט.
 *
 *  ⚠ הסימן הזה לא תלוי בשם. הוא מחליף את הדמות עם כובע הנוצות,
 *    ועובד בין אם השם יישאר Chief Designs ובין אם ישתנה. הלוגוטייפ
 *    הטקסטואלי מגיע מ-site.name, לכן החלפת שם היא שורה אחת שם.
 *
 *  tone='light'  — רקע בהיר, השכבה הקרובה בנייבי
 *  tone='dark'   — רקע כהה, השכבה הקרובה בלבן
 * ════════════════════════════════════════════════════════════════
 */

/** נתיב הבסיס — השכבה האמצעית. שתי האחרות הן הוא, מוזז. */
const WAVE =
  'M14 65 C 24 56 34 56 44 63 C 55 71 67 70 78 57 C 87 47 97 44 106 50'

const LAYERS = [
  { key: 'far', shift: 'translate(8 -22)', width: 8, color: '#00D9C0', depth: 0.35, ease: 0.06, phase: 0 },
  { key: 'mid', shift: undefined, width: 11.5, color: '#E75480', depth: 0.7, ease: 0.09, phase: 1.7 },
  { key: 'near', shift: 'translate(-8 22)', width: 15, depth: 1.2, ease: 0.12, phase: 3.1 },
] as const

export function BrandMark({
  size = 120,
  tone = 'light',
  parallax = false,
  className = '',
  title,
}: {
  size?: number
  tone?: 'light' | 'dark'
  /** תגובה לעכבר + נדנוד עצמאי. מכובה אוטומטית ב-prefers-reduced-motion. */
  parallax?: boolean
  className?: string
  /** טקסט לקורא מסך. בלעדיו הסימן דקורטיבי — נכון כשהשם כתוב לידו. */
  title?: string
}) {
  const svgRef = useRef<SVGSVGElement>(null)
  const nearColor = tone === 'dark' ? '#FFFFFF' : '#273E47'

  useEffect(() => {
    if (!parallax) return
    const svg = svgRef.current
    if (!svg) return

    const still = window.matchMedia('(prefers-reduced-motion: reduce)')
    const stage = svg.closest<HTMLElement>('[data-parallax-stage]') ?? svg

    const groups = LAYERS.map((l) => ({
      ...l,
      el: svg.querySelector<SVGGElement>(`[data-layer="${l.key}"]`),
      x: 0,
      y: 0,
    })).filter((l) => l.el)

    /* יעד ב-1..1−, ביחס למרכז הבמה */
    let tx = 0
    let ty = 0
    let raf: number | null = null

    /* Event ולא PointerEvent: הבמה יכולה להיות HTMLElement או SVGSVGElement,
       ועל טיפוס האיחוד TypeScript בוחר את החתימה הגנרית של addEventListener. */
    const onMove = (ev: Event) => {
      const e = ev as PointerEvent
      const r = stage.getBoundingClientRect()
      tx = ((e.clientX - r.left) / r.width - 0.5) * 2
      ty = ((e.clientY - r.top) / r.height - 0.5) * 2
    }
    const onLeave = () => {
      tx = 0
      ty = 0
    }

    /*
     * MOUSE ו-IDLE ביחידות viewBox (מתוך 120) ולא בפיקסלים, כך שהסימן
     * בהדר ובהירו מקבלים את אותה עוצמה יחסית בלי לכוונן מספרים.
     */
    const MOUSE = 4
    const IDLE = 1.5

    const frame = (t: number) => {
      const s = t / 1000
      for (const l of groups) {
        const drift = Math.sin(s * 0.45 + l.phase) * IDLE * l.depth
        const bob = Math.cos(s * 0.31 + l.phase) * IDLE * l.depth * 0.6
        const gx = tx * MOUSE * l.depth + drift
        const gy = ty * MOUSE * l.depth * 0.7 + bob
        l.x += (gx - l.x) * l.ease
        l.y += (gy - l.y) * l.ease
        l.el!.setAttribute(
          'transform',
          `translate(${l.x.toFixed(3)} ${l.y.toFixed(3)})`
        )
      }
      raf = requestAnimationFrame(frame)
    }

    const stop = () => {
      if (raf !== null) cancelAnimationFrame(raf)
      raf = null
    }

    const sync = () => {
      if (still.matches || document.hidden) {
        stop()
        groups.forEach((l) => l.el!.removeAttribute('transform'))
      } else if (raf === null) {
        raf = requestAnimationFrame(frame)
      }
    }

    stage.addEventListener('pointermove', onMove)
    stage.addEventListener('pointerleave', onLeave)
    still.addEventListener('change', sync)
    document.addEventListener('visibilitychange', sync)
    sync()

    return () => {
      stop()
      stage.removeEventListener('pointermove', onMove)
      stage.removeEventListener('pointerleave', onLeave)
      still.removeEventListener('change', sync)
      document.removeEventListener('visibilitychange', sync)
    }
  }, [parallax])

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 120 120"
      width={size}
      height={size}
      fill="none"
      className={className}
      style={{ overflow: 'visible' }}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      {LAYERS.map((l) => (
        <g key={l.key} data-layer={l.key}>
          <path
            d={WAVE}
            transform={l.shift}
            stroke={'color' in l ? l.color : nearColor}
            strokeWidth={l.width}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      ))}
    </svg>
  )
}
