import path from 'path';
import { Ingredients } from '../../ingredients/ingredients.js';
import { FileSystem } from '../../utensils/file-system/file-system.js';
import { Recipe, Step } from '../recipe.js';

export class Groundwork implements Recipe {
  constructor(
    private readonly ingredients: Ingredients,
    private readonly fs: FileSystem
  ) {}

  get steps(): readonly Step[] {
    const {
      feastDir,
      zip: { destination },
    } = this.ingredients;

    return [
      {
        description: `Creating ${path.basename(feastDir)} and ${path.basename(
          destination
        )}`,
        perform: this.setup,
      },
    ];
  }

  private setup = async () => {
    const {
      feastDir,
      zip: { destination },
    } = this.ingredients;

    this.fs.mkdir(feastDir);
    this.fs.mkdir(destination);
  };

  static from(ingredients: Ingredients) {
    return new Groundwork(ingredients, FileSystem.build());
  }
}
