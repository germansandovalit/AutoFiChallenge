import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

const IFRAMES_URL = 'html/html_iframes.htm';
const output = {};

Given('I visit tutorialpoint iframes page', () => {
  cy.visitAndSkipRequests(IFRAMES_URL);
  cy.get('#banner-accept').click()
});

When('I interact with the About us link', () => {
  cy.get('iframe')
    .its('0.contentDocument')
    .its('body')
    .should('be.visible')
    .find('iframe')
    .its('0.contentDocument')
    .its('body')
    .should('be.visible')
    .within(() => {
      cy.get('#banner-accept').click()
      cy.get('footer').find("a[href='/about/index.htm']").invoke('attr', 'href').then(href => {
        cy.visit(href)
      })
    })
});

Then('I see the url of the new page', () => {
  cy.url().then(url => {
    output['url'] = url
    cy.task('stdout', output['url'])
  })
});

Then('I see a list of all URLs on the page', () => {
  cy.get('a').filter("a[href^='http']").then($els => {
    output['urls'] = Array.from($els, el => el.href)
    cy.task('stdout', output['urls'])

  })
});

Then('I see a list of all buttons on the page', () => {
  cy.get('.btn').then($els => {
    output['buttons'] = Array.from($els, el => el.innerText)
    cy.task('stdout', output['buttons'])
  })
});

Then('I see a list of all text inputs fields on the page', () => {
  cy.get('input').then($els => {
    output['textInputs'] = Array.from($els, el => el)
    cy.task('stdout', output['textInputs'])
  })
});

Then('I see a file saved with all the extracted data', () => {
  cy.saveDataAsJson(output)
})

