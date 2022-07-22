import { packageDirectorySync } from 'pkg-dir';
import { CliSettings } from '../cli/settings.js';
import { PackItSettings } from './settings.js';

export class Config {
  constructor(private readonly settings: PackItSettings & CliSettings) {}

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

  get tmpDir() {
    return `${packageDirectorySync()}/.pack-it`;
  }
}
