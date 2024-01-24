const TIMEOUT = 60000 // 60 seconds

/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: 'ts-jest',
  testMatch: ['**/*.e2e-spec.ts', '**/*.spec.ts'],
  testTimeout: TIMEOUT,
  moduleFileExtensions: ['js', 'json', 'ts'],
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  moduleNameMapper: {
    '^@/test/(.*)$': '<rootDir>/test/$1',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
}
