import { Operations } from './operations.js';

export class FileSystem {
  constructor(private readonly operations: Operations) {}

  async rm(patterns: readonly string[]) {
    await this.operations.rm(patterns);
  }

  async mkdir(path: string) {
    await this.operations.mkdir(path);
  }

  async isDir(path: string) {
    await this.operations.isDir(path);
  }

  static build() {
    return new FileSystem(new Operations());
  }
}
