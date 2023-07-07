import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

const CREATE_ACCOUNT_URL = "market/signup.asp";

Given("I visit tutorialpoint create account page", () => {
  cy.visit(CREATE_ACCOUNT_URL);
});

When("I create an account", () => {
  const name = Cypress.env("NAME")
  const email = Cypress.env("EMAIL");
  const password = Cypress.env("PASSWORD");
  const phone = Cypress.env("PHONE")
  const otp = Cypress.env("OTP")
  const baseUrl = Cypress.config("baseUrl")

  cy.get("#textRegName").type(name);
  cy.get("#phone").type(phone);
  cy.get("#textSRegEmail").type(email)
  cy.get("#user_password").type(password)

  cy.fixture('sendOtpResponse.json').then(sendOtpResponse => {
    cy.intercept(`${baseUrl}/market/sendMobileVerificationOtp.php`, sendOtpResponse)
  })
  
  cy.get("#validate_mobile_number").click()
  cy.get("#txtValidateMobileOTP").should('be.visible').type(otp)

  cy.fixture('validateOtpResponse.json').then(validateOtpResponse => {
    cy.intercept(`${baseUrl}/market/validateEmailPhoneOTP.php`, validateOtpResponse)
  })
  cy.get("#validateMobileOtp").click()

  cy.intercept(`${baseUrl}/market/register.php`, { statusCode: 200, body: { url: '/index.htm' } })
  cy.get("#signUpNew").click()
});

Then("I should see the index page", () => {
  cy.url().should("contain", "index")
});