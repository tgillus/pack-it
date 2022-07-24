import { packageDirectorySync } from 'pkg-dir';
import { CliCompounds } from '../cli/compounds.js';
import { PantryCompounds } from './compounds.js';

export class Ingredients {
  public readonly rootDir: string;

  constructor(private readonly settings: PantryCompounds & CliCompounds) {
    this.rootDir = packageDirectorySync();
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
      zip: { destination },
    } = this;

    return `${destination}/${name}.zip`;
  }

  get feastDir() {
    return `${this.rootDir}/.feast`;
  }
}
