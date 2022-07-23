import path from 'path';
import { Task } from '../cli/ui/task-list.js';
import { Config } from '../config/config.js';
import { FileSystem } from '../file-system/file-system.js';

export class Cleaner {
  constructor(
    private readonly config: Config,
    private readonly fs: FileSystem
  ) {}

  clean = async () => {
    const {
      packItDir,
      zip: { destination },
    } = this.config;

    await this.fs.rm([packItDir, destination]);
  };

  tasks() {
    const {
      packItDir,
      zip: { destination },
    } = this.config;

    return [
      new Task({
        title: `Deleting ${path.basename(packItDir)} and ${path.basename(
          destination
        )}`,
        action: this.clean,
      }),
    ];
  }

  static from(config: Config) {
    return new Cleaner(config, FileSystem.build());
  }
}
