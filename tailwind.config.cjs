/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        alice: ["Alice", "serif"],
        fraunces: ["Fraunces", "serif"],
      },
    },
  },
  plugins: [],
}
