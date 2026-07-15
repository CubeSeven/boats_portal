// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://skiathosboats.com',
  output: 'static',
  trailingSlash: 'ignore',
  integrations: [
    sitemap(),
  ],
  devToolbar: {
    enabled: false,
  },
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: ['astro/runtime/client/dev-toolbar/entrypoint.js'],
    },
  },
});
