import ora from 'ora';
import { EmitterListener } from '../emitter/emitter.js';

export class Spinner implements EmitterListener {
  private readonly spinner = ora();

  start(text: string) {
    this.spinner.start(text);
  }

  succeed(text: string) {
    this.spinner.succeed(text);
  }
}
