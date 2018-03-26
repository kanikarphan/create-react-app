Feature: Searching for React on GitHub

  I want to find React repository on GitHub

  Scenario: Searching for React on GitHub
    Given I open the GitHub page
    When I am typing my search request "React" on GitHub
    Then I am pressing enter key on GitHub
    Then I should see that the first GitHub's result is facebook/react