const { defaults } = require('jest-config');

module.exports = {
  clearMocks: true,
  testEnvironment: 'jsdom',
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/index.js',
    '!src/assets/*',
    '!data/keyMap.js',
    '!/node_modules/',
    '!src/helpers/cloudinaryWidget.js',
    '!src/views/*',
  ],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/src/__mocks__/fileMock.js',
    '\\.(css|scss)$': 'identity-obj-proxy',
  },
  setupFiles: [
    '<rootDir>/src/testConfigurations/setupTests.js',
    'jest-localstorage-mock',
  ],
  reporters: [
    'default',
    [
      'jest-html-reporters',
      {
        publicPath: './html-report',
        filename: 'report.html',
        expand: true,
      },
    ],
  ],
  collectCoverage: true,
  coverageReporters: ['lcov', 'json', 'text', 'html'],
  coverageDirectory: 'coverage',
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
};
