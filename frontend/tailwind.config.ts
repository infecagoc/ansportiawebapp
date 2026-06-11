import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Brand palette — petrol / maroon / gold / cream
        // `ink` = primary dark petrol, `champagne` = cream (used instead of white)
        ink: {
          DEFAULT: '#0E1D24',
          950: '#081318',
          900: '#0A171C',
          800: '#0E1D24',
          700: '#16303A',
          600: '#1F404C',
        },
        gold: {
          DEFAULT: '#A88B58',
          light: '#c9b487',
          dark: '#8a7044',
        },
        maroon: {
          DEFAULT: '#720E20',
          light: '#9a1a30',
          dark: '#4d0915',
        },
        champagne: '#E8E1D6',
        cream: '#E8E1D6',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
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
