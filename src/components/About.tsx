export function About() {
  return (
    <section id="about" className="section bg-white">
      <div className="container-content grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-center">
        <div>
          <p className="section-kicker">מי עומד מאחורי זה</p>
          <h2 className="section-title">אודות</h2>

          {/* טקסט סגור בשלב 2 — מחליף את הנוסח הגנרי הישן */}
          <div className="mt-6 space-y-5 text-lg leading-relaxed text-ink-muted">
            <p>
              <strong className="font-semibold text-ink-navy">Chief Designs</strong>{' '}
              הוא סטודיו עיצוב שמוביל אופיר בעצמו — מהשיחה הראשונה ועד השורה
              האחרונה של קוד. כל פרויקט מקבל תשומת לב אישית, ולפי הצורך מצטרפת
              רשת שותפים ומומחים שבניתי לאורך הדרך.
            </p>
            <p>
              אנחנו גולשים על הגל של החדשנות: משלבים עיצוב קלאסי עם כלי AI
              ואוטומציה, כדי לתת איכות של סוכנות במחיר של פרילנסר.
            </p>
            <p>
              כל פרויקט — קטן כגדול — מטופל בקפידה, בלי בירוקרטיה מיותרת
              ובתקשורת ישירה.
            </p>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="hidden rounded-3xl bg-brand-gradient-soft p-12 lg:block"
        >
          {/* TODO: תמונה של אופיר, או הלוגו בגרסה גדולה */}
          <div className="aspect-square rounded-2xl bg-white/60" />
        </div>
      </div>
    </section>
  )
}
