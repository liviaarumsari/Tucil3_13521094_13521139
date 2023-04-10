/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      sans: ['Poppins', 'sans-serif'],
    },
    colors: {
      'light-primary': '#f7f6f9',
      'light-secondary': '#eceef0',
      'main-primary': '#75d7a1',
      'main-secondary': '#5cc48a',
      'dark-primary': '#181c1d',
      'dark-secondary': '#2a2a2a',
    },
  },
  plugins: [],
}

