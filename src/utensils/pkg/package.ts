import { assert } from '@sindresorhus/is';
import { packageDirectorySync } from 'pkg-dir';
import { readPackageUpSync } from 'read-pkg-up';

export class Package {
  rootDir() {
    return packageDirectorySync();
  }

  packageVersion(cwd: string) {
    const version = readPackageUpSync({
      cwd,
    })?.packageJson.version;

    assert.string(version);

    return version;
  }
}
