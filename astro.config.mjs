// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import keystatic from '@keystatic/astro';

export default defineConfig({
  site: 'https://cubeseven.github.io',
  base: '/boats_portal',
  output: 'static',
  integrations: [
    react(),
    sitemap(),
    keystatic(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});