import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Brand palette — defined as CSS variables in src/styles/globals.css
        // (single source of truth). `<alpha-value>` keeps opacity modifiers
        // like `text-cream/70` and `ring-ink/10` working.
        // `ink` = primary dark petrol, `champagne` = cream (used instead of white)
        ink: {
          DEFAULT: 'rgb(var(--ink) / <alpha-value>)',
          950: 'rgb(var(--ink-950) / <alpha-value>)',
          900: 'rgb(var(--ink-900) / <alpha-value>)',
          800: 'rgb(var(--ink-800) / <alpha-value>)',
          700: 'rgb(var(--ink-700) / <alpha-value>)',
          600: 'rgb(var(--ink-600) / <alpha-value>)',
        },
        gold: {
          DEFAULT: 'rgb(var(--gold) / <alpha-value>)',
          light: 'rgb(var(--gold-light) / <alpha-value>)',
          dark: 'rgb(var(--gold-dark) / <alpha-value>)',
        },
        maroon: {
          DEFAULT: 'rgb(var(--maroon) / <alpha-value>)',
          light: 'rgb(var(--maroon-light) / <alpha-value>)',
          dark: 'rgb(var(--maroon-dark) / <alpha-value>)',
        },
        champagne: 'rgb(var(--cream) / <alpha-value>)',
        cream: 'rgb(var(--cream) / <alpha-value>)',
        // Semantic brand palette
        primary: 'rgb(var(--primary) / <alpha-value>)',
        secondary: 'rgb(var(--secondary) / <alpha-value>)',
        tertiary: 'rgb(var(--tertiary) / <alpha-value>)',
        quaternary: 'rgb(var(--quaternary) / <alpha-value>)',
      },
      fontFamily: {
        // Google Sans Flex (--font-brand) is the global default everywhere;
        // Inter is only a fallback. `serif`/`heading` are brand aliases.
        sans: ['var(--font-brand)', 'var(--font-inter)', 'system-ui', 'sans-serif'],
        brand: ['var(--font-brand)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-brand)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-brand)', 'system-ui', 'sans-serif'],
      },
      fontWeight: {
        // Brand weight scale — backed by --brand-font-* CSS vars (single source).
        // Usage: font-brand-light, font-brand-medium, font-brand-semibold, ...
        'brand-thin': 'var(--brand-font-thin)',
        'brand-extralight': 'var(--brand-font-extralight)',
        'brand-light': 'var(--brand-font-light)',
        'brand-normal': 'var(--brand-font-normal)',
        'brand-medium': 'var(--brand-font-medium)',
        'brand-semibold': 'var(--brand-font-semibold)',
        'brand-bold': 'var(--brand-font-bold)',
        'brand-extrabold': 'var(--brand-font-extrabold)',
        'brand-black': 'var(--brand-font-black)',
      },
      boxShadow: {
        glow: '0 0 40px -10px rgba(168, 139, 88, 0.45)',
        'glow-lg': '0 0 80px -20px rgba(168, 139, 88, 0.55)',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(120deg, #c9b487 0%, #A88B58 50%, #8a7044 100%)',
        'radial-glow': 'radial-gradient(circle at 50% 0%, rgba(168,139,88,0.18), transparent 60%)',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'pulse-slow': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
      },
      animation: {
        shimmer: 'shimmer 3s linear infinite',
        float: 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse-slow 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
