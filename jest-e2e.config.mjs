import jestConfig from './jest.config.mjs'

/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  ...jestConfig,
  testMatch: ['**/*.e2e-spec.ts'],
}
