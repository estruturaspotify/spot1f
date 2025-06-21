/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'spotify-green': 'var(--spotify-green)',
        'spotify-green-light': 'var(--spotify-green-light)',
      },
      animation: {
        'spin': 'spin 1s linear infinite',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'sound-bar': 'soundBar 1s ease-in-out infinite',
        'pulse-slow': 'pulseSlow 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};