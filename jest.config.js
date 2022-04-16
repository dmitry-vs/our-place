module.exports = {
  testEnvironment: 'jsdom',
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/stories/*.{ts,tsx}'],
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
};
