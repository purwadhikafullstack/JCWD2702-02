/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        eggplant: '#704B66',
        hover_eggplant: '#604058',
        ebony: '#101827',
        second_ebony: '#0E1421',
        regent_gray: '#8594A2',
        bouquet: '#B18AA7',
        bombay: '#B7B9BD',
        dove_gray: '#737373',
        concrete: '#F2F2F2',
        mercury: '#E5E5E5',
        google: {
          'text-gray': '#3c4043',
          'button-blue': '#1a73e8',
          'button-blue-hover': '#5195ee',
          'button-dark': '#202124',
          'button-dark-hover': '#555658',
          'button-border-light': '#dadce0',
          'logo-blue': '#4285f4',
          'logo-green': '#34a853',
          'logo-yellow': '#fbbc05',
          'logo-red': '#ea4335',
        },
      },
    },
    screens: {
      mobile: { max: '639px' },
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      xxl: '1536px',
    },
  },
  daisyui: {
    themes: ['light'],
  },
  plugins: [require('daisyui')],
}
