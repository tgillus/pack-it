const mockExeca = jest.fn();

jest.mock('execa', () => mockExeca);
jest.mock('../src/utils/log');

import { Cleaner } from '../src/cleaner';
import { Config } from '../src/utils/config';

test('removes build directories', async () => {
  const config = new Config();
  const cleaner = new Cleaner(config);

  await cleaner.clean();

  expect(mockExeca).toBeCalledWith('npx', ['rimraf', config.fullTmpPath]);
  expect(mockExeca).toBeCalledWith('npx', ['rimraf', config.fullArtifactPath]);
});
