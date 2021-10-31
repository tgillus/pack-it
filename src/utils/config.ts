import path from 'path';
import AppRootDir from 'app-root-dir';
import { cosmiconfigSync } from 'cosmiconfig';
import * as _ from 'lodash';

export interface PackItConfigOptions {
  projectName: string;
  stage: {
    name: string;
  };
  git: {
    url: string;
    branch: string;
  };
  tmpDir: string;
  artifactDir: string;
  includeDirs: string[];
}

export class Config {
  public readonly projectVersion: string;

  private readonly options: PackItConfigOptions;
  private readonly localOptions: PackItConfigOptions;
  private readonly defaultOptions = {
    tmpDir: '.tmp',
    artifactDir: 'deploy',
    includeDirs: ['src', 'node_modules'],
  };

  constructor() {
    this.projectVersion = this.loadVersionFromPackage();
    this.localOptions = this.loadLocalOptions();
    this.options = this.mergeOptions();
  }

  get projectName(): string {
    return this.options.projectName;
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

  get includeDirs(): string[] {
    return this.options.includeDirs;
  }

  get fullIncludeDirPaths(): string[] {
    return this.includeDirs.map((includeDir) =>
      path.join(this.fullTmpPath, includeDir)
    );
  }

  private loadVersionFromPackage(): string {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { version } = require(`${AppRootDir.get()}/package.json`);

    return version;
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
