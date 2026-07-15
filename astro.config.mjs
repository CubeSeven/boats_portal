// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

const IS_GITHUB_PAGES = process.env.GITHUB_PAGES === 'true';

export default defineConfig({
  site: IS_GITHUB_PAGES ? 'https://cubeseven.github.io' : 'https://skiathosboats.com',
  base: IS_GITHUB_PAGES ? '/boats_portal' : '',
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
