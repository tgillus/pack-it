import { Config } from '../config/config.js';
import { Git } from '../git/git.js';
import { Npm } from '../npm/npm.js';
import { Step } from './pack-it.js';

export class Builder {
  constructor(private readonly git: Git, private readonly npm: Npm) {}

  steps(): Step[] {
    return [...this.git.steps(), ...this.npm.steps()];
  }

  static from(config: Config) {
    return new Builder(Git.from(config), Npm.from(config));
  }
}
