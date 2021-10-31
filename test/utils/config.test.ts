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
  tmpDir: '.foo',
  artifactDir: 'bar',
  srcDir: 'baz',
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

test('sets tmp, artifact, source directores to default values', () => {
  const configOptions = {
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
  const expectedSrcPath = path.join(AppRootDir.get(), '.tmp', 'src');

  expect(config.fullTmpPath).toEqual(expectedTmpPath);
  expect(config.fullArtifactPath).toEqual(expectedArtifactPath);
  expect(config.fullSrcPath).toEqual(expectedSrcPath);
});

test('does not overwrite user configured values for tmp and artifact directories', () => {
  const config = new Config();
  const expectedTmpPath = path.join(AppRootDir.get(), '.foo');
  const expectedArtifactPath = path.join(AppRootDir.get(), 'bar');

  expect(config.fullTmpPath).toEqual(expectedTmpPath);
  expect(config.fullArtifactPath).toEqual(expectedArtifactPath);
});

test('does not overwrite user configured values for source directory', () => {
  const config = new Config();
  const expectedSrcPath = path.join(config.fullTmpPath, 'baz');

  expect(config.fullSrcPath).toEqual(expectedSrcPath);
});
