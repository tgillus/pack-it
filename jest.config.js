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
    '<rootDir>/.tmp/',
    '<rootDir>/lib/',
    '<rootDir>/node_modules/',
  ],
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0,
    },
    './src/util/': {
      branches: 0,
    },
  },
};
