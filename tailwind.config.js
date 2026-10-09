/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Cinzel', 'serif'],
        'serif-vintage': ['Cormorant Garamond', 'serif'],
        body: ['Crimson Text', 'serif'],
        hand: ['Caveat', 'cursive'],
      },
      colors: {
        vintage: {
          bg: '#2a1f17',
          'bg-dark': '#1a1208',
          paper: '#f4e8d0',
          'paper-dark': '#e8d9b8',
          ink: '#3d2b1f',
          gold: '#c9a84c',
          'gold-dark': '#a88a2e',
          crimson: '#8b3a3a',
          sepia: '#8b7355',
          cream: '#faf3e0',
        },
      },
    },
  },
  plugins: [],
};
