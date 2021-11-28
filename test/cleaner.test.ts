import execa from 'execa';
import { Cleaner } from '../src/cleaner';
import { Config } from '../src/utils/config';
import { mock } from 'jest-mock-extended';

jest.mock('execa');
jest.mock('../src/utils/log');

afterEach(() => {
  jest.clearAllMocks();
});

test('removes build directories', async () => {
  const mockConfig = mock<Config>({
    fullTmpPath: 'foo',
    fullArtifactPath: 'bar',
  });
  const cleaner = new Cleaner(mockConfig);

  await cleaner.clean();

  expect(execa).toBeCalledWith('npx', ['rimraf', 'foo']);
  expect(execa).toBeCalledWith('npx', ['rimraf', 'bar']);
});
