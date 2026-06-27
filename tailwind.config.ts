// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        pink: {
          soft: '#FFE4EC',
          mid: '#FFB3CB',
          strong: '#FF80A0',
        },
        mint: {
          soft: '#D4F5EC',
          mid: '#A0E8D4',
        },
        purple: {
          soft: '#E8D8F5',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui'],
      },
    },
  },
  plugins: [],
}

export default config
