Feature: Create Account
    Scenario: Create an account
        Given I visit tutorialpoint create account page
        When I create an account
        Then I should see the index page