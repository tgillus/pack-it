import { Operations } from './operations.js';

export class FileSystem {
  constructor(private readonly operations: Operations) {}

  rm(patterns: readonly string[]) {
    this.operations.rm(patterns);
  }

  mkdir(path: string) {
    this.operations.mkdir(path);
  }

  isDir(path: string) {
    this.operations.isDir(path);
  }

  static build() {
    return new FileSystem(new Operations());
  }
}
