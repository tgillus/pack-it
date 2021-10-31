module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  modulePathIgnorePatterns: ['<rootDir>/.tmp/', '<rootDir>/lib/'],
  testPathIgnorePatterns: ['<rootDir>/.tmp/'],
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
