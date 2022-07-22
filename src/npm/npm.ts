import { Config } from '../config/config.js';
import { Emitter } from '../emitter/emitter.js';
import { Process } from '../process/process.js';

export class Npm {
  constructor(
    private readonly config: Config,
    private readonly process: Process,
    private readonly emitter: Emitter
  ) {}

  async install() {
    await this.emitter.start('Installing project dependencies');
    await this.process.exec('npm', ['install'], this.config.tmpDir);
    await this.emitter.succeed('Installing project dependencies');
  }

  async build() {
    await this.emitter.start('Building project');
    await this.process.exec('npm', ['run', 'build'], this.config.tmpDir);
    await this.emitter.succeed('Building project');
  }

  async cleanModules() {
    await this.emitter.start('Deleting project dependencies');
    await this.process.exec(
      'npm',
      ['run', 'clean:modules'],
      this.config.tmpDir
    );
    await this.emitter.succeed('Deleting project dependencies');
  }

  async installProduction() {
    await this.emitter.start('Installing production dependencies');
    await this.process.exec(
      'npm',
      ['install', '--production'],
      this.config.tmpDir
    );
    await this.emitter.succeed('Installing production dependencies');
  }

  static from(config: Config, emitter: Emitter) {
    return new Npm(config, new Process(), emitter);
  }
}
