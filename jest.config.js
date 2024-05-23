module.exports = {
  setupFilesAfterEnv: [
      '@testing-library/jest-dom',
      '<rootDir>/jest.setup.js'
  ],
  moduleNameMapper: {
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
      "^@components/(.*)$": "<rootDir>/src/components/$1"
  }
};
