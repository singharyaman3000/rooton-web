/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: { 
        'grey' : 'var(--grey)',
        'golden-yellow': 'var(--golden-yellow)',
        'primary-text': 'var(--primary-text)',
        'primary-white':'var(--primary-white)',
        'deep-yellow': 'var(--deep-yellow)'
      },
      fontFamily : {
        "jakarta" : ["var(--font-jakarta)"],
      }
    },
  },
  plugins: [],
}
