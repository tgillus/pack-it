import { Config } from '../config/config.js';
import { GitGateway } from '../git/git-gateway.js';
import { Npm } from '../npm/npm.js';

export class Builder {
  constructor(
    private readonly gitGateway: GitGateway,
    private readonly npm: Npm
  ) {}

  build() {
    this.gitGateway.clone();
    this.npm.install();
    this.npm.build();
  }

  static from(config: Config) {
    return new Builder(GitGateway.from(config), Npm.from(config));
  }
}
