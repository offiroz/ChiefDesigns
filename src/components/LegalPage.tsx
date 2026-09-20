import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string
  /** תאריך עדכון אחרון, בפורמט DD.MM.YYYY */
  updated: string
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      <main id="main">
        <div className="bg-surface-navy pt-32 pb-16 on-navy">
          <div className="container-content">
            <h1 className="text-3xl font-display font-bold text-white sm:text-5xl">
              {title}
            </h1>
            <p className="mt-4 text-on-dark-muted">
              עודכן לאחרונה: <time dateTime={updated.split('.').reverse().join('-')}>{updated}</time>
            </p>
          </div>
        </div>

        <article className="container-content max-w-3xl py-16">
          <div className="legal-prose">{children}</div>
        </article>
      </main>
      <Footer />
    </>
  )
}
