import { Config } from '../config/config.js';
import { Emitter } from '../emitter/emitter.js';
import { Process } from '../process/process.js';

export class Npm {
  constructor(
    private readonly config: Config,
    private readonly process: Process,
    private readonly emitter: NpmEmitter
  ) {}

  async install() {
    await this.emitter.installDepsStart();
    await this.process.exec('npm', ['install'], this.config.tmpDir);
    await this.emitter.installDepsSucceed();
  }

  async build() {
    await this.emitter.buildStart();
    await this.process.exec('npm', ['run', 'build'], this.config.tmpDir);
    await this.emitter.buildSucceed();
  }

  async cleanModules() {
    await this.emitter.deleteDepsStart();
    await this.process.exec(
      'npm',
      ['run', 'clean:modules'],
      this.config.tmpDir
    );
    await this.emitter.deleteDepsSucceed();
  }

  async installProduction() {
    await this.emitter.installProdDepsStart();
    await this.process.exec(
      'npm',
      ['install', '--production'],
      this.config.tmpDir
    );
    await this.emitter.installProdDepsSucceed();
  }

  static from(config: Config, emitter: Emitter) {
    return new Npm(config, new Process(), new NpmEmitter(emitter));
  }
}

export class NpmEmitter {
  private readonly installDepsText = 'Installing project dependencies';
  private readonly buildText = 'Building project';
  private readonly deleteDepsText = 'Deleting project dependencies';
  private readonly installProdDepsText =
    'Installing project production dependencies';

  constructor(private readonly emitter: Emitter) {}

  async installDepsStart() {
    await this.emitter.start(this.installDepsText);
  }

  async installDepsSucceed() {
    await this.emitter.succeed(this.installDepsText);
  }

  async buildStart() {
    await this.emitter.start(this.buildText);
  }

  async buildSucceed() {
    await this.emitter.succeed(this.installDepsText);
  }

  async deleteDepsStart() {
    await this.emitter.start(this.deleteDepsText);
  }

  async deleteDepsSucceed() {
    await this.emitter.succeed(this.deleteDepsText);
  }

  async installProdDepsStart() {
    await this.emitter.start(this.installProdDepsText);
  }

  async installProdDepsSucceed() {
    await this.emitter.succeed(this.installProdDepsText);
  }
}
