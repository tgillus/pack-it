import path from 'path';
import { Config } from '../config/config.js';
import { FileSystem } from '../file-system/file-system.js';
import { Step } from './pack-it.js';

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

  steps(): Step[] {
    const {
      packItDir,
      zip: { destination },
    } = this.config;

    return [
      {
        description: `Deleting ${path.basename(packItDir)} and ${path.basename(
          destination
        )}`,
        action: this.clean,
      },
    ];
  }

  static from(config: Config) {
    return new Cleaner(config, FileSystem.build());
  }
}
