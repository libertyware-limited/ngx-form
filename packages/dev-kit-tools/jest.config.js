module.exports = {
  testMatch: ['**/+(*.)+(spec|test).+(ts|js)?(x)'],
  transform: {
    '^.+\\.(ts|js|html)$': 'ts-jest'
  },
  resolver: '@nrwl/jest/plugins/resolver',
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageReporters: ['html'],
  moduleNameMapper: {
    // we'll use commonjs version of lodash for tests 👌
    // because we don't need to use any kind of tree shaking right?!
    "^lodash-es$": "lodash"
  },
};
