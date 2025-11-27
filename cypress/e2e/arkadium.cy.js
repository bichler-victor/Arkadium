/// <reference types="cypress" />

// Constants

const BASE_URL = 'https://www.arkadium.com/';
const SUPPORT_TILE_SELECTOR = '[data-testid^="support-"]';
const SIDEBAR_SELECTOR = '#nav-sidemenu';
const BEST_HREF = '/free-online-games/best/';
const GRID_CARD_TITLE_SELECTOR = '[data-testid="grid-sc"] [data-testid="card-title"]';

// List of "Best Games"
const BEST_GAME_TITLES = [
  'Arkadium Bubble Shooter',
  'Free Online Bridge',
  'Free Online Daily Crossword Puzzle',
  'Family Feud',
  'Fruit Merge: A Suika Game',
  'Hurdle',
  'Free Mahjong Game',
  'Mahjongg Solitaire',
  'Outspell Spelling Game',
  'Spider Solitaire Game',
  "Stan Newman's Daily Crossword",
  'The Price Is Right Plinko Pegs',
  'Unblock Evolution',
  '8 Ball Pool',
  'Block Champ',
  'Buzzwords: A Spelling Bee Game',
  'Card Sharks',
  'Crystal Collapse',
  'Freecell Solitaire',
  'Jewel Shuffle',
  'Klondike Solitaire',
  'Lumeno',
  'Mahjongg Candy',
  'Mahjongg Dimensions Blue',
  'Mahjong Solitaire 2: Legends Edition',
  'Solitaire Kitchen: Tripeaks Cooking Adventure',
  'Tiles Game Explorer',
];

// Closes the privacy popup if it appears (AGREE button)
function acceptPrivacyIfPresent() {
  cy.log('Checking for privacy popup (AGREE button)');

  cy.get('body').then($body => {
    const hasPrivacy = $body.find('#accept-btn').length > 0;

    if (hasPrivacy) {
      cy.log('Privacy popup found, clicking AGREE');
      cy.get('#accept-btn').click({ force: true });
    } else {
      cy.log('No privacy popup present');
    }
  });
}

// Opens the Support modal from the top bar icon
function openSupportModal() {
  cy.log('Opening Support modal from top bar Support button');

  cy.get('[data-testid="topbar-support-icon"]', { timeout: 20000 })
    .should('be.visible')
    .click({ force: true });

  cy.get(SUPPORT_TILE_SELECTOR, { timeout: 20000 }).should('exist');
}

// Opens the left sidebar menu (hamburger)
function openSidebar() {
  cy.log('Opening sidebar via hamburger icon');

  cy.get('button#sidebarToggle, [data-testid="sidebar-hamburger-icon"]', { timeout: 15000 })
    .filter(':visible')
    .first()
    .should('be.visible')
    .click();

  cy.get(SIDEBAR_SELECTOR, { timeout: 15000 }).should('be.visible');
}

// Types a category into the sidebar search
function searchCategoryInSidebar(category) {
  cy.log(`Searching for category "${category}" in sidebar search`);

  cy.get(`${SIDEBAR_SELECTOR} [data-testid="search-input"]`, { timeout: 15000 })
    .filter(':visible')
    .first()
    .as('sidebarSearch');

  cy.get('@sidebarSearch').click({ force: true });

  cy.get('@sidebarSearch')
    .invoke('val', category)
    .trigger('input')
    .trigger('change');
}

// Clicks the "Best" link from the sidebar
function clickBestFromSidebar() {
  cy.log('Clicking "Best" link in sidebar');

  cy.get(SIDEBAR_SELECTOR, { timeout: 15000 }).within(() => {
    cy.get(`a[href="${BEST_HREF}"]`)
      .filter(':visible')
      .first()
      .click();
  });
}

// Test suite

describe('Arkadium.com – UI Scenarios (Cypress)', () => {
  beforeEach(() => {
    cy.visit(BASE_URL);
    cy.wait(7000); 
    acceptPrivacyIfPresent();
  });

  it('i) Support modal contains required sections', () => {
    openSupportModal();

    cy.contains(SUPPORT_TILE_SELECTOR, 'Chat with us', { timeout: 20000 })
      .should('be.visible');

    cy.contains(SUPPORT_TILE_SELECTOR, 'FAQs', { timeout: 20000 })
      .should('be.visible');

    cy.contains(SUPPORT_TILE_SELECTOR, 'Contact support', { timeout: 20000 })
      .should('be.visible');

    cy.contains(SUPPORT_TILE_SELECTOR, 'WhatsApp', { timeout: 20000 })
      .should('be.visible');
  });

  it('ii) Search lists the chosen game category when typing its name', () => {
    const category = 'Crosswords';

    // Open sidebar and perform search
    openSidebar();
    searchCategoryInSidebar(category);

    cy.contains('a', category, { timeout: 15000 }).should('exist');
  });

  it('iii) Given a list of Best Games, they are all listed after accessing the Best section', () => {
    // 1) Open the sidebar
    openSidebar();

    // 2) Navigate to the Best section
    clickBestFromSidebar();

    // 3) Ensure we navigated to the Best page
    cy.url().should('include', BEST_HREF);

    // 4) Wait for the game grid to load
    cy.get(GRID_CARD_TITLE_SELECTOR, { timeout: 15000 })
      .should('have.length.greaterThan', 0);

    // 5) Assert that each expected Best game title appears in the grid
    BEST_GAME_TITLES.forEach(title => {
      const escaped = title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      cy.contains('[data-testid="card-title"]', new RegExp(escaped, 'i'), { timeout: 15000 })
        .should('exist', `Expected "${title}" to be listed in Best games grid`);
    });
  });
});
