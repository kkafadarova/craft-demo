import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  globals: {
  'ts-jest': {
    useESM: false, 
  },
},
  testEnvironment: 'jsdom',
  moduleNameMapper: {
  '\\.module\\.scss$': 'identity-obj-proxy',
  '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
},
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  testMatch: ['**/__tests__/**/*.(test|spec).[jt]s?(x)', '**/?(*.)+(test|spec).[jt]s?(x)'],
};

export default config;
