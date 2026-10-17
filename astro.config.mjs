// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  adapter: cloudflare({
    imageService: 'compile',
  }),
  build: {
    inlineStylesheets: 'always',
  },
  fonts: [
    {
      provider: fontProviders.local(),
      name: 'Manrope',
      cssVariable: '--font-manrope',
      options: {
        variants: [
          {
            src: ['./src/assets/fonts/manrope.woff2'],
            weight: '200 800',
            style: 'normal',
            display: 'swap',
          },
        ],
      },
    },
  ],
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
  site: 'https://ozgurgokdemir.com',
});
