import { execa } from 'execa';

export class Process {
  async exec(file: string, args?: readonly string[], cwd?: string) {
    await execa(file, args, { cwd });
  }
}
