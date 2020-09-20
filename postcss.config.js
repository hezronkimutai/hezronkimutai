/* eslint-disable global-require */
const tailwindcss = require('tailwindcss');

module.exports = {
  plugins: [
    'postcss-preset-env',
    tailwindcss('./tailwind.config.js'),
    require('autoprefixer'),
  ],
};