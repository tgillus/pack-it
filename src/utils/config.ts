import path from 'path';
import AppRootDir from 'app-root-dir';

export class Config {
  tmpBuildPath(): string {
    return path.join(AppRootDir.get(), '.tmp-build');
  }

  artifactBuildPath(): string {
    return path.join(AppRootDir.get(), 'deploy');
  }
}
