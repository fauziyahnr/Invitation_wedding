/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FDFBF7',
          100: '#FAF7F2',
          200: '#F7F4EF',
          300: '#F3ECE0',
          400: '#EBE6DD',
          500: '#E3DCCE',
          600: '#D1C7BD',
          700: '#A69B8D',
          800: '#9E9282',
          900: '#8C8275',
        },
        brown: {
          50: '#FDFBF7',
          100: '#F3ECE0',
          200: '#EDE8DF',
          300: '#E3DCCE',
          400: '#736A5E',
          500: '#5C5549',
          600: '#4E473E',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        bounce: 'bounce 1s infinite',
      },
    },
  },
  plugins: [],
}
