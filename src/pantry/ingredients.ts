import { packageDirectorySync } from 'pkg-dir';
import { CliSettings } from '../cli/settings.js';
import { PantrySettings } from './settings.js';

export class Ingredients {
  public readonly rootDir: string;

  constructor(private readonly settings: PantrySettings & CliSettings) {
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

  get feastDir() {
    return `${this.rootDir}/.feast`;
  }
}
