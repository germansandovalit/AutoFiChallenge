/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

declare namespace Cypress {
  interface Node extends HTMLElement {
    href: string
  }
  interface Chainable<Subject = any> {
    visitAndSkipRequests(path: string): Chainable<any>
    saveDataAsJson(data: any): Chainable<any>
  }
}

Cypress.on('uncaught:exception', (err, runnable) => {
  return false
})

Cypress.Commands.add('visitAndSkipRequests', (path: string) => {
  cy.intercept('**', { statusCode: 226 })
  cy.intercept(`${Cypress.config("baseUrl")}/**`, (req) => {
    req.continue()
  })
  cy.visit(path)
})

Cypress.Commands.add('saveDataAsJson', (data: any) => {
  const filename = createFilePath()
  const fullPath = `cypress/downloads/${filename}`
  const jsonData = JSON.stringify(data)
  cy.writeFile(fullPath, jsonData)
})


const createFilePath = () => {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');

  return `data_${hours}${minutes}${seconds}.json`;
}
