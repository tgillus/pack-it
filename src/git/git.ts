import { Task } from '../cli/ui/task-list.js';
import { Config } from '../config/config.js';
import { GitGateway } from './git-gateway.js';

export class Git {
  constructor(
    private readonly config: Config,
    private readonly gitGateway: GitGateway
  ) {}

  async clone() {
    const {
      git: { url, branch },
      packItDir,
    } = this.config;

    await this.gitGateway.clone(url, branch, packItDir);
  }

  tasks() {
    const { url, branch } = this.config.git;

    return [
      new Task({
        title: `Cloning from ${url} and checking out ${branch} branch`,
        action: this.clone.bind(this),
      }),
    ];
  }

  static from(config: Config) {
    return new Git(config, GitGateway.build());
  }
}
