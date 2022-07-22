import { Config } from '../config/config.js';
import { Emitter } from '../emitter/emitter.js';
import { GitGateway } from './git-gateway.js';

export class Git {
  constructor(
    private readonly gitGateway: GitGateway,
    private readonly emitter: Emitter
  ) {}

  async clone() {
    await this.emitter.emit({ type: 'start', text: 'Cloning project' });
    await this.gitGateway.clone();
    await this.emitter.emit({ type: 'succeed', text: 'Cloning project' });
  }

  static from(config: Config, emitter: Emitter) {
    return new Git(GitGateway.from(config), emitter);
  }
}
