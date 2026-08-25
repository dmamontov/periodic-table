import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Unfonts from 'unplugin-fonts/vite';
import { VitePWA } from 'vite-plugin-pwa';
import { collectionName, siteTitle } from './src/data/collection';
import { resolveLocalizedLabel } from './src/utils/localizedLabel';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'favicon.svg',
        'apple-touch-icon.png',
        'pwa-192.png',
        'pwa-512.png',
        'collection-spectra/**/*.xml',
      ],
      manifest: {
        name: resolveLocalizedLabel(siteTitle, 'ru'),
        short_name: resolveLocalizedLabel(collectionName, 'ru'),
        description: 'Интерактивная периодическая таблица с коллекцией элементов',
        lang: 'ru',
        theme_color: '#1a1a1a',
        background_color: '#1a1a1a',
        display: 'standalone',
        orientation: 'any',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: 'pwa-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'pwa-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
          {
            src: 'favicon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,gif,jpg,jpeg,xml,woff,woff2,webmanifest}'],
        navigateFallback: '/index.html',
        cleanupOutdatedCaches: true,
        skipWaiting: true,
        clientsClaim: true,
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
      },
      devOptions: {
        enabled: false,
      },
    }),
    Unfonts({
      fontsource: {
        families: [
          {
            name: 'PT Sans',
            weights: [400, 700],
            styles: ['normal'],
            subset: 'cyrillic',
          },
          {
            name: 'PT Sans',
            weights: [400, 700],
            styles: ['normal'],
            subset: 'latin',
          },
        ],
      },
    }),
  ],
});
