/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      'xs': '320px',
      'sm': '480px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2k': '2048px',
    },
    fontFamily: {
      jakartaSans: ['var(--jakarta-sans)'],
      jakarta: ['var(--font-jakarta)'],
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'banner-grid-overlay': 'url("/banner-grid-cverlay.svg")',
      },
      colors: {
        'font-color-orange': 'var(--font-color-orange)',
        'primary': 'var(--primary-bg)',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'credibility-grid': 'url(\'/images/homePage/credibilityBgGrid.png\')',
        'font-color-light-gray': 'var(--font-color-light-gray)',
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
        'primary-white': 'var(--primary-white)',
        'deep-yellow': 'var(--deep-yellow)',
        'secondary-grey': 'var(--secondary-grey)',
        'primary-black' : 'var(--primary-black)',
        'pale-yellow':'var(--pale-yellow)',
        'pale-yellow-black':'var(--pale-yellow-black)',
        'faded-black': 'var(--faded-black)',
        'light-brown':'var(--light-brown)',
        'sandal':'var(--sandal)',
        'pale-sandal': 'var(--pale-sandal)',
        'hover-lang-dropdown': 'var(--hover-lang-dropdown)'
      },
      boxShadow: {
        'language-dropdown': 'var(--language-dropdown-shadow)',
        'hubspot-form-shadow': 'var(--hubspot-form-shadow)',
      },
      lineHeight: {
        'primary': '1.71',
        'primary-lg': '1.67',
        'heading': '1.43',
        'heading-lg': '1.42',
      },
      keyframes: {
        slideRtoL: {'100%': {left:0}}
      },
      animation:{
        'slideRToL' : 'slideRtoL 1s ease-in'
      }
    },
  },
  plugins: [
    plugin(({ matchUtilities }) => {
      matchUtilities({
        square: (value) => ({
          width: value,
          height: value,
        }),
      });
    }),
  ],
};
