const ALWAYS_IGNORE = ["/node_modules/"];

module.exports = {
  testEnvironment: "node",
  collectCoverageFrom: ["lib/**/*.{js}"],
  testPathIgnorePatterns: ALWAYS_IGNORE,
  coveragePathIgnorePatterns: ["<rootDir>/test"].concat(ALWAYS_IGNORE),
  coverageReporters: ["json", "lcov", "text", "text-summary"],
  coverageThreshold: {
    global: {
      branches: 1,
      functions: 1,
      lines: 1
    }
  }
};
