const mockExeca = jest.fn();

import { Packager } from '../src/packager';
import { Config } from '../src/utils/config';

jest.mock('../src/utils/log');
jest.mock('execa', () => mockExeca);

beforeEach(() => {
  jest.clearAllMocks();
});

test('packages source code into zip file', async () => {
  const packager = new Packager();
  const spy = jest.spyOn(packager, 'clean');

  await packager.pack();

  expect(spy).toBeCalledTimes(1);
});

test('removes build directories', async () => {
  const config = new Config();
  const packager = new Packager(config);

  await packager.clean();

  expect(mockExeca).toBeCalledWith('npx', ['rimraf', config.tmpBuildPath()]);
  expect(mockExeca).toBeCalledWith('npx', [
    'rimraf',
    config.artifactBuildPath(),
  ]);
});

test('creates tmp build directory', async () => {
  const config = new Config();
  const packager = new Packager(config);

  await packager.pack();

  expect(mockExeca).toBeCalledWith('mkdir', ['-p', config.tmpBuildPath()]);
});

test('changes to the tmp build directory', async () => {
  const config = new Config();
  const packager = new Packager(config);

  await packager.pack();

  expect(mockExeca).toBeCalledWith('cd', [config.tmpBuildPath()]);
});

test('clones a copy of the project to the tmp build directory', async () => {
  const config = new Config();
  const packager = new Packager(config);
  const { url, branch } = config.options.git;

  await packager.pack();

  expect(mockExeca).toBeCalledWith('git', [
    'clone',
    url,
    '-b',
    branch,
    config.tmpBuildPath(),
  ]);
});
