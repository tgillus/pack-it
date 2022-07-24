import { Ingredients } from '../../ingredients/ingredients.js';
import { Process } from '../../utensils/process/process.js';
import { Recipe, Step } from '../recipe.js';

export class Npm implements Recipe {
  constructor(
    private readonly ingredients: Ingredients,
    private readonly process: Process
  ) {}

  get steps(): readonly Step[] {
    return [
      {
        description: 'Install dependencies',
        perform: this.installDeps,
      },
      {
        description: 'Build project',
        perform: this.build,
      },
      {
        description: 'Delete dependencies',
        perform: this.cleanModules,
      },
      {
        description: 'Install production dependencies',
        perform: this.installProdDeps,
      },
    ];
  }

  private installDeps = async () => {
    await this.process.exec('npm', ['install'], this.ingredients.packItDir);
  };

  private build = async () => {
    await this.process.exec(
      'npm',
      ['run', 'build'],
      this.ingredients.packItDir
    );
  };

  private cleanModules = async () => {
    await this.process.exec(
      'npm',
      ['run', 'clean:modules'],
      this.ingredients.packItDir
    );
  };

  private installProdDeps = async () => {
    await this.process.exec(
      'npm',
      ['install', '--production'],
      this.ingredients.packItDir
    );
  };

  static from(ingredients: Ingredients) {
    return new Npm(ingredients, new Process());
  }
}
