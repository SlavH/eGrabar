/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-antique)", "var(--font-inter)", "sans-serif"],
        serif: ["var(--font-antique)", "serif"],
        antique: ["var(--font-antique)", "serif"],
      },
    },
  },
  plugins: [],
};