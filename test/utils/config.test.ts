import AppRootDir from 'app-root-dir';
import { cosmiconfigSync } from 'cosmiconfig';
import { mockFn } from 'jest-mock-extended';
import path from 'path';
import { resetAllWhenMocks, when } from 'jest-when';
import { Config, PackItConfigOptions } from '../../src/utils/config';

jest.mock('cosmiconfig');

beforeEach(() => {
  const packItConfig: PackItConfigOptions = {
    projectName: 'foo',
    git: {
      url: 'git@github.com:tgillus/pack-it.git',
      branch: 'main',
    },
    tmpDir: '.bar',
    artifactDir: 'baz',
    includeDirs: ['qux', 'quux'],
  };

  when(cosmiconfigSync)
    .calledWith('pack-it')
    .mockReturnValue({
      search: mockFn().calledWith().mockReturnValueOnce({
        config: packItConfig,
        filepath: '/foo/bar/pack-it.config.js',
      }),
      load: mockFn(),
      clearCaches: mockFn(),
      clearLoadCache: mockFn(),
      clearSearchCache: mockFn(),
    });
});

afterEach(() => {
  jest.resetAllMocks();
  resetAllWhenMocks();
});

test('loads Pack It! configuration', () => {
  new Config();

  expect(cosmiconfigSync).toBeCalledWith('pack-it');
});

test('throws an error if Pack It! configuration is not found', () => {
  when(cosmiconfigSync)
    .calledWith('pack-it')
    .mockReturnValueOnce({
      search: mockFn().calledWith().mockReturnValueOnce(null),
      load: mockFn(),
      clearCaches: mockFn(),
      clearLoadCache: mockFn(),
      clearSearchCache: mockFn(),
    });

  expect(() => {
    new Config();
  }).toThrowError('Pack It! configuration not found');
});

test('returns the project name', () => {
  const config = new Config();

  expect(config.projectName).toEqual('foo');
});

test('returns project Git URL', () => {
  const config = new Config();

  expect(config.gitUrl).toEqual('git@github.com:tgillus/pack-it.git');
});

test('returns Git branch', () => {
  const config = new Config();

  expect(config.gitBranch).toEqual('main');
});

test('sets tmp, artifact, src directores to default values', () => {
  const packItConfig = {
    projectName: 'foo',
    git: {
      url: 'git@github.com:tgillus/pack-it.git',
      branch: 'main',
    },
  };
  when(cosmiconfigSync)
    .calledWith('pack-it')
    .mockReturnValueOnce({
      search: mockFn().mockReturnValue({
        config: packItConfig,
        filepath: '/foo/bar/pack-it.config.js',
      }),
      load: mockFn(),
      clearCaches: mockFn(),
      clearLoadCache: mockFn(),
      clearSearchCache: mockFn(),
    });
  const expectedTmpPath = path.join(AppRootDir.get(), '.tmp');
  const expectedArtifactPath = path.join(AppRootDir.get(), 'deploy');
  const expectedIncludeDirPaths = [
    path.join(AppRootDir.get(), '.tmp', 'src'),
    path.join(AppRootDir.get(), '.tmp', 'node_modules'),
  ];

  const config = new Config();

  expect(config.fullTmpPath).toEqual(expectedTmpPath);
  expect(config.fullArtifactPath).toEqual(expectedArtifactPath);
  expect(config.fullIncludeDirPaths).toEqual(expectedIncludeDirPaths);
});

test('does not overwrite user configured values for tmp and artifact directories', () => {
  const expectedTmpPath = path.join(AppRootDir.get(), '.bar');
  const expectedArtifactPath = path.join(AppRootDir.get(), 'baz');

  const config = new Config();

  expect(config.fullTmpPath).toEqual(expectedTmpPath);
  expect(config.fullArtifactPath).toEqual(expectedArtifactPath);
});

test('does not overwrite user configured values for include directory', () => {
  const expectedIncludeDirPaths = [
    path.join(AppRootDir.get(), '.bar', 'qux'),
    path.join(AppRootDir.get(), '.bar', 'quux'),
  ];

  const config = new Config();

  expect(config.fullIncludeDirPaths).toEqual(expectedIncludeDirPaths);
});
