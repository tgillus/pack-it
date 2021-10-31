const mockExeca = jest.fn();
const mockArchiver = jest.fn();

jest.mock('execa', () => mockExeca);
jest.mock('archiver', () => mockArchiver);
jest.mock('../src/utils/log');

import fs, { WriteStream } from 'fs';
import path from 'path';
import { PassThrough } from 'stream';
import { Packager } from '../src/packager';
import { Config } from '../src/utils/config';

beforeEach(() => {
  jest.clearAllMocks();
  mockArchiver.mockReturnValue({
    directory: jest.fn(),
    finalize: jest.fn(),
    pipe: jest.fn(),
  });
});

test('removes build directories', async () => {
  const config = new Config();
  const packager = new Packager(config);

  await packager.clean();

  expect(mockExeca).toBeCalledWith('npx', ['rimraf', config.fullTmpPath]);
  expect(mockExeca).toBeCalledWith('npx', ['rimraf', config.fullArtifactPath]);
});

test('packages source code into zip file', async () => {
  const config = new Config();
  const packager = new Packager(config);
  const { gitUrl, gitBranch } = config;
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { name, version } = require('../package.json');
  const fullZipPath = `${config.fullArtifactPath}/${name}-${version}.zip`;

  const packagerCleanSpy = jest.spyOn(packager, 'clean').mockResolvedValue();
  const mockWriteStream: unknown = new PassThrough();
  const fsCreateWriteStreamSpy = jest
    .spyOn(fs, 'createWriteStream')
    .mockReturnValue(mockWriteStream as WriteStream);

  await packager.pack();

  expect(packagerCleanSpy).toBeCalledTimes(1);
  expect(mockExeca).toBeCalledWith('mkdir', ['-p', config.fullTmpPath]);
  expect(mockExeca).toBeCalledWith('git', [
    'clone',
    gitUrl,
    '-b',
    gitBranch,
    config.fullTmpPath,
  ]);
  expect(mockExeca).toBeCalledWith('npm', ['install'], {
    cwd: config.fullTmpPath,
  });
  expect(mockExeca).toBeCalledWith('npm', ['run', 'build'], {
    cwd: config.fullTmpPath,
  });
  expect(mockExeca).toBeCalledWith('npm', ['install'], {
    cwd: config.fullTmpPath,
  });
  expect(mockExeca).toBeCalledWith('npm', ['install', '--production'], {
    cwd: config.fullTmpPath,
  });

  expect(fsCreateWriteStreamSpy).toBeCalledWith(fullZipPath);
  expect(mockExeca).toBeCalledWith('mkdir', ['-p', config.fullArtifactPath]);
  expect(mockArchiver).toBeCalledWith('zip');
  expect(mockArchiver().pipe).toBeCalledWith(mockWriteStream);
  expect(mockArchiver().directory).toBeCalledWith(
    config.fullSrcPath,
    config.srcDir
  );
  expect(mockArchiver().directory).toBeCalledWith(
    path.join(config.fullTmpPath, 'node_modules'),
    'node_modules'
  );
  expect(mockArchiver().finalize).toBeCalledTimes(1);
});
