/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}", // Ensure Tailwind scans all relevant files
  ],
  theme: {
    extend: {},
  },
  plugins: [],
});
