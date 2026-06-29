/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["CalibriCustom", "var(--font-inter)", "sans-serif"],
        serif: ["CalibriCustom", "serif"],
        calibri: ["CalibriCustom", "sans-serif"],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};