import { Config } from '../config/config.js';
import { Emitter } from '../emitter/emitter.js';
import { GitGateway } from './git-gateway.js';

export class Git {
  constructor(
    private readonly gitGateway: GitGateway,
    private readonly emitter: GitEmitter
  ) {}

  async clone() {
    await this.emitter.cloneStart();
    await this.gitGateway.clone();
    await this.emitter.cloneSucceed();
  }

  static from(config: Config, emitter: Emitter) {
    return new Git(GitGateway.from(config), new GitEmitter(config, emitter));
  }
}

export class GitEmitter {
  private readonly text: string;

  constructor(config: Config, private readonly emitter: Emitter) {
    const { url, branch } = config.git;

    this.text = `Cloning from ${url} and checking out ${branch} branch`;
  }

  async cloneStart() {
    await this.emitter.start(this.text);
  }

  async cloneSucceed() {
    await this.emitter.succeed(this.text);
  }
}
