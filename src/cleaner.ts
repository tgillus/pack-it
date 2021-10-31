import chalk from 'chalk';
import { emoji } from 'node-emoji';
import execa from 'execa';
import { Config } from './utils/config';
import { log } from './utils/log';

export class Cleaner {
  constructor(private readonly config: Config) {}

  async clean(): Promise<void> {
    log.info(chalk.green(`${emoji.rainbow} Cleaning project`));
    log.info(
      chalk.green(`${emoji.white_check_mark} Removing tmp and artifact paths`)
    );

    await Promise.all([
      execa('npx', ['rimraf', this.config.fullTmpPath]),
      execa('npx', ['rimraf', this.config.fullArtifactPath]),
    ]);

    log.info(chalk.green(`${emoji[100]} Cleaning complete`));
  }
}
