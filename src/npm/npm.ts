import { Task } from '../cli/ui/task-list.js';
import { Config } from '../config/config.js';
import { Process } from '../process/process.js';

export class Npm {
  constructor(
    private readonly config: Config,
    private readonly process: Process
  ) {}

  async installDeps() {
    await this.process.exec('npm', ['install'], this.config.packItDir);
  }

  async build() {
    await this.process.exec('npm', ['run', 'build'], this.config.packItDir);
  }

  async cleanModules() {
    await this.process.exec(
      'npm',
      ['run', 'clean:modules'],
      this.config.packItDir
    );
  }

  async installProdDeps() {
    await this.process.exec(
      'npm',
      ['install', '--production'],
      this.config.packItDir
    );
  }

  tasks() {
    return [
      new Task({
        title: 'Installing dependencies',
        action: this.installDeps.bind(this),
      }),
      new Task({
        title: 'Building project',
        action: this.build.bind(this),
      }),
      new Task({
        title: 'Deleting project dependencies',
        action: this.cleanModules.bind(this),
      }),
      new Task({
        title: 'Installing project production dependencies',
        action: this.installProdDeps.bind(this),
      }),
    ];
  }

  static from(config: Config) {
    return new Npm(config, new Process());
  }
}
