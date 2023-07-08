Feature: Iframes
    Scenario: Iteracting with Iframes page
        Given I visit tutorialpoint iframes page
        When I interact with the About us link
        Then I see the url of the new page
        And I see a list of all URLs on the page
        And I see a list of all buttons on the page
        And I see a list of all text inputs fields on the page
        And I see a file saved with all the extracted data