# Arkadium – Cypress Javascript Automated testing

This project contains automated end-to-end tests for selected UI flows on  
[https://www.arkadium.com](https://www.arkadium.com) using **Cypress** and **JavaScript**.

The tests cover the three scenarios requested in the assignment
---

## 1. Prerequisites

Before running the tests, make sure you have:

Node.js
  Check with:
  ```bash
  node -v
  npm -v
```
If you don’t have Node.js, download and install it from the official Node.js website.

Git installed (for cloning the repository):

  ```bash
  git --version
 ```
You do not need to install Cypress globally. It is installed locally via npm install inside this project.

## 2. Cloning the repository
Open a terminal / PowerShell.

Clone the GitHub repository:

```bash
git clone https://github.com/bichler-victor/Arkadium.git
```
Move into the project folder:

```bash
cd Arkadium
```
## 3. Installing dependencies
From inside the Arkadium folder, install the project dependencies:

```bash
npm install
```
This will:

Install Cypress as a local dev dependency.

Install all other required JavaScript packages defined in package.json.

You only need to run npm install once on a fresh clone (or again if dependencies change).

## 5. Running the tests
You can run the tests in interactive mode (Cypress GUI) or headless mode (via CLI).

5.1. Run Cypress in interactive mode (GUI)
From the project root (Arkadium folder):

```bash
npx cypress open
```
Then:

In the Cypress window, choose E2E Testing.

Select your browser (e.g., Chrome).

Click on the spec file: arkadium.cy.js.

Cypress will run the tests.

5.2. Run Cypress in headless mode (CLI)
To run the same tests without opening the Cypress GUI:

```bash
npx cypress run --spec "cypress/e2e/arkadium.cy.js"
```
