import { deleteAsync } from 'del';
import fs from 'fs';
import makeDir from 'make-dir';

export class Operations {
  async rm(patterns: readonly string[]) {
    await deleteAsync(patterns);
  }

  async mkdir(path: string) {
    await makeDir(path);
  }

  writeStream(path: string) {
    return fs.createWriteStream(path);
  }
}
