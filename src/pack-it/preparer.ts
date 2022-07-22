import { Config } from '../config/config.js';
import { FileSystem } from '../file-system/file-system.js';

export class Preparer {
  constructor(
    private readonly config: Config,
    private readonly fs: FileSystem
  ) {}

  prepare() {
    this.fs.mkdir(this.config.tmpDir);
  }

  static from(config: Config) {
    return new Preparer(config, FileSystem.build());
  }
}
