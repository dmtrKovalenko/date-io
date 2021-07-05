module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/__tests__/**/*.test.ts"],
  collectCoverageFrom: ["packages/**/src/**/*"],
  setupFiles: ["set-tz/utc"],
  globals: {
    "ts-jest": {
      tsConfig: "./__tests__/tsconfig.test.json",
    },
  },
};
