const { fontFamily } = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,astro,ts,tsx}'],
  theme: {
    colors: {
      primary: 'hsl(var(--color-primary) / <alpha-value>)',
      accent: 'hsl(var(--color-accent) / <alpha-value>)',
      neutral: 'hsl(var(--color-neutral) / <alpha-value>)',
      transparent: colors.transparent,
    },
    boxShadow: {
      stroke: 'inset 0 0 0 1px hsl(var(--color-neutral) / 0.1)',
      'stroke-t': 'inset 0 1px 0 0 hsl(var(--color-neutral) / 0.1)',
      'stroke-r': 'inset -1px 0 0 0 hsl(var(--color-neutral) / 0.1)',
      'stroke-b': 'inset 0 -1px 0 0 hsl(var(--color-neutral) / 0.1)',
      'stroke-l': 'inset 1px 0 0 0 hsl(var(--color-neutral) / 0.1)',
      'stroke-2': 'inset 0 0 0 2px hsl(var(--color-neutral) / 0.1)',
      'stroke-t-2': 'inset 0 2px 0 0 hsl(var(--color-neutral) / 0.1)',
      'stroke-r-2': 'inset -2px 0 0 0 hsl(var(--color-neutral) / 0.1)',
      'stroke-b-2': 'inset 0 -2px 0 0 hsl(var(--color-neutral) / 0.1)',
      'stroke-l-2': 'inset 2px 0 0 0 hsl(var(--color-neutral) / 0.1)',
    },
    screens: {
      xs: '480px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1200px',
    },
    container: {
      center: true,
      padding: '2rem',
    },
    fontFamily: {
      primary: ['InterVariable', 'Inter', ...fontFamily.sans],
      secondary: ['Poppins', ...fontFamily.sans],
    },
    fontSize: {
      'heading-display': [
        '5rem',
        {
          lineHeight: '1.25',
          fontWeight: 600,
        },
      ],
      'heading-lg': [
        '3rem',
        {
          lineHeight: '1.25',
          fontWeight: 600,
        },
      ],
      'heading-md': [
        '2.25rem',
        {
          lineHeight: '1.25',
          fontWeight: 600,
        },
      ],
      'heading-sm': [
        '1.5rem',
        {
          lineHeight: '1.25',
          fontWeight: 600,
        },
      ],

      'subheading-display-500': [
        '1.5rem',
        {
          lineHeight: '1.25',
          fontWeight: 500,
        },
      ],
      'subheading-display-600': [
        '1.5rem',
        {
          lineHeight: '1.25',
          fontWeight: 600,
        },
      ],
      'subheading-lg-500': [
        '1.125rem',
        {
          lineHeight: '1.25',
          fontWeight: 500,
        },
      ],
      'subheading-lg-600': [
        '1.125rem',
        {
          lineHeight: '1.25',
          fontWeight: 600,
        },
      ],
      'subheading-base-500': [
        '1rem',
        {
          lineHeight: '1.25',
          fontWeight: 500,
        },
      ],
      'subheading-base-600': [
        '1rem',
        {
          lineHeight: '1.25',
          fontWeight: 600,
        },
      ],
      'subheading-sm-500': [
        '0.875rem',
        {
          lineHeight: '1.25',
          fontWeight: 500,
        },
      ],
      'subheading-sm-600': [
        '0.875rem',
        {
          lineHeight: '1.25',
          fontWeight: 600,
        },
      ],

      'label-xl-500': [
        '1.25rem',
        {
          lineHeight: '1.25',
          fontWeight: 500,
        },
      ],
      'label-xl-600': [
        '1.25rem',
        {
          lineHeight: '1.25',
          fontWeight: 600,
        },
      ],
      'label-lg-500': [
        '1.125rem',
        {
          lineHeight: '1.25',
          fontWeight: 500,
        },
      ],
      'label-lg-600': [
        '1.125rem',
        {
          lineHeight: '1.25',
          fontWeight: 600,
        },
      ],
      'label-base-500': [
        '1rem',
        {
          lineHeight: '1.25',
          fontWeight: 500,
        },
      ],
      'label-base-600': [
        '1rem',
        {
          lineHeight: '1.25',
          fontWeight: 600,
        },
      ],
      'label-sm-500': [
        '0.875rem',
        {
          lineHeight: '1.25',
          fontWeight: 500,
        },
      ],
      'label-sm-600': [
        '0.875rem',
        {
          lineHeight: '1.25',
          fontWeight: 600,
        },
      ],
      'label-xs-500': [
        '0.75rem',
        {
          lineHeight: '1.25',
          fontWeight: 500,
        },
      ],
      'label-xs-600': [
        '0.75rem',
        {
          lineHeight: '1.25',
          fontWeight: 600,
        },
      ],

      'body-xl-400': [
        '1.25rem',
        {
          lineHeight: '1.5',
          fontWeight: 400,
        },
      ],
      'body-xl-500': [
        '1.25rem',
        {
          lineHeight: '1.5',
          fontWeight: 500,
        },
      ],
      'body-lg-400': [
        '1.125rem',
        {
          lineHeight: '1.5',
          fontWeight: 400,
        },
      ],
      'body-lg-500': [
        '1.125rem',
        {
          lineHeight: '1.5',
          fontWeight: 500,
        },
      ],
      'body-base-400': [
        '1rem',
        {
          lineHeight: '1.5',
          fontWeight: 400,
        },
      ],
      'body-base-500': [
        '1rem',
        {
          lineHeight: '1.5',
          fontWeight: 500,
        },
      ],
      'body-sm-400': [
        '0.875rem',
        {
          lineHeight: '1.5',
          fontWeight: 400,
        },
      ],
      'body-sm-500': [
        '0.875rem',
        {
          lineHeight: '1.5',
          fontWeight: 500,
        },
      ],
      'body-xs-400': [
        '0.75rem',
        {
          lineHeight: '1.5',
          fontWeight: 400,
        },
      ],
      'body-xs-500': [
        '0.75rem',
        {
          lineHeight: '1.5',
          fontWeight: 500,
        },
      ],
    },
    extend: {
      backgroundColor: {
        surface: 'hsl(var(--color-neutral) / 0.02)',
      },
      aspectRatio: {
        '4/3': '4 / 3',
      },
    },
  },
  plugins: [],
};
