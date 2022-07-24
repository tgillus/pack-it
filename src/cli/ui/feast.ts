import { Listr } from 'listr2';
import { Step } from '../../recipe/recipe.js';

export class Feast {
  private constructor(private readonly actions: Listr) {}

  async prepare() {
    await this.actions.run();
  }

  static from(steps: readonly Step[]) {
    return new Feast(new Listr(Feast.tasks(steps)));
  }

  private static tasks(steps: readonly Step[]) {
    return steps.map(({ description: title, perform: task }) => ({
      title,
      task,
    }));
  }
}
