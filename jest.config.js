module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ['lib/rules/**/*.js'],
  coverageReporters: ['json-summary', 'text', 'lcov'],
  moduleFileExtensions: ['js', 'json'],
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest'
  }
};
