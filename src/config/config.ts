import { packageDirectorySync } from 'pkg-dir';
import { CliSettings } from '../cli/settings.js';
import { PackItSettings } from './settings.js';

export class Config {
  public readonly rootDir: string;

  constructor(private readonly settings: PackItSettings & CliSettings) {
    this.rootDir = packageDirectorySync();
  }

  get projectName() {
    return this.settings.projectName;
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

  get packItDir() {
    return `${this.rootDir}/.pack-it`;
  }

  get tmpDir() {
    return `${this.rootDir}/${this.packItDir}`;
  }
}
