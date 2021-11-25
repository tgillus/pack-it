import AppRootDir from 'app-root-dir';
import { cosmiconfigSync } from 'cosmiconfig';
import path from 'path';
import { Config, PackItConfigOptions } from '../../src/utils/config';

jest.mock('cosmiconfig', () => {
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

  return {
    cosmiconfigSync: jest.fn().mockReturnValue({
      search: jest.fn().mockReturnValue({ config: packItConfig, filepath: '' }),
    }),
  };
});

beforeEach(() => {
  jest.clearAllMocks();
});

test('loads Pack It! configuration', () => {
  new Config();

  expect(cosmiconfigSync).toBeCalledWith('pack-it');
});

test('throws an error if Pack It! configuration is not found', () => {
  const explorer = cosmiconfigSync('pack-it');
  jest.spyOn(explorer, 'search').mockReturnValueOnce(null);

  expect(() => {
    new Config();
  }).toThrowError('Pack It! configuration not found');
});

test('sets tmp, artifact, src directores to default values', () => {
  const packItConfig = {
    projectName: 'foo',
    git: {
      url: 'git@github.com:tgillus/pack-it.git',
      branch: 'main',
    },
  };
  const explorer = cosmiconfigSync('pack-it');
  jest
    .spyOn(explorer, 'search')
    .mockReturnValueOnce({ config: packItConfig, filepath: '' });

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
