// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Ignore uncaught exceptions from the application under test
// so React runtime errors on Arkadium don't fail our tests.
Cypress.on('uncaught:exception', (err, runnable) => {
  // You could filter here if you only wanted to ignore some errors.
  return false; // returning false prevents Cypress from failing the test
});
