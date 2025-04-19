/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './app/**/*.{js,ts,jsx,tsx}',
      './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
      extend: {
        fontFamily: {
          'press-start': ['Press Start 2P', 'monospace'], // Pastikan font-nya sesuai dengan nama import dari `next/font/google`
        },
      },
    },
    plugins: [],
  }
  