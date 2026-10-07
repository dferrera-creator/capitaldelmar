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
        ink: {
          50: '#f0f4f8',
          100: '#d9e2ec',
          200: '#bcccdc',
          300: '#9fb3c8',
          400: '#829ab1',
          500: '#627d98',
          600: '#486581',
          700: '#334e68',
          800: '#243b53',
          900: '#102a43',
          DEFAULT: '#0d2137',
        },
        sand: {
          50: '#fefdf8',
          100: '#fdf8ed',
          200: '#f9f0d9',
          300: '#f3e4b8',
          400: '#ebd48e',
          500: '#dfc066',
          DEFAULT: '#f9f0d9',
        },
        accent: {
          50: '#fff8eb',
          100: '#feefc3',
          200: '#fddd8a',
          300: '#fcc848',
          400: '#fbba25',
          DEFAULT: '#e89b0a',
          600: '#c67d07',
          700: '#a05e06',
          800: '#7d4a0a',
          900: '#683d0d',
        },
        risk: '#c0392b',
      },
      fontFamily: {
        serif: ['var(--font-fraunces)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
