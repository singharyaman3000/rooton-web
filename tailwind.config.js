/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      'xs': '320px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
    },
    fontFamily:{
      jakartaSans: ['var(--jakarta-sans)'],
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'credibility-grid': "url('/images/homePage/credibilityBgGrid.png')"
      },
      colors: {
        'font-color-orange': 'var(--font-color-orange)',
        'font-color-light-gray': 'var(--font-color-light-gray)',
        'primary': 'var(--primary-bg)',
        'primary-font-color': 'var(--primary-font-color)',
        'toggle-dark-bg': 'var(--toggle-dark-bg)',
        'tansparent-bg': 'var(--tansparent-bg)',
        'header-font-color': 'var(--header-font-color)',
        'header-font-color-scrolled-enough': 'var(--header-font-color-scrolled-enough)',
        'primary-border': 'var(--primary-border)',
        'secondary-border': 'var(--secondary-border)',
        'cicc-border': 'var(--cicc-border)',
        'capic-border': 'var(--capic-border)',
        'grey' : 'var(--grey)',
        'golden-yellow': 'var(--golden-yellow)',
        'primary-text': 'var(--primary-text)',
        'primary-white':'var(--primary-white)',
        'deep-yellow': 'var(--deep-yellow)',
        'secondary-grey' : 'var(--secondary-grey)',
        'primary-black' : 'var(--primary-black)',
        'pale-yellow':'var(--pale-yellow)'
      },
      fontFamily : {
        "jakarta" : ["var(--font-jakarta)"],
      }
    },
  },
  plugins: [
    plugin((function({matchUtilities}){
      matchUtilities({
        'square':(value)=>{
          return {
            width : value,
            height : value
          }
        }
      })
    }))
  ],
};

