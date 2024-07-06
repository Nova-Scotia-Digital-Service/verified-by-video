/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  globalSetup: './test/globalSetup.js',
  globalTeardown: './test/globalTeardown.js',
  maxConcurrency: 1,
  maxWorkers: 1,
}
