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
      backgroundImage: {
        'gradient-radial-to-b':
          'radial-gradient(circle at top, var(--tw-gradient-stops))',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
};
