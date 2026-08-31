import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'deep-black': '#0a0a0a',
        'graphite': '#1a1a1a',
        'dark-charcoal': '#2d2d2d',
        'warm-white': '#f5f0e8',
        'soft-amber': '#d4a574',
        'luxury-red': '#c41e3a',
        'premium-gold': '#c9a227',
      },
      fontFamily: {
        'display': ['var(--font-display)', 'Poppins', 'system-ui', 'sans-serif'],
        'body': ['var(--font-body)', 'Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['4.5rem', { lineHeight: '1.05', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-lg': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-md': ['2.5rem', { lineHeight: '1.15', letterSpacing: '-0.01em', fontWeight: '600' }],
        'display-sm': ['1.75rem', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '600' }],
      },
      animation: {
        'breathe-slow': 'breathe-slow 6s ease-in-out infinite',
        'breathe-medium': 'breathe-medium 8s ease-in-out infinite',
        'float-gentle': 'float-gentle 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 4s ease-in-out infinite',
        'shimmer': 'shimmer 12s ease-in-out infinite',
        'grain': 'grain 0.5s steps(1) infinite',
        'shimmer-line': 'shimmer-line 2s ease-in-out infinite',
      },
      transitionTimingFunction: {
        'premium': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      backdropBlur: {
        '3xl': '64px',
      },
    },
  },
  plugins: [],
}
export default config
