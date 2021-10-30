import chalk from 'chalk';
import execa from 'execa';
import { Config } from './utils/config';
import { log } from './utils/log';

export class Packager {
  constructor(private readonly config: Config = new Config()) {}

  async pack(): Promise<void> {
    log.info(chalk.green('Packaging project'));
    await this.clean();
    await this.mkTmpBuildDir();
    await this.cdTmpBuildDir();
    await this.clone();
  }

  async clean(): Promise<void> {
    log.info(chalk.green('Removing tmp and artifact build paths'));
    await Promise.all([
      execa('npx', ['rimraf', this.config.tmpBuildPath()]),
      execa('npx', ['rimraf', this.config.artifactBuildPath()]),
    ]);
  }

  private async mkTmpBuildDir(): Promise<void> {
    await execa('mkdir', ['-p', this.config.tmpBuildPath()]);
  }

  private async cdTmpBuildDir(): Promise<void> {
    await execa('cd', [this.config.tmpBuildPath()]);
  }

  private async clone(): Promise<void> {
    const { url, branch } = this.config.options.git;

    await execa('git', [
      'clone',
      url,
      '-b',
      branch,
      this.config.tmpBuildPath(),
    ]);
  }
}
