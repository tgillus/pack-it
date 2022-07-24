import { Operations } from './operations.js';
import { Zip } from './zip.js';

export class FileSystem {
  constructor(
    private readonly operations: Operations,
    private readonly zipper: Zip
  ) {}

  async rm(...patterns: readonly string[]) {
    await this.operations.rm(patterns);
  }

  async mkdir(path: string) {
    await this.operations.mkdir(path);
  }

  async zip(destination: string, ...patterns: readonly string[]) {
    await this.zipper.zip(this.operations.writeStream(destination), patterns);
  }

  static build() {
    return new FileSystem(new Operations(), new Zip());
  }
}
