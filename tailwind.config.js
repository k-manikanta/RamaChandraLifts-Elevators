/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./services.html",
    "./about.html",
    "./contact.html",
    "./js/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          dark: '#0a1628',
          surface: '#111d32',
          border: '#1e3a5f',
        },
        text: {
          primary: '#f0e6d3',
          secondary: '#a0b4c8',
        },
        accent: {
          gold: '#d4a853',
          'gold-light': '#e0b96a',
        },
      },
      fontFamily: {
        heading: ['Playfair Display', 'serif'],
        body: ['DM Sans', 'sans-serif'],
      },
      animation: {
        'fade-up': 'fadeUp 0.7s ease forwards',
      },
      keyframes: {
        fadeUp: {
          from: {
            opacity: '0',
            transform: 'translateY(30px)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
    },
  },
  plugins: [],
}
