import chalk from 'chalk';
import execa from 'execa';
import { Config } from './utils/config';
import { log } from './utils/log';
import path from 'path';
import fs from 'fs';
import archiver from 'archiver';
import { emoji } from 'node-emoji';

export class Packager {
  constructor(private readonly config: Config) {}

  async pack(): Promise<void> {
    log.info(chalk.green(`${emoji.white_check_mark} Packaging project`));

    await this.clean();
    await this.mkTmpDir();
    await this.clone();
    await this.installAllDependencies();
    await this.build();
    await this.cleanDependencies();
    await this.installProductionDependencies();
    await this.mkArtifactDir();
    await this.createArtifact();

    log.info(chalk.green(`${emoji[100]} Packaging complete`));
  }

  async clean(): Promise<void> {
    log.info(
      chalk.green(
        `${emoji.white_check_mark} Removing tmp build and build artifact paths`
      )
    );

    await Promise.all([
      execa('npx', ['rimraf', this.config.fullTmpPath]),
      execa('npx', ['rimraf', this.config.fullArtifactPath]),
    ]);

    log.info(chalk.green(`${emoji[100]} Cleaning complete`));
  }

  private async mkTmpDir(): Promise<void> {
    await execa('mkdir', ['-p', this.config.fullTmpPath]);
  }

  private async clone(): Promise<void> {
    const { gitUrl, gitBranch } = this.config;

    log.info(chalk.green(`${emoji.white_check_mark} Cloning project`));
    await execa('git', [
      'clone',
      gitUrl,
      '-b',
      gitBranch,
      this.config.fullTmpPath,
    ]);
  }

  private async installAllDependencies(): Promise<void> {
    log.info(
      chalk.green(`${emoji.white_check_mark} Installing project dependencies`)
    );
    await execa('npm', ['install'], {
      cwd: this.config.fullTmpPath,
    });
  }

  private async build(): Promise<void> {
    log.info(chalk.green(`${emoji.white_check_mark} Building project`));
    await execa('npm', ['run', 'build'], {
      cwd: this.config.fullTmpPath,
    });
  }

  private async cleanDependencies(): Promise<void> {
    log.info(
      chalk.green(`${emoji.white_check_mark} Cleaning project dependencies`)
    );
    await execa('rm', ['-rf', 'node_modules'], {
      cwd: this.config.fullTmpPath,
    });
  }

  private async installProductionDependencies(): Promise<void> {
    log.info(
      chalk.green(
        `${emoji.white_check_mark} Installing production dependencies`
      )
    );
    await execa('npm', ['install', '--production'], {
      cwd: this.config.fullTmpPath,
    });
  }

  private async mkArtifactDir(): Promise<void> {
    await execa('mkdir', ['-p', this.config.fullArtifactPath]);
  }

  private async createArtifact(): Promise<void> {
    const fullSrcPath = this.config.fullSrcPath;
    const nodeModulesPath = path.join(this.config.fullTmpPath, 'node_modules');
    const zipFileName = `${this.config.projectName}-${this.config.projectVersion}.zip`;
    const fullZipPath = path.join(this.config.fullArtifactPath, zipFileName);
    const zipStream = fs.createWriteStream(fullZipPath);
    const archive = archiver('zip');

    log.info(chalk.green(`${emoji.white_check_mark} Creating build artifact`));

    archive.pipe(zipStream);
    archive.directory(fullSrcPath, this.config.srcDir);
    archive.directory(nodeModulesPath, 'node_modules');
    archive.finalize();
  }
}
