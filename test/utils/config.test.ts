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
  projectName: 'foo',
  stage: {
    name: 'development',
  },
  git: {
    url: 'git@github.com:tgillus/pack-it.git',
    branch: 'main',
  },
  tmpDir: '.bar',
  artifactDir: 'baz',
  includeDirs: ['qux', 'quux'],
};

beforeEach(() => {
  jest.clearAllMocks();
  mockExplorer.search.mockReturnValue({ config: configOptions });
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

test('sets tmp, artifact, src directores to default values', () => {
  const configOptions = {
    projectName: 'foo',
    stage: {
      name: 'development',
    },
    git: {
      url: 'git@github.com:tgillus/pack-it.git',
      branch: 'main',
    },
  };
  mockExplorer.search.mockReturnValue({ config: configOptions });

  const config = new Config();
  const expectedTmpPath = path.join(AppRootDir.get(), '.tmp');
  const expectedArtifactPath = path.join(AppRootDir.get(), 'deploy');
  const expectedIncludeDirPaths = [
    path.join(AppRootDir.get(), '.tmp', 'src'),
    path.join(AppRootDir.get(), '.tmp', 'node_modules'),
  ];

  expect(config.fullTmpPath).toEqual(expectedTmpPath);
  expect(config.fullArtifactPath).toEqual(expectedArtifactPath);
  expect(config.fullIncludeDirPaths).toEqual(expectedIncludeDirPaths);
});

test('does not overwrite user configured values for tmp and artifact directories', () => {
  const config = new Config();
  const expectedTmpPath = path.join(AppRootDir.get(), '.bar');
  const expectedArtifactPath = path.join(AppRootDir.get(), 'baz');

  expect(config.fullTmpPath).toEqual(expectedTmpPath);
  expect(config.fullArtifactPath).toEqual(expectedArtifactPath);
});

test('does not overwrite user configured values for include directory', () => {
  const config = new Config();
  const expectedIncludeDirPaths = [
    path.join(AppRootDir.get(), '.bar', 'qux'),
    path.join(AppRootDir.get(), '.bar', 'quux'),
  ];

  expect(config.fullIncludeDirPaths).toEqual(expectedIncludeDirPaths);
});
