import { Task } from '../cli/ui/task-list.js';
import { Config } from '../config/config.js';
import { Process } from '../process/process.js';

export class Npm {
  constructor(
    private readonly config: Config,
    private readonly process: Process
  ) {}

  async install() {
    await this.process.exec('npm', ['install'], this.config.tmpDir);
  }

  async build() {
    await this.process.exec('npm', ['run', 'build'], this.config.tmpDir);
  }

  async cleanModules() {
    await this.process.exec(
      'npm',
      ['run', 'clean:modules'],
      this.config.tmpDir
    );
  }

  async installProduction() {
    await this.process.exec(
      'npm',
      ['install', '--production'],
      this.config.tmpDir
    );
  }

  tasks() {
    return [
      new Task({
        title: 'Installing dependencies',
        action: this.install.bind(this),
      }),
      new Task({
        title: 'Building project',
        action: this.build.bind(this),
      }),
      new Task({
        title: 'Deleting dependencies',
        action: this.cleanModules.bind(this),
      }),
      new Task({
        title: 'Installing production dependencies',
        action: this.installProduction.bind(this),
      }),
    ];
  }

  static from(config: Config) {
    return new Npm(config, new Process());
  }
}
