/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'bna-blue': {
          DEFAULT: 'rgb(0 135 171)',
          dark: 'rgb(0 108 137)',
          light: 'rgb(0 162 205)'
        },
        'bna-gray': {
          light: '#f5f6f8',
          DEFAULT: '#e9ecef',
          dark: '#6c757d'
        }
      },
      fontFamily: {
        bna: ['"Trebuchet MS"', 'Arial', 'Helvetica', 'sans-serif'],
      },
    },
  },
  plugins: [],
};