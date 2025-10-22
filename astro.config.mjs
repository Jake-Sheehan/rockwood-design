// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

import sanity from '@sanity/astro';

import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  integrations: [
      react(),
      sanity({
          projectId: 'yva6eoay',
          dataset: 'production',
          useCdn: false,
          studioBasePath: '/admin',
      }),
  ],

  adapter: cloudflare(),
});