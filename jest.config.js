module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  modulePathIgnorePatterns: ['<rootDir>/.tmp/', '<rootDir>/lib/'],
  testPathIgnorePatterns: [
    '<rootDir>/.tmp/',
    '<rootDir>/lib/',
    '<rootDir>/node_modules/',
  ],
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  coveragePathIgnorePatterns: [
    '<rootDir>/src/index.ts',
    '<rootDir>/.tmp/',
    '<rootDir>/lib/',
    '<rootDir>/node_modules/',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};
