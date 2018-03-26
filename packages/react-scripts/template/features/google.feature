Feature: Searching for React by Google

  I want to find React repository by Google search

  Scenario: Searching for React by Google
    Given I am open Google's search page
    When I am typing my search request "github React" on Google
    Then I press the "enter" key on Google
    Then I should see that the first Google's result is "GitHub - facebook/react:"
  
  Scenario: Failing scenario
    Given I am open Google's search page
    When I am typing my search request "github React" on Google
    Then I press the "enter" key on Google
    Then I should see that the first Google's result is "angular"