/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        red: '#BE3D2A',
        orange: '#E78B48'
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}