/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-googlesans)", "var(--font-inter)", "sans-serif"],
        serif: ["var(--font-googlesans)", "serif"],
        googlesans: ["var(--font-googlesans)", "sans-serif"],
      },
    },
  },
  plugins: [],
};