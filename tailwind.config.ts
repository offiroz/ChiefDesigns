import type { Config } from 'tailwindcss'

/**
 * Chief Designs — טוקני צבע
 *
 * הפלטה מפוצלת לשניים, לפי החלטת שלב 1 בתכנית העבודה:
 *
 *   surface.*  — צבעי שטח. רקעים, גרדיאנטים, אלמנטים דקורטיביים. אסור כטקסט.
 *   ink.*      — צבעי טקסט. כל אחד נבדק מול WCAG AA ועובר.
 *
 * כלל הברזל: surface.fuchsia לעולם לא כטקסט (3.51:1 על לבן, 3.20:1 על נייבי).
 * לטקסט/לינק/CTA בפוקסיה משתמשים ב-ink.fuchsia.
 */

const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        // ---- צבעי שטח (לא טקסט) ----
        surface: {
          fuchsia: '#E75480',       // ראשי — רקעים וגרדיאנטים
          'fuchsia-deep': '#DE4F6E', // סוף גרדיאנט בלבד
          orange: '#FE9920',
          teal: '#00D9C0',
          navy: '#273E47',
          white: '#FFFFFF',
        },

        // ---- צבעי טקסט (נבדקו מול WCAG AA) ----
        ink: {
          fuchsia: '#A82A4C',  // 6.77:1 על לבן
          teal: '#00706A',     // 5.96:1 על לבן
          orange: '#A85E00',   // 4.92:1 על לבן
          navy: '#273E47',     // 11.25:1 על לבן
          muted: '#4A5C66',    //  7.2:1 על לבן — טקסט משני
        },

        // ---- טקסט על רקע נייבי ----
        'on-dark': {
          fuchsia: '#FF9EB5',  // 5.79:1 על נייבי
          teal: '#00D9C0',     // 6.26:1 על נייבי
          orange: '#FE9920',   // 5.25:1 על נייבי
          base: '#FFFFFF',     // 11.25:1 על נייבי
          muted: '#B8C4CA',    //  7.4:1 על נייבי
        },

        // ---- גשר ל-shadcn/ui ----
        // מאפשר להריץ `npx shadcn-ui@latest init` בהמשך בלי לשבור כלום.
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
      },

      fontFamily: {
        // שם הסטודיו בלבד
        logo: ['var(--font-frank)', 'serif'],
        // כותרות
        display: ['var(--font-rubik)', 'system-ui', 'sans-serif'],
        // טקסט גוף
        sans: ['var(--font-heebo)', 'system-ui', 'sans-serif'],
      },

      backgroundImage: {
        'brand-gradient':
          'linear-gradient(135deg, #E75480 0%, #DE4F6E 100%)',
        'brand-gradient-soft':
          'linear-gradient(135deg, rgba(231,84,128,0.12) 0%, rgba(0,217,192,0.12) 100%)',
      },

      borderRadius: {
        lg: '0.75rem',
        xl: '1rem',
        '2xl': '1.5rem',
      },

      maxWidth: {
        content: '1200px',
      },

      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.5s ease-out both',
      },
    },
  },
  plugins: [],
}

export default config
