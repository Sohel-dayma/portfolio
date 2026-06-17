/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        head: ['poppins', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      colors: {
        bg:     '#080e1a',
        bg2:    '#0d1626',
        card:   '#101c2e',
        cyan:   '#00d4ff',
        cyan2:  '#0099bb',
        muted:  '#8a9bb5',
        border: '#1a2d46',
      },
    },
  },
  plugins: [],
}
