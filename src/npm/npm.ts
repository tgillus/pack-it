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
    await this.emitter.emit({
      type: 'start',
      text: 'Installing project dependencies',
    });
    await this.process.exec('npm', ['install'], this.config.tmpDir);
    await this.emitter.emit({
      type: 'succeed',
      text: 'Installing project dependencies',
    });
  }

  async build() {
    await this.emitter.emit({ type: 'start', text: 'Building project' });
    await this.process.exec('npm', ['run', 'build'], this.config.tmpDir);
    await this.emitter.emit({ type: 'succeed', text: 'Building project' });
  }

  async cleanModules() {
    await this.emitter.emit({
      type: 'start',
      text: 'Cleaning project dependencies',
    });
    await this.process.exec(
      'npm',
      ['run', 'clean:modules'],
      this.config.tmpDir
    );
    await this.emitter.emit({
      type: 'succeed',
      text: 'Cleaning project dependencies',
    });
  }

  async installProduction() {
    await this.emitter.emit({
      type: 'start',
      text: 'Installing production dependencies',
    });
    await this.process.exec(
      'npm',
      ['install', '--production'],
      this.config.tmpDir
    );
    await this.emitter.emit({
      type: 'succeed',
      text: 'Installing production dependencies',
    });
  }

  static from(config: Config, emitter: Emitter) {
    return new Npm(config, new Process(), emitter);
  }
}
