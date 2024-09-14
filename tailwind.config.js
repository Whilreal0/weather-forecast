/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'selector',
  theme: {
    extend: {
      backgroundImage: {
        'day': "url('@/assets/Icons/Day.png')", // Adjusted path
        'night': "url('@/assets/Icons/Night.png')", // Adjusted path
      }
    },
  },
  plugins: [],
}

