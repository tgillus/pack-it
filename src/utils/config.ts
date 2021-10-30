import path from 'path';
import AppRootDir from 'app-root-dir';
import { cosmiconfigSync } from 'cosmiconfig';

export interface PackItConfigOptions {
  stage: {
    name: string;
  };
  git: {
    url: string;
    branch: string;
  };
}

export class Config {
  public readonly options: PackItConfigOptions;

  constructor() {
    const explorer = cosmiconfigSync('pack-it');
    const result = explorer.search();

    if (!result) {
      throw new Error('Pack It! configuration not found');
    }

    this.options = result.config as PackItConfigOptions;
  }

  tmpBuildPath(): string {
    return path.join(AppRootDir.get(), '.tmp-build');
  }

  artifactBuildPath(): string {
    return path.join(AppRootDir.get(), 'deploy');
  }
}
