import { Process } from '../process/process.js';

export class GitGateway {
  constructor(private readonly process: Process) {}

  async clone(url: string, branch: string, destination: string) {
    await this.process.exec('git', [
      'clone',
      '-b',
      branch,
      '--single-branch',
      url,
      destination,
    ]);
  }

  static build() {
    return new GitGateway(new Process());
  }
}
