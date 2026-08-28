import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  define: {
    __APP_VERSION__: JSON.stringify('test'),
  },
  plugins: [vue()],
  test: {
    environment: 'jsdom',
    environmentOptions: {
      jsdom: {
        url: 'http://localhost/',
      },
    },
    include: ['tests/**/*.test.ts'],
    setupFiles: ['./tests/setup.ts'],
    coverage: {
      provider: 'v8',
      include: [
        'src/utils/**/*.ts',
        'src/composables/**/*.ts',
        'src/components/common/**/*.vue',
        'src/components/layout/**/*.vue',
        'src/components/table/**/*.vue',
        'src/components/element/**/*.vue',
        'src/components/collection/**/*.vue',
      ],
      thresholds: {
        lines: 100,
        statements: 100,
        functions: 100,
        branches: 100,
      },
    },
  },
});
