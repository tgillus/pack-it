import { Config } from '../config/config.js';
import { Emitter } from '../emitter/emitter.js';
import { GitGateway } from './git-gateway.js';

export class Git {
  constructor(
    private readonly gitGateway: GitGateway,
    private readonly emitter: GitEmmitter
  ) {}

  async clone() {
    await this.emitter.cloneStarted();
    await this.gitGateway.clone();
    await this.emitter.cloneSucceeded();
  }

  static from(config: Config, emitter: Emitter) {
    return new Git(GitGateway.from(config), new GitEmmitter(config, emitter));
  }
}

export class GitEmmitter {
  private readonly text: string;

  constructor(config: Config, private readonly emitter: Emitter) {
    const { url, branch } = config.git;

    this.text = `Cloning from ${url} and checking out ${branch} branch`;
  }

  async cloneStarted() {
    await this.emitter.start(this.text);
  }

  async cloneSucceeded() {
    await this.emitter.succeed(this.text);
  }
}
