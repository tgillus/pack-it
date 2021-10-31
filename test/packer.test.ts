const mockArchiver = jest.fn();
const mockExeca = jest.fn();

jest.mock('archiver', () => mockArchiver);
jest.mock('execa', () => mockExeca);
jest.mock('../src/utils/log');

import fs, { WriteStream } from 'fs';
import path from 'path';
import { PassThrough } from 'stream';
import { Cleaner } from '../src/cleaner';
import { Packer } from '../src/packer';
import { Config } from '../src/utils/config';

const getPackageVersion = () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { version } = require('../package.json');
  return version;
};

beforeEach(() => {
  jest.clearAllMocks();
  mockArchiver.mockReturnValue({
    directory: jest.fn(),
    finalize: jest.fn(),
    pipe: jest.fn(),
  });
});

test('packages source code into zip file', async () => {
  const config = new Config();
  const cleaner = new Cleaner(config);
  const packer = new Packer(config, cleaner);
  const { gitUrl, gitBranch } = config;
  const version = getPackageVersion();
  const fullZipPath = `${config.fullArtifactPath}/${config.projectName}-${version}.zip`;

  const cleanSpy = jest.spyOn(cleaner, 'clean').mockResolvedValue();
  const mockWriteStream: unknown = new PassThrough();
  const createWriteStreamSpy = jest
    .spyOn(fs, 'createWriteStream')
    .mockReturnValue(mockWriteStream as WriteStream);

  await packer.pack();

  expect(cleanSpy).toBeCalledTimes(1);
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

  expect(createWriteStreamSpy).toBeCalledWith(fullZipPath);
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
