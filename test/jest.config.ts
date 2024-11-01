import type {Config} from 'jest';

const config: Config = {
  setupFilesAfterEnv: ['<rootDir>/./setup-jest.js'],
};

export default config;