import { services } from '@/data/services'

export function Services() {
  return (
    <section id="services" className="section bg-white">
      <div className="container-content">
        <p className="section-kicker">מה אנחנו עושים</p>
        <h2 className="section-title">שירותים</h2>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <li
              key={s.id}
              className="group rounded-2xl border border-border bg-white p-7
                         transition-all duration-300
                         hover:-translate-y-1 hover:border-surface-fuchsia hover:shadow-lg"
            >
              {/* האייקון דקורטיבי — הכותרת נושאת את המשמעות */}
              <span aria-hidden="true" className="text-3xl">
                {s.icon}
              </span>

              <h3 className="mt-4 text-xl font-display font-bold text-ink-navy">
                {s.title}
              </h3>

              <p className="mt-3 leading-relaxed text-ink-muted">{s.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
