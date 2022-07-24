import { packageDirectorySync } from 'pkg-dir';
import { CliCompounds } from '../cli/compounds.js';
import { PantryCompounds } from './compounds.js';
import { readPackageUpSync } from 'read-pkg-up';
import { assert } from '@sindresorhus/is';

export class Ingredients {
  public readonly rootDir: string;
  public readonly version?: string;

  constructor(private readonly settings: PantryCompounds & CliCompounds) {
    this.rootDir = packageDirectorySync();
    this.version = readPackageUpSync({
      cwd: this.packItDir,
    })?.packageJson.version;
  }

  get name() {
    return this.settings.name;
  }

  get git() {
    const { url, branch = 'main' } = this.settings.git;

    return {
      url,
      branch,
    };
  }

  get zip() {
    const { destination, include } = this.settings.zip;

    return {
      destination: `${this.rootDir}/${destination}`,
      include,
    };
  }

  get artifact() {
    const {
      name,
      version,
      zip: { destination },
    } = this;

    assert.string(version);

    return `${destination}/${name}-${version}.zip`;
  }

  get packItDir() {
    return `${this.rootDir}/.pack-it`;
  }
}
