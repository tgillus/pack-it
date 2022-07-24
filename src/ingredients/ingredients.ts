import { CliCompounds } from '../cli/compounds.js';
import { PantryCompounds } from './compounds.js';
import { assert } from '@sindresorhus/is';
import { Package } from '../utensils/pkg/package.js';

export class Ingredients {
  public readonly rootDir: string;
  public readonly version?: string;

  constructor(private readonly compounds: Compounds, pkg: Package) {
    this.rootDir = pkg.rootDir();
    this.version = pkg.packageVersion(this.packItDir);
  }

  get name() {
    return this.compounds.name;
  }

  get git() {
    const { url, branch = 'main' } = this.compounds.git;

    return {
      url,
      branch,
    };
  }

  get zip() {
    const { destination, include } = this.compounds.zip;

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

  static from(compounds: Compounds) {
    return new Ingredients(compounds, new Package());
  }
}

type Compounds = PantryCompounds & CliCompounds;
