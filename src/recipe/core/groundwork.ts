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
      packItDir,
      zip: { destination },
    } = this.ingredients;

    return [
      {
        description: `Create ${path.basename(packItDir)} and ${path.basename(
          destination
        )}`,
        perform: this.setup,
      },
    ];
  }

  private setup = async () => {
    const {
      packItDir,
      zip: { destination },
    } = this.ingredients;

    this.fs.mkdir(packItDir);
    this.fs.mkdir(destination);
  };

  static from(ingredients: Ingredients) {
    return new Groundwork(ingredients, FileSystem.build());
  }
}
