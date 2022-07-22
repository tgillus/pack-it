import { Config } from '../config/config.js';
import { Emitter, EmitterListener } from '../emitter/emitter.js';
import { Builder } from './builder.js';
import { Cleaner } from './cleaner.js';
import { Preparer } from './preparer.js';

export class PackIt {
  constructor(
    private readonly preparer: Preparer,
    private readonly builder: Builder,
    private readonly cleaner: Cleaner
  ) {}

  prepare() {
    this.preparer.prepare();
  }

  async build() {
    this.cleaner.clean();
    this.prepare();
    await this.builder.build();
  }

  clean() {
    this.cleaner.clean();
  }

  static from(config: Config, listeners: EmitterListener[] = []) {
    const emitter = new Emitter(listeners);

    return new PackIt(
      Preparer.from(config),
      Builder.from(config, emitter),
      Cleaner.from(config)
    );
  }
}
