import { execaSync } from 'execa';

export class Process {
  exec(file: string, args?: readonly string[], cwd?: string) {
    execaSync(file, args, { cwd });
  }
}
