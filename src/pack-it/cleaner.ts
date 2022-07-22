import { Config } from '../config/config.js';
import { FileSystem } from '../file/file-system.js';

export class Cleaner {
  constructor(
    private readonly config: Config,
    private readonly fs: FileSystem
  ) {}

  clean() {
    this.fs.rm([this.config.tmpDir]);
  }

  static from(config: Config) {
    return new Cleaner(config, new FileSystem());
  }
}
