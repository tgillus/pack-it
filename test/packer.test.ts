import archiver from 'archiver';
import execa from 'execa';
import fs, { WriteStream } from 'fs';
import { mock } from 'jest-mock-extended';
import { resetAllWhenMocks, when } from 'jest-when';
import { Cleaner } from '../src/cleaner';
import { Packer } from '../src/packer';
import { Config } from '../src/utils/config';

jest.mock('archiver');
jest.mock('execa');
jest.mock('fs');
jest.mock('../src/cleaner');
jest.mock('../src/utils/config');
jest.mock('../src/utils/log');

beforeEach(() => {
  const mockArchiver = mock<archiver.Archiver>();
  const mockedConfig = Config as jest.MockedClass<typeof Config>;
  const mockConfig = mock<Config>({
    projectName: 'pack-it',
    projectVersion: '1.0.0',
    gitUrl: 'git@github.com:tgillus/pack-it.git',
    gitBranch: 'main',
    fullTmpPath: '/foo/bar/.tmp',
    fullArtifactPath: '/foo/bar/deploy',
    includeDirs: ['src', 'node_modules'],
    fullIncludeDirPaths: ['/foo/bar/src', '/foo/bar/node_modules'],
  });

  when(archiver).calledWith('zip').mockReturnValue(mockArchiver);
  when(mockedConfig).calledWith().mockReturnValue(mockConfig);
});

afterEach(() => {
  jest.resetAllMocks();
  resetAllWhenMocks();
});

const getPacker = () => {
  const config = new Config();
  const cleaner = new Cleaner(config);

  return new Packer(config, cleaner);
};

test('kicks off cleaner', async () => {
  const packer = getPacker();

  await packer.pack();

  expect(Cleaner.prototype.clean).toBeCalledTimes(1);
});

test('makes tmp directory and clones project', async () => {
  const packer = getPacker();
  const gitUrl = 'git@github.com:tgillus/pack-it.git';
  const gitBranch = 'main';
  const fullTmpPath = '/foo/bar/.tmp';

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
  const packer = getPacker();
  const fullTmpPath = '/foo/bar/.tmp';

  await packer.pack();

  expect(execa).toBeCalledWith('npm', ['install'], {
    cwd: fullTmpPath,
  });
  expect(execa).toBeCalledWith('npm', ['run', 'build'], {
    cwd: fullTmpPath,
  });
});

test('removes dependencies and install production dependencies', async () => {
  const packer = getPacker();
  const fullTmpPath = '/foo/bar/.tmp';

  await packer.pack();

  expect(execa).toBeCalledWith('rm', ['-rf', 'node_modules'], {
    cwd: fullTmpPath,
  });
  expect(execa).toBeCalledWith('npm', ['install', '--production'], {
    cwd: fullTmpPath,
  });
});

test('writes contents to zip archiver', async () => {
  const packer = getPacker();
  const fullArtifactPath = '/foo/bar/deploy';
  const projectName = 'pack-it';
  const fullZipPath = `${fullArtifactPath}/${projectName}-1.0.0.zip`;
  const mockWriteStream = mock<WriteStream>();
  const mockArchiver = mock<archiver.Archiver>();
  when(fs.createWriteStream)
    .calledWith(fullZipPath)
    .mockReturnValueOnce(mockWriteStream);
  when(archiver).calledWith('zip').mockReturnValue(mockArchiver);

  await packer.pack();

  expect(execa).toBeCalledWith('mkdir', ['-p', fullArtifactPath]);
  expect(mockArchiver.pipe).toBeCalledWith(mockWriteStream);
  expect(mockArchiver.directory).toBeCalledWith('/foo/bar/src', 'src');
  expect(mockArchiver.directory).toBeCalledWith(
    '/foo/bar/node_modules',
    'node_modules'
  );
  expect(mockArchiver.finalize).toBeCalledTimes(1);
});
