import chalk from 'chalk';
import execa from 'execa';
import { Config } from './utils/config';
import { log } from './utils/log';

export class Packager {
  constructor(private readonly config: Config = new Config()) {}

  async pack(): Promise<void> {
    log.info(chalk.green('packaging'));
    await this.clean();
  }

  async clean(): Promise<void> {
    log.info(chalk.green('removing tmp and artifact build paths'));
    await Promise.all([
      execa('npx', ['rimraf', this.config.tmpBuildPath()]),
      execa('npx', ['rimraf', this.config.artifactBuildPath()]),
    ]);
  }
}
