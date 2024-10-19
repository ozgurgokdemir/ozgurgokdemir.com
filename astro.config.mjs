// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  output: 'hybrid',
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
  ],
});
