const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://www.arkadium.com',
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 60000,
    video: true,
    screenshotOnRunFailure: true,
    setupNodeEvents(on, config) {
      // place for reporters/plugins if needed
      return config;
    },
  },
});
