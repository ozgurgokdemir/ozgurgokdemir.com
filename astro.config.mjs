// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import cloudflare from '@astrojs/cloudflare';
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  output: 'hybrid',
  adapter: cloudflare({
    platformProxy: {
      enabled: true,
    },
  }),
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    icon({
      include: {
        heroicons: ['*'],
        'simple-icons': ['*'],
        'fa6-brands': ['*'],
      },
    }),
    sitemap(),
  ],
  site: 'https://ozgurgokdemir.com',
});
