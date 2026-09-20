import Link from 'next/link'
import type { ComponentProps } from 'react'

/*
 * כללי הצבע של שלב 1, אכופים בקוד:
 *
 *   primary   — מילוי ink.fuchsia (#A82A4C) + טקסט לבן   → 6.77:1 ✓
 *   secondary — מילוי surface.teal (#00D9C0) + נייבי      → 6.26:1 ✓
 *   ghost     — טקסט ink.fuchsia על לבן                    → 6.77:1 ✓
 *
 * אין וריאנט עם מילוי #E75480 — עליו שום צבע טקסט לא עובר AA.
 * הפוקסיה הבהירה שמורה לרקעים וגרדיאנטים בלבד.
 */

const variants = {
  primary:
    'bg-ink-fuchsia text-white hover:bg-[#8F2241] shadow-sm',
  secondary:
    'bg-surface-teal text-ink-navy hover:bg-[#00C2AC]',
  ghost:
    'bg-transparent text-ink-fuchsia hover:bg-ink-fuchsia/10',
} as const

const sizes = {
  md: 'px-5 py-2.5 text-base',
  lg: 'px-7 py-3.5 text-lg',
} as const

const base =
  'inline-flex items-center justify-center gap-2 rounded-xl font-display font-semibold ' +
  'transition-colors duration-200 min-h-[44px]' // 44px — יעד מגע מינימלי

type Props = {
  variant?: keyof typeof variants
  size?: keyof typeof sizes
} & ComponentProps<typeof Link>

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}: Props) {
  return (
    <Link
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    />
  )
}
