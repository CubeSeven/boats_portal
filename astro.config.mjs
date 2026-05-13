// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import keystatic from '@keystatic/astro';
import node from '@astrojs/node';

export default defineConfig({
  site: 'https://skiathosboats.com',
  output: 'static',
  adapter: node({
    mode: 'standalone'
  }),
  integrations: [
    react(),
    sitemap(),
    keystatic(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});