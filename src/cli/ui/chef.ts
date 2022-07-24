import { Listr } from 'listr2';
import { Step } from '../../recipe/recipe.js';

export class Chef {
  private constructor(private readonly actions: Listr) {}

  async prepare() {
    await this.actions.run();
  }

  static from(steps: Step[]) {
    return new Chef(new Listr(Chef.tasks(steps)));
  }

  private static tasks(steps: Step[]) {
    return steps.map(({ description: title, perform: task }) => ({
      title,
      task,
    }));
  }
}
