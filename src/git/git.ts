import { Config } from '../config/config.js';
import { GitGateway } from './git-gateway.js';
import { Step } from '../pack-it/pack-it.js';

export class Git {
  constructor(
    private readonly config: Config,
    private readonly gitGateway: GitGateway
  ) {}

  clone = async () => {
    const {
      git: { url, branch },
      packItDir,
    } = this.config;

    await this.gitGateway.clone(url, branch, packItDir);
  };

  steps(): Step[] {
    const { url, branch } = this.config.git;

    return [
      {
        description: `Cloning from ${url} and checking out ${branch} branch`,
        action: this.clone,
      },
    ];
  }

  static from(config: Config) {
    return new Git(config, GitGateway.build());
  }
}
