const mockExeca = jest.fn();
const mockArchiver = jest.fn();

jest.mock('execa', () => mockExeca);
jest.mock('archiver', () => mockArchiver);
jest.mock('../src/utils/log');

import fs, { WriteStream } from 'fs';
import path from 'path';
import { PassThrough } from 'stream';
import { Packer } from '../src/packer';
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
  const packer = new Packer(config);

  await packer.clean();

  expect(mockExeca).toBeCalledWith('npx', ['rimraf', config.fullTmpPath]);
  expect(mockExeca).toBeCalledWith('npx', ['rimraf', config.fullArtifactPath]);
});

test('packages source code into zip file', async () => {
  const config = new Config();
  const packer = new Packer(config);
  const { gitUrl, gitBranch } = config;
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { version } = require('../package.json');
  const fullZipPath = `${config.fullArtifactPath}/${config.projectName}-${version}.zip`;

  const packerCleanSpy = jest.spyOn(packer, 'clean').mockResolvedValue();
  const mockWriteStream: unknown = new PassThrough();
  const fsCreateWriteStreamSpy = jest
    .spyOn(fs, 'createWriteStream')
    .mockReturnValue(mockWriteStream as WriteStream);

  await packer.pack();

  expect(packerCleanSpy).toBeCalledTimes(1);
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
  config.fullIncludeDirPaths.forEach((fullIncludeDirPath) => {
    expect(mockArchiver().directory).toBeCalledWith(
      fullIncludeDirPath,
      path.basename(fullIncludeDirPath)
    );
  });
  expect(mockArchiver().finalize).toBeCalledTimes(1);
});
