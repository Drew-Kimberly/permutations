module.exports = {
  roots: ['<rootDir>/test'],
  testMatch: ['**/__tests__/**/*.+(ts|tsx|js)', '**/?(*.)+spec.+(ts|tsx|js)'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
};
