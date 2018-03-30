const path = require('path');

module.exports = {
  rootDir: path.resolve('.'),
  roots: [
    '<rootDir>/src/',
  ],
  collectCoverageFrom: [
    'src/**/*.js',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.css$': path.resolve(__dirname, 'styleTransform.js'),
  },
};
