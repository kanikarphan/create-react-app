const {Given, When, Then} = require('cucumber');
const githubPage = require('../support/pages/github-page');

Given(/^I open the GitHub page$/, () => {
  return testController.navigateTo(githubPage.github.url());
});

When(/^I am typing my search request "([^"]*)" on GitHub$/, text => {
  return testController.typeText(githubPage.github.searchButton(), text);
});

Then(/^I am pressing (.*) key on GitHub$/, text => {
  return testController.pressKey(text);
});

Then(/^I should see that the first GitHub's result is (.*)$/, text => {
  return testController.expect(githubPage.github.firstSearchResult().innerText).contains(text);
});
