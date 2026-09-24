import type { ServiceIconName } from '@/components/ui/ServiceIcon'

export type Service = {
  id: string
  /** שם האייקון ברישום שב-ServiceIcon.tsx. הציור עצמו חי שם, לא כאן. */
  icon: ServiceIconName
  title: string
  body: string
}

/* הטקסטים סגורים בשלב 2 — לא לשנות בלי לעדכן את תכנית העבודה */
export const services: Service[] = [
  {
    id: 'branding',
    icon: 'shapes',
    title: 'עיצוב ומיתוג',
    body: 'לוגו, זהות ויזואלית וחומרי מותג שמספרים את הסיפור שלכם — ונשארים בזיכרון.',
  },
  {
    id: 'websites',
    icon: 'window',
    title: 'אתרים',
    body: 'אתרי תדמית ומכירה שבנויים לתוצאות: מהירים, ברורים, ומביאים לקוחות.',
  },
  {
    id: 'social',
    icon: 'bubbles',
    title: 'ניהול תוכן לרשתות',
    body: 'תוכן חודשי בנוי מראש, מעוצב ומתוזמן — כדי שהעמוד שלכם ידבר גם כשאתם לא זמינים.',
  },
  {
    id: 'automation',
    icon: 'flow',
    title: 'אוטומציות ובוטים',
    body: 'מוואטסאפ ועד תהליכים פנימיים — אוטומציה שחוסכת לכם שעות בשבוע.',
  },
  {
    id: 'ai-tools',
    icon: 'chip',
    title: 'כלי AI מותאמים אישית',
    body: 'כלים דיגיטליים שנבנים בול למה שאתם צריכים, לא תבנית גנרית.',
  },
  {
    id: 'strategy',
    icon: 'target',
    title: 'אסטרטגיה דיגיטלית',
    body: 'תכנון שמחבר בין כל השירותים למטרה אחת — נוכחות דיגיטלית שעובדת בשבילכם.',
  },
]
