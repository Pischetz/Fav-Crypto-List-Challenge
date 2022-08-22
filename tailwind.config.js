/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {},
    screens: {
      'xs': {'max': '475px'},
      ...defaultTheme.screens,
    },
  },
  plugins: [],
})
