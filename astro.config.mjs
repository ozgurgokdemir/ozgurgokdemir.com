import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import image from '@astrojs/image';
import icon from 'astro-icon';

export default defineConfig({
  integrations: [
    tailwind({
      config: {
        applyBaseStyles: false,
      },
    }),
    image({
      serviceEntryPoint: '@astrojs/image/sharp',
    }),
    icon({
      include: {
        heroicons: ['*'],
        'simple-icons': ['*'],
      },
    }),
  ],
});
