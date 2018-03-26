const {setWorldConstructor} = require('cucumber');
const testControllerHolder = require('./testControllerHolder');
const base64Img = require('base64-img');

function CustomWorld({attach, parameters}) {
  this.waitForTestController = testControllerHolder.get()
    .then(tc => {
      return (testController = tc);
    });

  this.attach = attach;

  this.setBrowser = () => {
    if (parameters.browser === undefined) {
      return 'chrome';
    }
    return parameters.browser;
  };

  this.addScreenshotToReport = () => {
    if (
      process.argv.includes('--format') ||
      process.argv.includes('-f') ||
      process.argv.includes('--format-options')
    ) {
      return testController.takeScreenshot()
        .then(buffer => {
          const imgInBase64 = base64Img.base64Sync(buffer);
          const imageConvertForCuc = imgInBase64.substring(
            imgInBase64.indexOf(',') + 1
          );
          return attach(imageConvertForCuc, 'image/png');
        });
    }
    return true;
  };
}

setWorldConstructor(CustomWorld);
