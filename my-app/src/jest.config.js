
module.exports = {
    collectCoverage: true,
    collectCoverageFrom: ["./utils/textAnalyzer.js"],
    coverageDirectory: "coverage",
    coverageReporters: ["json"],
    testEnvironment: "node",
  };
  