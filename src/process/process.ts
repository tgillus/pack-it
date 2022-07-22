import { execaSync } from 'execa';

export class Process {
  exec(file: string, args?: readonly string[]) {
    execaSync(file, args);
  }
}
