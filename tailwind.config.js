/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      'xs': '320px',
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
      },
      colors: {
        'font-color-orange': 'var(--font-color-orange)',
        'primary': 'var(--primary-bg)',
        'primary-font-color': 'var(--primary-font-color)',
        'toggle-dark-bg': 'var(--toggle-dark-bg)',
        'tansparent-bg': 'var(--tansparent-bg)',
        'header-font-color': 'var(--header-font-color)',
        'header-font-color-scrolled-enough': 'var(--header-font-color-scrolled-enough)',
        'primary-border': 'var(--primary-border)',
        'secondary-border': 'var(--secondary-border)',
      },
    },
  },
  plugins: [],
};
