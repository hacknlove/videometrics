/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */
export default {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageReporters: ['json', 'html', 'clover'],
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  transform: {
    '^.+\\.(t|j)sx?$': [
        '@swc/jest',
        {
            sourceMaps: true
        }
    ]
  }
};
