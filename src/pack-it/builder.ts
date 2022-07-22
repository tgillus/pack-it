import { Config } from '../config/config.js';
import { GitGateway } from '../git/git-gateway.js';

export class Builder {
  constructor(private readonly gitGateway: GitGateway) {}

  build() {
    this.gitGateway.clone();
  }

  static from(config: Config) {
    return new Builder(GitGateway.from(config));
  }
}
