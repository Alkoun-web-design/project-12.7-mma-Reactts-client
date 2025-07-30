/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f5f2',
          100: '#cceae6',
          200: '#99d5cc',
          300: '#66c0b3',
          400: '#33ab99',
          500: '#19A28D', // Main brand color
          600: '#148271',
          700: '#0f6154',
          800: '#0a4138',
          900: '#05201c',
        },
        secondary: {
          50: '#f2f9f8',
          100: '#e5f2f0',
          200: '#cce6e2',
          300: '#b2d9d3',
          400: '#99ccc5',
          500: '#7fbfb6',
          600: '#66b3a8',
          700: '#4c8679',
          800: '#33594f',
          900: '#192d26',
        },
        accent: {
          50: '#fff9eb',
          100: '#fef3d7',
          200: '#fde7af',
          300: '#fbdb87',
          400: '#facf5f',
          500: '#f9c337',
          600: '#c79c2c',
          700: '#957521',
          800: '#644e16',
          900: '#32270b',
        }
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      spacing: {
        '128': '32rem',
      }
    },
  },
  plugins: [],
};