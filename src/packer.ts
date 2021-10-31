import chalk from 'chalk';
import { emoji } from 'node-emoji';
import execa from 'execa';
import fs from 'fs';
import path from 'path';
import archiver from 'archiver';
import { Config } from './utils/config';
import { Cleaner } from './cleaner';
import { log } from './utils/log';

export class Packer {
  constructor(
    private readonly config: Config,
    private readonly cleaner: Cleaner
  ) {}

  async pack(): Promise<void> {
    await this.cleaner.clean();

    log.info(chalk.green(`${emoji.rainbow} Packing project`));

    await this.mkTmpDir();
    await this.clone();
    await this.installAllDependencies();
    await this.build();
    await this.cleanDependencies();
    await this.installProductionDependencies();
    await this.mkArtifactDir();
    await this.createArtifact();

    log.info(chalk.green(`${emoji[100]} Packing complete`));
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
    const fullIncludeDirPaths = this.config.fullIncludeDirPaths;
    const zipFileName = `${this.config.projectName}-${this.config.projectVersion}.zip`;
    const fullZipPath = path.join(this.config.fullArtifactPath, zipFileName);
    const zipStream = fs.createWriteStream(fullZipPath);
    const archive = archiver('zip');

    log.info(chalk.green(`${emoji.white_check_mark} Creating build artifact`));

    archive.pipe(zipStream);
    fullIncludeDirPaths.forEach((fullIncludeDirPath) => {
      archive.directory(fullIncludeDirPath, path.basename(fullIncludeDirPath));
    });
    archive.finalize();
  }
}
