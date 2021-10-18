import path from 'path';
import AppRootDir from 'app-root-dir';
import { Config } from '../../src/utils/config';

test('sets tmp build directory to default value', () => {
  const config = new Config();
  const expectedPath = path.join(AppRootDir.get(), '.tmp-build');

  expect(config.tmpBuildPath()).toEqual(expectedPath);
});
