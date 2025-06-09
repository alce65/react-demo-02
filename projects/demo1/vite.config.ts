import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    test: {
        environment: 'jsdom',
        include: ['**/*.test.ts', '**/*.test.tsx'],
        globals: true,
        coverage: {
            include: ['src/**/*.ts'],
            exclude: ['src/index.ts', 'src/**/types/*.ts'],
        },
    },
});
