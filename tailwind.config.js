/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  important: true,
  theme: {
    extend: {},
    fontSize: {
      '2x': '10px',
      xsm: '12px',
      sm: '13px',
      reg: '15px',
      md: '15px',
      lg: '18px',
      '2xl': '22px',
      '3xl': '25px',
      '4xl': '32px',
      '5xl': '40px',
      '6xl': '50px',
      '7xl': '70px',
    },
  },
  plugins: [],
};
