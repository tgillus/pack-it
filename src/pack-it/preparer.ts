import path from 'path';
import { Config } from '../config/config.js';
import { FileSystem } from '../file-system/file-system.js';
import { Step } from './pack-it.js';

export class Preparer {
  constructor(
    private readonly config: Config,
    private readonly fs: FileSystem
  ) {}

  prepare = async () => {
    const {
      packItDir,
      zip: { destination },
    } = this.config;

    this.fs.mkdir(packItDir);
    this.fs.mkdir(destination);
  };

  steps(): Step[] {
    const {
      packItDir,
      zip: { destination },
    } = this.config;

    return [
      {
        description: `Creating ${path.basename(packItDir)} and ${path.basename(
          destination
        )}`,
        action: this.prepare,
      },
    ];
  }

  static from(config: Config) {
    return new Preparer(config, FileSystem.build());
  }
}
