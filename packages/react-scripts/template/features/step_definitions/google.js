const {Given, When, Then} = require('cucumber');
const Selector = require('testcafe').Selector;

Given('I am open Google\'s search page', () => {
  return testController.navigateTo('https://google.com');
});

When('I am typing my search request {string} on Google', text => {
  const input = Selector('#lst-ib').with({boundTestRun: testController});
  return testController.typeText(input, text);
});

Then('I press the {string} key on Google', async text => {
  await testController.pressKey(text);
});

Then('I should see that the first Google\'s result is {string}', text => {
  const firstLink = Selector('#rso')
    .find('a')
    .with({boundTestRun: testController});
  return testController.expect(firstLink.innerText).contains(text);
});
