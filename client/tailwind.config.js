/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ds: {
          page:        '#0A0A0A',
          surface:     '#1a1a1a',
          elevated:    '#1E1E1E',
          btn:         '#3A3A3A',
          'btn-hover': '#555555',
          border:      '#a3a2a3',
          muted:       '#5c5e61',
        }
      }
    },
  },
  plugins: [],
};

