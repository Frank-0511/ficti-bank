const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.cjs'],
  moduleNameMapper: {
    '^@/features/(.*)$': '<rootDir>/features/$1',
    '^@/shared/(.*)$': '<rootDir>/shared/$1',
    '^@/components/(.*)$': '<rootDir>/shared/components/$1',
    '^@/lib/(.*)$': '<rootDir>/lib/$1',
  },
  testEnvironment: 'jest-environment-jsdom',
  collectCoverageFrom: [
    'features/**/*.{ts,tsx}',
    'shared/**/*.{ts,tsx}',
    'lib/**/*.{ts,tsx}',
    '!**/*.story.{ts,tsx}',
    '!**/*.test.{ts,tsx}',
    '!**/index.ts', // excluir barrel files
    '!**/constants/**', // excluir todas las carpetas de constantes
    '!**/types/**', // excluir todas las definiciones de tipos
    '!pages/_app.tsx',
    '!pages/_document.tsx',
    '!**/node_modules/**',
    '!**/.next/**',
    '!**/test-utils/**',
  ],
  coverageReporters: ['text', 'html', 'lcov'],
  coverageDirectory: 'coverage',
  testMatch: ['<rootDir>/**/*.(test|spec).[jt]s?(x)'],
  // Configuración de mocks
  moduleDirectories: ['node_modules', '<rootDir>/'],
  transformIgnorePatterns: ['node_modules/(?!(next)/)'],
};

module.exports = createJestConfig(customJestConfig);
