import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Manrope', ...defaultTheme.fontFamily.sans],
      },
      screens: {
        '2xl': undefined,
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          md: '2.5rem',
        },
      },
    },
  },
  plugins: [],
};
