import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
      '@assets': '/src/assets',
      '@context': '/src/context',
      '@core': '/src/core',
      '@home': '/src/features/home',
      '@products': '/src/features/products',
      '@about': '/src/features/about',
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['**/*.test.ts', '**/*.test.tsx'],
    setupFiles: ['src/setupTests.ts'],
    coverage: {
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.ts', 'src/**/*.tsx'],
      exclude: ['src/main.tsx', 'src/**/types/*.ts', 'src/**/*.d.ts'],
    },
  },
});
