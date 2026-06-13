module.exports = {
  testEnvironment: 'jsdom',
  testMatch: ['**/tests/**/*.test.js'],
  transform: { '^.+\\.(js|jsx)$': 'babel-jest' },
  moduleNameMapper: { '\\.css$': '<rootDir>/tests/__mocks__/styleMock.js' },
  setupFilesAfterEnv: ['<rootDir>/tests/setupTests.js'],
};
