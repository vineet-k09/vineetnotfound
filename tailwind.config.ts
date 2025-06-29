import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
        colors: {
            bg: 'var(--bg)',
            text: 'var(--text)',
            accent: 'var(--accent)',
        }
    },
  },
  plugins: [],
}

export default config