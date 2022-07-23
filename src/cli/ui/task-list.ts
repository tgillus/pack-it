import { Listr, ListrTask } from 'listr2';
import { Step } from '../../pack-it/pack-it.js';

export class TaskList {
  private readonly list: Listr;

  constructor(tasks: Task[]) {
    this.list = new Listr(tasks);
  }

  async run() {
    await this.list.run();
  }

  static from(steps: Step[]) {
    return new TaskList(steps.map((step) => Task.from(step)));
  }
}

class Task implements ListrTask {
  constructor(
    public readonly title: string,
    public readonly task: () => Promise<void>
  ) {}

  static from(step: Step): Task {
    const { description, action } = step;

    return {
      title: description,
      task: async () => {
        await action();
      },
    };
  }
}
