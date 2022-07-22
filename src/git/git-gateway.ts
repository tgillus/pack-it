import { Config } from '../config/config.js';
import { Process } from '../process/process.js';

export class GitGateway {
  constructor(
    private readonly config: Config,
    private readonly process: Process
  ) {}

  async clone() {
    const {
      git: { branch = 'main', url },
      tmpDir,
    } = this.config;

    await this.process.exec('git', [
      'clone',
      '-b',
      branch,
      '--single-branch',
      url,
      tmpDir,
    ]);
  }

  static from(config: Config) {
    return new GitGateway(config, new Process());
  }
}
