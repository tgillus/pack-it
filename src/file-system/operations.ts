import { deleteSync } from 'del';
import makeDir from 'make-dir';
import { isDirectorySync } from 'path-type';

export class Operations {
  rm(patterns: readonly string[]) {
    deleteSync(patterns);
  }

  mkdir(path: string) {
    makeDir.sync(path);
  }

  isDir(path: string) {
    return isDirectorySync(path);
  }
}
