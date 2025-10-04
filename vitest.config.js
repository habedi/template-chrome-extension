import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        // Use jsdom to simulate a browser environment for our tests.
        environment: 'jsdom',
        include: ['src/**/*.test.ts']
    },
});
