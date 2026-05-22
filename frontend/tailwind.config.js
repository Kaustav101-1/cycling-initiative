/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          cream:  '#F6F5F2',
          grey:   '#8F8E7F',
          lime:   '#8FB135',
          green:  '#487531',
          dark:   '#1D3215',
        }
      }
    }
  },
  plugins: []
}
