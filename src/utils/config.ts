import path from 'path';
import AppRootDir from 'app-root-dir';
import { cosmiconfigSync } from 'cosmiconfig';
import * as _ from 'lodash';

export interface PackItConfigOptions {
  stage: {
    name: string;
  };
  git: {
    url: string;
    branch: string;
  };
  tmpDir: string;
  artifactDir: string;
  srcDir: string;
}

export class Config {
  private readonly options: PackItConfigOptions;
  private readonly localOptions: PackItConfigOptions;
  private readonly defaultOptions = {
    tmpDir: '.tmp',
    artifactDir: 'deploy',
    srcDir: 'src',
  };

  constructor() {
    this.localOptions = this.loadLocalOptions();
    this.options = this.mergeOptions();
  }

  get gitUrl(): string {
    return this.options.git.url;
  }

  get gitBranch(): string {
    return this.options.git.branch;
  }

  get fullTmpPath(): string {
    return path.join(AppRootDir.get(), this.options.tmpDir);
  }

  get fullArtifactPath(): string {
    return path.join(AppRootDir.get(), this.options.artifactDir);
  }

  get srcDir(): string {
    return this.options.srcDir;
  }

  get fullSrcPath(): string {
    return path.join(this.fullTmpPath, this.srcDir);
  }

  private loadLocalOptions(): PackItConfigOptions {
    const explorer = cosmiconfigSync('pack-it');
    const result = explorer.search();

    if (!result) {
      throw new Error('Pack It! configuration not found');
    }

    return result.config as PackItConfigOptions;
  }

  private mergeOptions(): PackItConfigOptions {
    return _.defaultsDeep(
      this.localOptions,
      this.defaultOptions
    ) as PackItConfigOptions;
  }
}
