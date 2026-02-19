import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'neon-indigo': '#6366f1',
        'cyber-mint': '#06b6d4',
        'bg-primary': '#0f0f1a',
        'bg-secondary': '#16162a',
        'bg-tertiary': '#1e1e35',
        'bg-card': '#252540',
        'nx-border': '#2a2a4a',
        'text-primary': '#e8e8f0',
        'text-secondary': '#9898b8',
      },
      animation: {
        'gradient': 'gradient 8s ease infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
  plugins: [],
}
export default config
