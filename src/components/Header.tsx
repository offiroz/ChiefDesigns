'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { site } from '@/data/site'
import { BrandMark } from '@/components/ui/BrandMark'

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Esc סוגר את התפריט — ציפייה בסיסית בניווט מקלדת */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-shadow duration-300 ${
        scrolled ? 'bg-white/95 shadow-md backdrop-blur' : 'bg-white/80 backdrop-blur'
      }`}
    >
      <nav
        aria-label="ניווט ראשי"
        className="container-content flex h-20 items-center justify-between"
      >
        <Link href="#home" className="flex items-center gap-2.5">
          {/*
            סימן הגל. דקורטיבי כאן — הלוגוטייפ שלידו נושא את השם,
            ולכן אין טעם שקורא מסך יקריא אותו פעמיים.
          */}
          <BrandMark size={40} tone="light" className="shrink-0" />
          <span className="font-logo text-2xl font-bold text-ink-fuchsia">
            {site.name}
          </span>
        </Link>

        {/* דסקטופ */}
        <ul className="hidden items-center gap-1 md:flex">
          {site.nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="rounded-lg px-4 py-2 font-display font-medium text-ink-navy
                           transition-colors hover:text-ink-fuchsia"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* מובייל */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'סגירת התפריט' : 'פתיחת התפריט'}
          className="flex h-11 w-11 items-center justify-center rounded-lg
                     text-ink-navy md:hidden"
        >
          <span aria-hidden="true" className="text-2xl leading-none">
            {open ? '✕' : '☰'}
          </span>
        </button>
      </nav>

      <div
        id="mobile-nav"
        hidden={!open}
        className="border-t border-border bg-white md:hidden"
      >
        <ul className="container-content py-2">
          {site.nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-4 py-3 font-display font-medium
                           text-ink-navy hover:bg-muted"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}
