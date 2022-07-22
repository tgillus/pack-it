import Emittery from 'emittery';
import { Spinner } from '../cli/spinner/spinner.js';

export class Emitter {
  private readonly emittery = new Emittery<{
    start: string;
    succeed: string;
  }>();

  constructor(spinner: Spinner) {
    this.emittery.on('start', (text) => {
      spinner.start(text);
    });
    this.emittery.on('succeed', (text) => {
      spinner.succeed(text);
    });
  }

  async start(text: string) {
    await this.emittery.emit('start', text);
  }

  async succeed(text: string) {
    await this.emittery.emit('succeed', text);
  }
}
