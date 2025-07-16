/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  extend: {
    colors: {
      sakura: "#FAD9E6", // Accent pink
    },
    fontFamily: {
        mincho: ['YuMincho', 'serif'],
  },
},
  plugins: [],
}
}
