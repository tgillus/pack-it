import path from 'path';
import { Task } from '../cli/ui/task-list.js';
import { Config } from '../config/config.js';
import { FileSystem } from '../file-system/file-system.js';

export class Preparer {
  constructor(
    private readonly config: Config,
    private readonly fs: FileSystem
  ) {}

  async prepare() {
    const {
      tmpDir,
      zip: { destination },
    } = this.config;

    this.fs.mkdir(tmpDir);
    this.fs.mkdir(destination);
  }

  tasks() {
    const {
      packItDir,
      zip: { destination },
    } = this.config;

    return [
      new Task({
        title: `Creating ${path.basename(packItDir)} and ${path.basename(
          destination
        )}`,
        action: this.prepare.bind(this),
      }),
    ];
  }

  static from(config: Config) {
    return new Preparer(config, FileSystem.build());
  }
}
