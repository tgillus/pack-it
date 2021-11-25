import archiver from 'archiver';
import execa from 'execa';
import fs, { WriteStream } from 'fs';
import path from 'path';
import { PassThrough } from 'stream';
import { Cleaner } from '../src/cleaner';
import { Packer } from '../src/packer';
import { Config } from '../src/utils/config';

jest.mock('archiver', () => {
  return jest.fn().mockReturnValue({
    directory: jest.fn(),
    finalize: jest.fn(),
    pipe: jest.fn(),
  });
});
jest.mock('execa');
jest.mock('fs');
jest.mock('../src/utils/config', () => {
  const Config = jest.fn().mockReturnValue({
    projectName: 'foo',
    projectVersion: '1.0.0',
    gitUrl: 'bar',
    gitBranch: 'main',
    fullTmpPath: 'foo',
    fullArtifactPath: 'foo',
    includeDirs: ['foo'],
    fullIncludeDirPaths: ['foo'],
  });

  return {
    Config,
  };
});
jest.mock('../src/utils/log');

beforeEach(() => {
  jest.clearAllMocks();
});

test('kicks off cleaner', async () => {
  const config = new Config();
  const cleaner = new Cleaner(config);
  const packer = new Packer(config, cleaner);
  const cleanSpy = jest.spyOn(cleaner, 'clean');

  await packer.pack();

  expect(cleanSpy).toBeCalledTimes(1);
});

test('makes tmp directory and clones project', async () => {
  const config = new Config();
  const cleaner = new Cleaner(config);
  const packer = new Packer(config, cleaner);
  const { gitUrl, gitBranch, fullTmpPath } = config;

  await packer.pack();

  expect(execa).toBeCalledWith('mkdir', ['-p', fullTmpPath]);
  expect(execa).toBeCalledWith('git', [
    'clone',
    gitUrl,
    '-b',
    gitBranch,
    fullTmpPath,
  ]);
});

test('installs dependencies and builds', async () => {
  const config = new Config();
  const cleaner = new Cleaner(config);
  const packer = new Packer(config, cleaner);

  await packer.pack();

  expect(execa).toBeCalledWith('npm', ['install'], {
    cwd: config.fullTmpPath,
  });
  expect(execa).toBeCalledWith('npm', ['run', 'build'], {
    cwd: config.fullTmpPath,
  });
});

test('removes dependencies and install production dependencies', async () => {
  const config = new Config();
  const cleaner = new Cleaner(config);
  const packer = new Packer(config, cleaner);

  await packer.pack();

  expect(execa).toBeCalledWith('rm', ['-rf', 'node_modules'], {
    cwd: config.fullTmpPath,
  });
  expect(execa).toBeCalledWith('npm', ['install', '--production'], {
    cwd: config.fullTmpPath,
  });
});

test('bundles project into zip file', async () => {
  const config = new Config();
  const cleaner = new Cleaner(config);
  const packer = new Packer(config, cleaner);
  const fullZipPath = `${config.fullArtifactPath}/${config.projectName}-1.0.0.zip`;
  const mockWriteStream: unknown = new PassThrough();
  const createWriteStreamSpy = jest
    .spyOn(fs, 'createWriteStream')
    .mockReturnValue(mockWriteStream as WriteStream);

  await packer.pack();

  expect(createWriteStreamSpy).toBeCalledWith(fullZipPath);
  expect(execa).toBeCalledWith('mkdir', ['-p', config.fullArtifactPath]);
  expect(archiver).toBeCalledWith('zip');

  const archive = archiver('zip');
  expect(archive.pipe).toBeCalledWith(mockWriteStream);
  config.fullIncludeDirPaths.forEach((fullIncludeDirPath) => {
    expect(archive.directory).toBeCalledWith(
      fullIncludeDirPath,
      path.basename(fullIncludeDirPath)
    );
  });
  expect(archive.finalize).toBeCalledTimes(1);
});
