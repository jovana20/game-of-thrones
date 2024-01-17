import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4200', // Replace with the URL where your app runs
    setupNodeEvents(on, config) {
      // Implement node event listeners here if needed
    },
  },
});
