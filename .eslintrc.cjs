/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  overrides: [
    {
      files: ['*.astro'],
      env: {
        browser: true,
        node: true,
        es2022: true,
      },
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:astro/recommended',
        'prettier',
      ],
      plugins: ['@typescript-eslint', 'astro'],
      parser: 'astro-eslint-parser',
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
        sourceType: 'module',
        ecmaVersion: 'latest',
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.astro'],
      },
    },
    {
      files: ['*.ts', '*.tsx'],
      env: {
        browser: true,
        node: true,
        es2022: true,
      },
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'prettier',
      ],
      plugins: ['@typescript-eslint'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
        sourceType: 'module',
        ecmaVersion: 'latest',
      },
    },
    {
      files: ['*.mjs'],
      env: {
        node: true,
      },
      extends: ['eslint:recommended', 'prettier'],
      parserOptions: {
        sourceType: 'module',
        ecmaVersion: 2015,
      },
    },
    {
      files: ['*.cjs'],
      env: {
        node: true,
      },
      extends: ['eslint:recommended', 'prettier'],
      parserOptions: {
        sourceType: 'script',
        ecmaVersion: 2015,
      },
    },
  ],
};
