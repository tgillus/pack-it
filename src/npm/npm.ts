import { Config } from '../config/config.js';
import { Process } from '../process/process.js';

export class Npm {
  constructor(
    private readonly config: Config,
    private readonly process: Process
  ) {}

  install() {
    this.process.exec('npm', ['install'], this.config.tmpDir);
  }

  build() {
    this.process.exec('npm', ['run', 'build'], this.config.tmpDir);
  }

  static from(config: Config) {
    return new Npm(config, new Process());
  }
}
