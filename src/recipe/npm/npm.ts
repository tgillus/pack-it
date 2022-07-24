import { Ingredients } from '../../ingredients/ingredients.js';
import { Process } from '../../utensils/process/process.js';
import { Recipe, Step } from '../recipe.js';

export class Npm implements Recipe {
  constructor(
    private readonly ingredients: Ingredients,
    private readonly process: Process
  ) {}

  get steps(): Step[] {
    return [
      {
        description: 'Installing dependencies',
        perform: this.installDeps,
      },
      {
        description: 'Building project',
        perform: this.build,
      },
      {
        description: 'Deleting project dependencies',
        perform: this.cleanModules,
      },
      {
        description: 'Installing project production dependencies',
        perform: this.installProdDeps,
      },
    ];
  }

  private installDeps = async () => {
    await this.process.exec('npm', ['install'], this.ingredients.feastDir);
  };

  private build = async () => {
    await this.process.exec('npm', ['run', 'build'], this.ingredients.feastDir);
  };

  private cleanModules = async () => {
    await this.process.exec(
      'npm',
      ['run', 'clean:modules'],
      this.ingredients.feastDir
    );
  };

  private installProdDeps = async () => {
    await this.process.exec(
      'npm',
      ['install', '--production'],
      this.ingredients.feastDir
    );
  };

  static from(ingredients: Ingredients) {
    return new Npm(ingredients, new Process());
  }
}
