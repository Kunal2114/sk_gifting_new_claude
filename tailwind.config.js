/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: { 950: '#070E19', 900: '#0B1626', 800: '#112239', 700: '#1A3252', 600: '#27456E' },
        gold: { 200: '#F8E7A6', 300: '#F3D56B', 400: '#E8BB2A', 500: '#D9A800', 600: '#B88A00', 700: '#8F6A00' },
        ivory: '#FAF8F3',
        sand: '#EFEBE1',
        ink: '#141B26',
      },
      fontFamily: {
        sans: ['"Inter Variable"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(11,22,38,.06), 0 8px 24px -8px rgba(11,22,38,.14)',
        lift: '0 2px 4px rgba(11,22,38,.08), 0 18px 40px -12px rgba(11,22,38,.28)',
      },
    },
  },
  plugins: [],
};
