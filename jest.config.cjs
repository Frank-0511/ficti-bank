const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.cjs'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testEnvironment: 'jest-environment-jsdom',
  collectCoverageFrom: [
    'src/features/**/*.{ts,tsx}',
    'src/shared/**/*.{ts,tsx}',
    'src/lib/**/*.{ts,tsx}',
    '!**/*.story.{ts,tsx}',
    '!**/*.test.{ts,tsx}',
    '!**/index.ts',
    '!**/constants/**',
    '!**/types/**',
    '!**/node_modules/**',
    '!**/dist/**',
    '!**/test-utils/**',
  ],
  coverageReporters: ['text', 'html', 'lcov'],
  coverageDirectory: 'coverage',
  testMatch: ['<rootDir>/src/**/*.(test|spec).[jt]s?(x)'],
  // Configuración de mocks
  moduleDirectories: ['node_modules', '<rootDir>/'],
  transformIgnorePatterns: ['node_modules/(?!(msw)/)'],
};

module.exports = customJestConfig;
