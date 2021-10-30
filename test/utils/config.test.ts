import path from 'path';
import AppRootDir from 'app-root-dir';

const mockExplorer = {
  search: jest.fn(),
};
const mockCosmiconfig = {
  cosmiconfigSync: jest.fn().mockReturnValue(mockExplorer),
};
jest.mock('cosmiconfig', () => {
  return mockCosmiconfig;
});

import { Config, PackItConfigOptions } from '../../src/utils/config';

const configOptions: PackItConfigOptions = {
  stage: {
    name: 'development',
  },
  git: {
    url: 'git@github.com:tgillus/pack-it.git',
    branch: 'main',
  },
};

beforeEach(() => {
  jest.clearAllMocks();
  mockExplorer.search.mockReturnValue(configOptions);
});

test('loads Pack It! configuration', () => {
  new Config();

  expect(mockCosmiconfig.cosmiconfigSync).toBeCalledWith('pack-it');
  expect(mockExplorer.search).toBeCalledTimes(1);
});

test('throws an error if Pack It! configuration is not found', () => {
  mockExplorer.search.mockReturnValue(null);

  expect(() => {
    new Config();
  }).toThrowError('Pack It! configuration not found');
});

test('sets tmp build directory to default value', () => {
  const config = new Config();
  const expectedPath = path.join(AppRootDir.get(), '.tmp-build');

  expect(config.tmpBuildPath()).toEqual(expectedPath);
});

test('sets artifact build path to default value', () => {
  const config = new Config();
  const expectedPath = path.join(AppRootDir.get(), 'deploy');

  expect(config.artifactBuildPath()).toEqual(expectedPath);
});
