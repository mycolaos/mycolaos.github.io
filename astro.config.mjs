// @ts-check

import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import partytown from '@astrojs/partytown';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://mycolaos.github.io',
  integrations: [mdx(), sitemap(), partytown({
    // Example: Add dataLayer.push as a forwarding-event.
    config: {
      forward: ['dataLayer.push'],
    },
  })],

  vite: {
    plugins: [tailwindcss()],
  },

  redirects: {
    "/engineering/[...slug]": "/[...slug]"
  }
});