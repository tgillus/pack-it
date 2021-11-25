import execa from 'execa';
import { Cleaner } from '../src/cleaner';
import { Config } from '../src/utils/config';

jest.mock('execa');
jest.mock('../src/utils/log');

test('removes build directories', async () => {
  const config = new Config();
  const cleaner = new Cleaner(config);

  await cleaner.clean();

  expect(execa).toBeCalledWith('npx', ['rimraf', config.fullTmpPath]);
  expect(execa).toBeCalledWith('npx', ['rimraf', config.fullArtifactPath]);
});
