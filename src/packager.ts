import chalk from 'chalk';
import execa from 'execa';
import { Config } from './utils/config';
import { log } from './utils/log';
import path from 'path';
import fs from 'fs';
import archiver from 'archiver';

export class Packager {
  constructor(private readonly config: Config) {}

  async pack(): Promise<void> {
    log.info(chalk.green('Packaging project'));
    await this.clean();
    await this.mkTmpDir();
    await this.clone();
    await this.installAllDependencies();
    await this.build();
    await this.cleanDependencies();
    await this.installProductionDependencies();
    await this.mkArtifactDir();
    await this.createArtifact();
  }

  async clean(): Promise<void> {
    log.info(chalk.green('Removing tmp build and build artifact paths'));
    await Promise.all([
      execa('npx', ['rimraf', this.config.fullTmpPath]),
      execa('npx', ['rimraf', this.config.fullArtifactPath]),
    ]);
  }

  private async mkTmpDir(): Promise<void> {
    await execa('mkdir', ['-p', this.config.fullTmpPath]);
  }

  private async clone(): Promise<void> {
    const { gitUrl, gitBranch } = this.config;

    log.info(chalk.green('Cloning project'));
    await execa('git', [
      'clone',
      gitUrl,
      '-b',
      gitBranch,
      this.config.fullTmpPath,
    ]);
  }

  private async installAllDependencies(): Promise<void> {
    log.info(chalk.green('Installing project dependencies'));
    await execa('npm', ['install'], {
      cwd: this.config.fullTmpPath,
    });
  }

  private async build(): Promise<void> {
    log.info(chalk.green('Building project'));
    await execa('npm', ['run', 'build'], {
      cwd: this.config.fullTmpPath,
    });
  }

  private async cleanDependencies(): Promise<void> {
    log.info(chalk.green('Cleaning project dependencies'));
    await execa('rm', ['-rf', 'node_modules'], {
      cwd: this.config.fullTmpPath,
    });
  }

  private async installProductionDependencies(): Promise<void> {
    log.info(chalk.green('Installing production dependencies'));
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
    const fullZipPath = path.join(this.config.fullArtifactPath, 'foo.zip');
    const zipStream = fs.createWriteStream(fullZipPath);
    const archive = archiver('zip');

    log.info(chalk.green('Creating build artifact'));

    archive.pipe(zipStream);
    archive.directory(fullSrcPath, this.config.srcDir);
    archive.directory(nodeModulesPath, 'node_modules');
    archive.finalize();
  }
}
