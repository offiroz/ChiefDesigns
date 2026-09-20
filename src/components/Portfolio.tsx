'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { visibleProjects, allTags, type Project } from '@/data/projects'

function KindBadge({ kind }: { kind: Project['kind'] }) {
  const isClient = kind === 'client'
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        isClient
          ? 'bg-ink-teal text-white'
          : 'bg-muted text-ink-muted'
      }`}
    >
      {isClient ? 'לקוח אמיתי' : 'דמו אישי / AI'}
    </span>
  )
}

function ProjectCard({ p }: { p: Project }) {
  const body = (
    <>
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        {p.image ? (
          <Image
            src={p.image}
            alt={p.imageAlt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          /* Placeholder עד שהסקרינשוטים יתווספו */
          <div className="flex h-full items-center justify-center bg-brand-gradient-soft">
            <span className="text-sm font-medium text-ink-muted">
              תמונה בקרוב
            </span>
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex flex-wrap items-center gap-2">
          <KindBadge kind={p.kind} />
          {p.featured && (
            <span className="rounded-full bg-ink-fuchsia px-3 py-1 text-xs font-semibold text-white">
              בולט
            </span>
          )}
        </div>

        <h3 className="mt-4 text-xl font-display font-bold text-ink-navy">
          {p.title}
        </h3>
        {p.client && (
          <p className="mt-1 text-sm font-medium text-ink-teal">{p.client}</p>
        )}

        <p className="mt-3 leading-relaxed text-ink-muted">{p.summary}</p>

        <ul className="mt-4 flex flex-wrap gap-2">
          {p.tags.map((t) => (
            <li
              key={t}
              className="rounded-md bg-muted px-2.5 py-1 text-xs text-ink-muted"
            >
              {t}
            </li>
          ))}
        </ul>
      </div>
    </>
  )

  const shell =
    'group block overflow-hidden rounded-2xl border border-border bg-white ' +
    'transition-all duration-300 hover:-translate-y-1 hover:shadow-lg'

  return p.href ? (
    <li>
      <Link href={p.href} className={shell}>
        {body}
      </Link>
    </li>
  ) : (
    <li className={shell}>{body}</li>
  )
}

export function Portfolio() {
  const [tag, setTag] = useState<string | null>(null)

  const shown = useMemo(
    () => (tag ? visibleProjects.filter((p) => p.tags.includes(tag)) : visibleProjects),
    [tag]
  )

  return (
    <section id="portfolio" className="section bg-muted/40">
      <div className="container-content">
        <p className="section-kicker">מה כבר עשינו</p>
        <h2 className="section-title">תיק עבודות</h2>
        <p className="mt-4 max-w-2xl text-ink-muted">
          כל פרויקט מתויג בבירור — לקוח אמיתי או דמו אישי — כדי שתדעו בדיוק
          מה אתם רואים.
        </p>

        {/* סינון לפי תגית */}
        <div
          role="group"
          aria-label="סינון פרויקטים לפי תחום"
          className="mt-8 flex flex-wrap gap-2"
        >
          <button
            type="button"
            onClick={() => setTag(null)}
            aria-pressed={tag === null}
            className={`min-h-[44px] rounded-xl px-4 py-2 text-sm font-semibold transition-colors ${
              tag === null
                ? 'bg-ink-fuchsia text-white'
                : 'bg-white text-ink-navy hover:bg-white/60'
            }`}
          >
            הכל
          </button>
          {allTags.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTag(t)}
              aria-pressed={tag === t}
              className={`min-h-[44px] rounded-xl px-4 py-2 text-sm font-semibold transition-colors ${
                tag === t
                  ? 'bg-ink-fuchsia text-white'
                  : 'bg-white text-ink-navy hover:bg-white/60'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {shown.length > 0 ? (
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((p) => (
              <ProjectCard key={p.id} p={p} />
            ))}
          </ul>
        ) : (
          <p className="mt-10 rounded-2xl border border-dashed border-border
                        bg-white p-10 text-center text-ink-muted">
            אין עדיין פרויקטים שאושרו להצגה בתגית הזו.
          </p>
        )}
      </div>
    </section>
  )
}
