import { Task } from '../cli/ui/task-list.js';
import { Config } from '../config/config.js';
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

  tasks() {
    return [
      new Task({
        title: 'Installing dependencies',
        action: this.installDeps,
      }),
      new Task({
        title: 'Building project',
        action: this.build,
      }),
      new Task({
        title: 'Deleting project dependencies',
        action: this.cleanModules,
      }),
      new Task({
        title: 'Installing project production dependencies',
        action: this.installProdDeps,
      }),
    ];
  }

  static from(config: Config) {
    return new Npm(config, new Process());
  }
}
