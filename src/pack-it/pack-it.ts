import { Config } from '../config/config.js';
import { FileSystem } from '../file/file-system.js';
import { GitGateway } from '../git/git-gateway.js';

export class PackIt {
  constructor(
    private readonly preparer: Preparer,
    private readonly builder: Builder,
    private readonly cleaner: Cleaner
  ) {}

  prepare() {
    this.preparer.prepare();
  }

  build() {
    this.prepare();
    this.builder.build();
  }

  clean() {
    this.cleaner.clean();
  }

  static from(config: Config) {
    return new PackIt(
      Preparer.from(config),
      Builder.from(config),
      Cleaner.from(config)
    );
  }
}

export class Builder {
  constructor(private readonly gitGateway: GitGateway) {}

  build() {
    this.gitGateway.clone();
  }

  static from(config: Config) {
    return new Builder(GitGateway.from(config));
  }
}

export class Cleaner {
  constructor(
    private readonly config: Config,
    private readonly fs: FileSystem
  ) {}

  clean() {
    this.fs.rm([this.config.tmpDir]);
  }

  static from(config: Config) {
    return new Cleaner(config, new FileSystem());
  }
}

export class Preparer {
  constructor(
    private readonly config: Config,
    private readonly fs: FileSystem
  ) {}

  prepare() {
    this.fs.mkdir(this.config.tmpDir);
  }

  static from(config: Config) {
    return new Preparer(config, new FileSystem());
  }
}
