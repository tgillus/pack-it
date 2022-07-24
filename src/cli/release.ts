import { Package } from '../utensils/pkg/package.js';

export class Release {
  public readonly version: string;

  constructor(pkg: Package) {
    this.version = pkg.packageVersion();
  }

  static build() {
    return new Release(new Package());
  }
}
