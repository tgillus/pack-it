import Emittery from 'emittery';
import { Spinner } from '../cli/spinner/spinner.js';

export interface Event {
  type: EventType;
  text: string;
}

type EventType = 'start' | 'succeed';

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

  async emit({ type, text }: Event) {
    await this.emittery.emit(type, text);
  }
}
