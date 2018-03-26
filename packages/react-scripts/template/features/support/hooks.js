const fs = require('fs');
const createTestCafe = require('testcafe');
const testControllerHolder = require('../support/testControllerHolder');
const {
  AfterAll,
  BeforeAll,
  setDefaultTimeout,
  Before,
  After
} = require('cucumber');

let testcafe = null;
let i = 0;

function createTestFile() {
  fs.writeFileSync(
    'test.js',
    'import testControllerHolder from "./features/support/testControllerHolder.js";\n\n' +
      'fixture("fixture")\n' +
      'test("test", testControllerHolder.capture)'
  );
}

function runTest(i, browser) {
  let runner = null;
  createTestCafe('localhost', 1338 + i, 1339 + i)
    .then(tc => {
      testcafe = tc;
      runner = tc.createRunner();
      return runner
        .src('./test.js')
        .browsers(browser)
        .screenshots('./reports/screenshots/')
        .run()
        .catch(error => {
          console.log(error); // eslint-disable-line no-console
          testcafe.close();
        });
    })
    .then(report => {
      console.log(report); // eslint-disable-line no-console
    })
    .catch(error => {
      console.log(error); // eslint-disable-line no-console
      testcafe.close();
    });
}

setDefaultTimeout(20000);

BeforeAll(function() { // eslint-disable-line
  createTestFile();
});

Before(function() { // eslint-disable-line
  runTest(i, this.setBrowser());
  i += 2;
  return this.waitForTestController
    .then(testController => {
      return testController.maximizeWindow();
    });
});

After(function() { // eslint-disable-line
  testControllerHolder.free();
  testcafe.close();
});

AfterAll(function() { // eslint-disable-line
  fs.unlinkSync('test.js');
});
