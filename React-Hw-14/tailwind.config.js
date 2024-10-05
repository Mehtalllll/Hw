/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    backgroundSize:{
      'card':"50px"
    },
    backgroundImage:{
      'cloock':"url('src/assets/clock-svgrepo-com.svg')"
    },
    boxShadow: {
      '3xl': '0  0 100px 20px rgba(233, 213, 255, 0.5)',
      '3xln': 'inset 0 0 50px 5px rgba(233, 213, 255, 0.2)',
    }
  },
  plugins: [],
}

