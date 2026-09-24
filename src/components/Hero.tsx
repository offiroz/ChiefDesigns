import { Button } from '@/components/ui/Button'
import { site } from '@/data/site'
import { BrandMark } from '@/components/ui/BrandMark'

export function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-surface-navy pt-32 pb-24 sm:pt-40 sm:pb-32 on-navy"
      /* הבמה שהפרלקס מודד ממנה את מיקום העכבר */
      data-parallax-stage
    >
      {/*
        רקע דקורטיבי — כאן, ורק כאן, הפוקסיה הבהירה מותרת:
        זה שטח, לא טקסט. aria-hidden כי אין לו משמעות לקורא מסך.
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -start-40 h-[32rem] w-[32rem]
                   rounded-full bg-brand-gradient opacity-25 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -end-24 h-96 w-96
                   rounded-full bg-surface-teal opacity-20 blur-3xl"
      />

      <div className="container-content relative">
        <div className="flex flex-col-reverse items-start gap-10
                        lg:flex-row lg:items-center lg:gap-16">
        <div className="max-w-3xl animate-fade-up">
          <p className="mb-4 font-display text-sm font-semibold uppercase
                        tracking-widest text-on-dark-teal">
            {site.tagline}
          </p>

          <h1 className="text-4xl font-bold leading-[1.15] text-white sm:text-6xl">
            לא בונים אתרים,{' '}
            <span className="text-on-dark-fuchsia">מעצבים.</span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-on-dark-muted sm:text-xl">
            מיתוג, אתרים וכלים דיגיטליים — מהרעיון ועד ה-AI שמפעיל אותו.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Button href="#contact" size="lg">
              בואו נדבר
            </Button>
            <Button
              href="#portfolio"
              size="lg"
              variant="secondary"
            >
              לתיק העבודות
            </Button>
          </div>
        </div>

        {/*
          סימן הגל, שלוש שכבות בפרלקס. שכבה קרובה זזה יותר מרחוקה —
          זו פרספקטיבה אמיתית, והיפוך שלה מרגיש שגוי בלי שאפשר להסביר
          למה. הנדנוד העצמאי הוא מה שרואים בנייד, בלי עכבר.
          מכובה לגמרי ב-prefers-reduced-motion.
        */}
        <div aria-hidden="true" className="shrink-0">
          <BrandMark
            size={300}
            tone="dark"
            parallax
            /* הגודל נשלט ב-CSS ולא בתכונות ה-svg, כדי שיהיה רספונסיבי.
               בנייד אין עכבר — מה שנשאר הוא הנדנוד העצמאי. */
            className="h-40 w-40 sm:h-52 sm:w-52 lg:h-[300px] lg:w-[300px]"
          />
        </div>
        </div>
      </div>
    </section>
  )
}
