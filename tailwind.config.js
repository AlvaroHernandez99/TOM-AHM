/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'custom': ['Custom Font', 'sans-serif']
      }
    }
  },
  plugins: [],
}
