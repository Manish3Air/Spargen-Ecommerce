/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        neumorphic: "8px 8px 16px #d1d9e6, -8px -8px 16px #ffffff",
      },
    },
  },
  plugins: [],
}
