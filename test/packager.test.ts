const mockExeca = jest.fn();

import { Packager } from '../src/packager';
import { Config } from '../src/utils/config';

jest.mock('../src/utils/log');
jest.mock('execa', () => mockExeca);

test('packages source code into zip file', () => {
  const packager = new Packager();
  const spy = jest.spyOn(packager, 'clean');

  packager.pack();

  expect(spy).toBeCalledTimes(1);
});

test('remove build directories', () => {
  const config = new Config();
  const packager = new Packager(config);

  packager.clean();

  expect(mockExeca).toBeCalledWith('npx', ['rimraf', config.tmpBuildPath()]);
  expect(mockExeca).toBeCalledWith('npx', [
    'rimraf',
    config.artifactBuildPath(),
  ]);
});
