import { Config } from '../config/config.js';
import { Builder } from './builder.js';
import { Cleaner } from './cleaner.js';
import { Preparer } from './preparer.js';

export class PackIt {
  constructor(
    private readonly preparer: Preparer,
    private readonly builder: Builder,
    private readonly cleaner: Cleaner
  ) {}

  tasks() {
    return [
      ...this.cleaner.tasks(),
      ...this.preparer.tasks(),
      ...this.builder.tasks(),
    ];
  }

  static from(config: Config) {
    return new PackIt(
      Preparer.from(config),
      Builder.from(config),
      Cleaner.from(config)
    );
  }
}
