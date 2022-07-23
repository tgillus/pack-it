import { Config } from '../config/config.js';
import { Git } from '../git/git.js';
import { Npm } from '../npm/npm.js';

export class Builder {
  constructor(private readonly git: Git, private readonly npm: Npm) {}

  tasks() {
    return [...this.git.tasks(), ...this.npm.tasks()];
  }

  static from(config: Config) {
    return new Builder(Git.from(config), Npm.from(config));
  }
}
