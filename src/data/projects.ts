export type ProjectKind = 'client' | 'demo'

export type Project = {
  id: string
  title: string
  /** שם הלקוח. null = דמו אישי או לקוח שלא אישר שם */
  client: string | null
  /** 'client' = לקוח אמיתי, 'demo' = דמו אישי/AI. מוצג כתגית על הכרטיס. */
  kind: ProjectKind
  tags: string[]
  summary: string
  /** נתיב יחסי תחת public/. חייב להיות WebP. */
  image: string | null
  /** alt תיאורי — לא "תמונת פרויקט" */
  imageAlt: string
  href: string | null
  featured: boolean
  /** true = הלקוח אישר הצגה פומבית (שלב 6). בלי אישור — לא עולה לאוויר. */
  approved: boolean
}

/*
 * ────────────────────────────────────────────────────────────
 *  שלד. שלושת הפרויקטים הבולטים מלאים; 12 הנותרים ממתינים לנתונים.
 *  להוספת פרויקט: להוסיף רשומה כאן. אין צורך לגעת בקומפוננטה.
 * ────────────────────────────────────────────────────────────
 */
export const projects: Project[] = [
  {
    id: '4dawn',
    title: '4Dawn',
    client: null,
    kind: 'demo',
    tags: ['מיתוג', 'אתר', 'אפליקציה', 'Design System'],
    summary:
      'קונספט אישי בעיצוב מקצה לקצה: זהות מותג, אתר, אפליקציה ומערכת עיצוב מלאה.',
    image: null, // TODO: סקרינשוט
    imageAlt: 'מסכי האפליקציה ומערכת העיצוב של 4Dawn',
    href: null, // TODO: קישור לפרוטוטייפ אינטראקטיבי (יש רק וויירפריימים)
    featured: true,
    approved: true,
  },
  {
    id: 'kfar-tikva-names',
    title: 'כלי החלפת שמות',
    client: 'כפר תקווה',
    kind: 'client',
    tags: ['כלי AI', 'פרטיות', 'עיבוד מקומי'],
    summary:
      'מוצר טכנולוגי אמיתי להחלפת שמות במסמכים, עם עיבוד מקומי בלבד — שום נתון לא עוזב את המחשב.',
    image: null, // TODO: סקרינשוט
    imageAlt: 'ממשק כלי החלפת השמות של כפר תקווה',
    href: null,
    featured: true,
    approved: false, // TODO: אישור בוואטסאפ
  },
  {
    id: 'carmel-magazine',
    title: 'מגזין חודשי אינטראקטיבי',
    client: 'כרמל',
    kind: 'client',
    tags: ['עיצוב', 'אינטראקטיבי', 'תוכן'],
    summary:
      'מגזין דיגיטלי חודשי עם ניווט אינטראקטיבי — שילוב של עיצוב מוקפד וחוויית קריאה.',
    image: null, // TODO: סקרינשוט
    imageAlt: 'עמודי המגזין האינטראקטיבי של כרמל',
    href: null,
    featured: true,
    approved: false, // TODO: אישור בוואטסאפ
  },

  {
    id: 'alumot-beomer',
    title: 'אתר עמותת אלומות בעומר',
    client: 'עמותת אלומות בעומר',
    kind: 'client',
    tags: ['אתר', 'עמותה'],
    summary: 'אתר תדמית לעמותה.',
    image: null,
    imageAlt: 'עמוד הבית של אתר עמותת אלומות בעומר',
    href: null, // TODO: לאמת שהאתר עדיין חי ולהוסיף קישור
    featured: false,
    approved: false,
  },
  {
    id: 'music-teacher',
    title: 'אתר תדמית למורה לנגינה',
    client: null, // TODO: להשלים שם לקוח, או להשאיר null ולהציג בלי שם
    kind: 'client',
    tags: ['אתר', 'תדמית'],
    summary: 'אתר תדמית אישי עם עמוד שיעורים וטופס הרשמה.',
    image: null,
    imageAlt: 'עמוד הבית של אתר התדמית למורה לנגינה',
    href: null,
    featured: false,
    approved: false,
  },

  /*
   * TODO: 10 הפרויקטים הנותרים (2 לקוחות אמיתיים + 8 דמו אישי/AI).
   * להעתיק את מבנה הרשומה למעלה.
   */
]

/** רק פרויקטים שאושרו להצגה פומבית עולים לאוויר */
export const visibleProjects = projects.filter((p) => p.approved)

export const featuredProjects = visibleProjects.filter((p) => p.featured)

/** כל התגיות הקיימות, לסינון בגריד */
export const allTags = Array.from(
  new Set(visibleProjects.flatMap((p) => p.tags))
).sort()
