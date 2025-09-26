const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.cjs'],
  moduleNameMapper: {
    '^@/components/(.*)$': '<rootDir>/components/$1',
    '^@/pages/(.*)$': '<rootDir>/pages/$1',
  },
  testEnvironment: 'jest-environment-jsdom',
  collectCoverageFrom: [
    'components/**/*.{ts,tsx}',
    '!components/**/*.story.{ts,tsx}',
    '!components/**/*.test.{ts,tsx}',
    '!**/node_modules/**',
    '!**/.next/**',
    '!**/test-utils/**',
    '!**/pages/_*.tsx', // Exclude Next.js special pages
  ],
  coverageReporters: ['text', 'html', 'lcov'],
  coverageDirectory: 'coverage',
};

module.exports = createJestConfig(customJestConfig);
