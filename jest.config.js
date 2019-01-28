module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ["**/__tests__/**/*.test.ts"],
  collectCoverageFrom: ["packages/**/src/**/*"],
  globals: {
    'ts-jest': {
      tsConfig: './__tests__/tsconfig.test.json'
    }
  }
};
