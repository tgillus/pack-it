import { Config } from '../config/config.js';
import { Emitter } from '../emitter/emitter.js';
import { Git } from '../git/git.js';
import { Npm } from '../npm/npm.js';

export class Builder {
  constructor(private readonly git: Git, private readonly npm: Npm) {}

  async build() {
    await this.git.clone();
    await this.npm.install();
    await this.npm.build();
    await this.npm.cleanModules();
    await this.npm.installProduction();
  }

  static from(config: Config, emitter: Emitter) {
    return new Builder(Git.from(config, emitter), Npm.from(config, emitter));
  }
}
