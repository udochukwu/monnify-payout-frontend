/** @type {import('tailwindcss').Config} */

export default {
  content: ['./src/**/*.{mjs,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        urbanist: ['"Urbanist"']
      },
      colors: {
        dark: '#1D1E24'
      }
    }
  },
  darkMode: 'class',
  plugins: []
}
