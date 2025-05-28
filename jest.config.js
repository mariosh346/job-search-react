/* eslint-env node */
const nextJest = require('next/jest');

const createJestConfig = nextJest({ dir: './' });

const config = {
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1'
  },
  rootDir: 'src'
}

module.exports = async () => ({
  ...(await createJestConfig(config)()),
  transformIgnorePatterns: ['node_modules/(?!next-intl)/']
});
