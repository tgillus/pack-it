import { Config } from '../config/config.js';
import { Step } from '../pack-it/pack-it.js';
import { Process } from '../process/process.js';

export class Npm {
  constructor(
    private readonly config: Config,
    private readonly process: Process
  ) {}

  installDeps = async () => {
    await this.process.exec('npm', ['install'], this.config.packItDir);
  };

  build = async () => {
    await this.process.exec('npm', ['run', 'build'], this.config.packItDir);
  };

  cleanModules = async () => {
    await this.process.exec(
      'npm',
      ['run', 'clean:modules'],
      this.config.packItDir
    );
  };

  installProdDeps = async () => {
    await this.process.exec(
      'npm',
      ['install', '--production'],
      this.config.packItDir
    );
  };

  steps(): Step[] {
    return [
      {
        description: 'Installing dependencies',
        action: this.installDeps,
      },
      {
        description: 'Building project',
        action: this.build,
      },
      {
        description: 'Deleting project dependencies',
        action: this.cleanModules,
      },
      {
        description: 'Installing project production dependencies',
        action: this.installProdDeps,
      },
    ];
  }

  static from(config: Config) {
    return new Npm(config, new Process());
  }
}
