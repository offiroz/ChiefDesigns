import { services } from '@/data/services'
import { ServiceIcon } from '@/components/ui/ServiceIcon'

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
              {/*
                האייקון דקורטיבי — הכותרת נושאת את המשמעות.
                צבע אחד, יורש מ-currentColor: טורקיז במנוחה, פוקסיה
                ב-hover, באותו מעבר של המסגרת. שניהם עוברים AA.
              */}
              <ServiceIcon
                name={s.icon}
                className="text-ink-teal transition-colors duration-300
                           group-hover:text-ink-fuchsia"
              />

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
