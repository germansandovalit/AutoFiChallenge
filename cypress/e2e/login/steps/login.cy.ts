import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

const LOGIN_PAGE_URL = "login.asp";

Given("I visit tutorialpoint login page", () => {
  cy.visit(LOGIN_PAGE_URL);
});

When("I login using valid credentials", () => {
  const username = Cypress.env("USERNAME");
  const password = Cypress.env("PASSWORD");

  cy.get("#user_email").type(username);
  cy.get("#user_password").type(password);
  cy.get("#user_login").click();
});

Then("I should see the home page", () => {
  cy.url().should("contain", "student/dashboard")
});