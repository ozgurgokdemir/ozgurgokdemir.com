/** @type {import("prettier").Config} */
module.exports = {
  singleQuote: true,
  astroAllowShorthand: true,
  pluginSearchDirs: false,
  plugins: [
    require.resolve('prettier-plugin-astro'),
    require.resolve('prettier-plugin-tailwindcss'),
  ],
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro',
      },
    },
  ],
};
