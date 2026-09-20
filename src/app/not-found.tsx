import Link from 'next/link'

export default function NotFound() {
  return (
    <main id="main" className="flex min-h-screen items-center justify-center px-6">
      <div className="text-center">
        <p className="font-display text-sm font-semibold uppercase tracking-widest text-ink-fuchsia">
          שגיאה 404
        </p>
        <h1 className="mt-3 text-4xl font-bold text-ink-navy">העמוד לא נמצא</h1>
        <p className="mt-4 text-lg text-ink-muted">
          הקישור אולי השתנה, או שהעמוד כבר לא קיים.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex min-h-[44px] items-center rounded-xl bg-ink-fuchsia
                     px-7 py-3.5 font-display font-semibold text-white hover:bg-[#8F2241]"
        >
          חזרה לעמוד הבית
        </Link>
      </div>
    </main>
  )
}
