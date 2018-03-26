const {Selector} = require('testcafe');

function select(selector) {
  return Selector(selector).with({boundTestRun: testController});
}

exports.github = {
  url: () => {
    return 'https://github.com/';
  },
  searchBox: () => {
    return select('.header-search-input');
  },
  firstSearchResult: () => {
    return Selector('.repo-list-item')
      .nth(0)
      .with({boundTestRun: testController});
  },
  loginButton: () => {
    return select('.btn.btn-primary.btn-block');
  },
  loginErrorMessage: () => {
    return select('#js-flash-container > div > div');
  },
  searchButton: () => {
    return select('.header-search-input');
  }
};
