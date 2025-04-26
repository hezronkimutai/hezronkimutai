/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'primary': '#102E50',
        'gold': '#F5C45E',
        'orange': '#E78B48',
        'red': '#BE3D2A'
      },
      backgroundColor: {
        'primary': '#102E50',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}