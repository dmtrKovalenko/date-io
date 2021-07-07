module.exports = {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  testMatch: ["**/__tests__/**/*.test.{ts,tsx}"],
  collectCoverageFrom: ["packages/**/src/**/*"],
  setupFiles: ["set-tz/utc"],
  preset: "ts-jest",
  transform: {
    "^.+\\.(ts|tsx)?$": "ts-jest",
  },
  globals: {
    "ts-jest": {
      tsConfig: "./__tests__/tsconfig.test.json",
    },
  },
};
