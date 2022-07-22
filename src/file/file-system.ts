import { deleteSync } from 'del';
import makeDir from 'make-dir';

export class FileSystem {
  rm(patterns: readonly string[]) {
    deleteSync(patterns);
  }

  mkdir(path: string) {
    makeDir.sync(path);
  }
}
