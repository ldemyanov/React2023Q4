export default {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    // '^.+\\.svg?react$': '<rootDir>/svgTransform.js',
    // '^.+\\.svg': 'jest-svg-transformer',
  },
  moduleNameMapper: {
    '\\.(gif|ttf|svg|eot|png)$': '<rootDir>/src/test/__mocks__/fileMock.js',
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    // '^.+\\.svg': '<rootDir>/test/__mocks__/svgMock.jsx',
    // '^.+\\.svg': './src/test/__mocks__/svgMock.jsx',
  },
  setupFiles: ['./jest.polyfills.js'],
  testEnvironmentOptions: {
    customExportConditions: [''],
  },
};
