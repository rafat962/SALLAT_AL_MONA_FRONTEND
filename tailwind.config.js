/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '790px',
      lg: '1000px',
      xl: '1440px',
    },
    extend: {
      fontFamily:{
        sans:'El Messiri',
        sec:'Poppins'
      },
      colors:{
        prim:'rgb(31, 84, 63)',
        sec:'#436850',
        thr:'#DBE7C9',
        for:'#ADBC9F'
      }
    },
  },
  plugins: [],
}
