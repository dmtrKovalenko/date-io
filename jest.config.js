module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ["**/__tests__/**/*.test.ts"],
  globals: {
    'ts-jest': {
      tsConfig: './__tests__/tsconfig.test.json'
    }
  }
};
