import { Listr, ListrTask } from 'listr2';

export class TaskList {
  constructor(private readonly tasks: Task[]) {}

  async run() {
    await new Listr(this.tasks.map((task) => task.prepare())).run();
  }

  static from(tasks: Task[]) {
    return new TaskList(tasks);
  }
}

export class Task {
  constructor(private readonly item: TaskListItem) {}

  prepare(): ListrTask {
    const { action, title } = this.item;

    return {
      title,
      task: async () => {
        await action();
      },
    };
  }
}

export interface TaskListItem {
  readonly title: string;
  readonly action: () => Promise<void>;
}
