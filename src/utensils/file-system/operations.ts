import fs from 'fs';
import { deleteAsync } from 'del';
import makeDir from 'make-dir';
import { isDirectory } from 'path-type';

export class Operations {
  async rm(patterns: readonly string[]) {
    await deleteAsync(patterns);
  }

  async mkdir(path: string) {
    await makeDir(path);
  }

  async isDir(path: string) {
    return await isDirectory(path);
  }

  writeStream(path: string) {
    return fs.createWriteStream(path);
  }
}
