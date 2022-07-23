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

  steps(command: 'clean' | 'build') {
    switch (command) {
      case 'clean':
        return [...this.cleaner.steps()];
      case 'build':
      default:
        return [
          ...this.cleaner.steps(),
          ...this.preparer.steps(),
          ...this.builder.steps(),
        ];
    }
  }

  static from(config: Config) {
    return new PackIt(
      Preparer.from(config),
      Builder.from(config),
      Cleaner.from(config)
    );
  }
}

export interface Step {
  readonly description: string;
  readonly action: () => Promise<void>;
}
