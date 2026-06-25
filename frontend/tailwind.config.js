/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0A3D62', // Deep Blue
          light: '#1B547F',
          dark: '#05233B',
        },
        secondary: {
          DEFAULT: '#27AE60', // Emerald Green
          light: '#2ECC71',
          dark: '#1E8449',
        },
        accent: {
          DEFAULT: '#F4B400', // Gold
          light: '#FFC107',
          dark: '#D39E00',
        },
        darkBg: '#051827',
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'premium': '0 10px 30px -10px rgba(10, 61, 98, 0.12)',
        'premium-hover': '0 20px 40px -15px rgba(10, 61, 98, 0.2)',
        'glass': '0 8px 32px 0 rgba(10, 61, 98, 0.08)',
      }
    },
  },
  plugins: [],
}
