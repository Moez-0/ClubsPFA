/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      
    colors: {
      'darky':"#1C2434",
      'grayBlu' : '#F1F5F9',
      'darkBlu' : '#111827',
      'teeth':'#F9FAFE',
      'brick':'#434343',
      'ocean-blue': {
        100 : '#0069FF',
        200 : '#B3E0FF',
        300 : '#80CAFF',
        400 : '#4DB4FF',
        500 : '#1A9EFF',
        600 : '#007ACC',
        700 : '#005999',
        800 : '#003366',
        900 : '#001133',
      },

    },
    fontFamily: {
      'Jockey': ['Jockey One', 'sans-serif'],
      'Roboto': ['Roboto', 'sans-serif'],
    },
    },
  },
  plugins: [],
}