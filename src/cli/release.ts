import { assert } from '@sindresorhus/is';
import { readPackageUpSync } from 'read-pkg-up';

export const release = () => {
  const version = readPackageUpSync()?.packageJson.version;

  assert.string(version);

  return version;
};
