import Emittery from 'emittery';

export interface EmitterListener {
  start(text: string): void;
  succeed(text: string): void;
}

export class Emitter {
  private readonly emittery = new Emittery<{
    start: string;
    succeed: string;
  }>();

  constructor(listeners: EmitterListener[]) {
    this.addListeners(listeners);
  }

  async start(text: string) {
    await this.emittery.emit('start', text);
  }

  async succeed(text: string) {
    await this.emittery.emit('succeed', text);
  }

  addListeners(listeners: EmitterListener[]) {
    listeners.forEach((listener) => {
      this.emittery.on('start', (text) => {
        listener.start(text);
      });

      this.emittery.on('succeed', (text) => {
        listener.succeed(text);
      });
    });
  }
}
