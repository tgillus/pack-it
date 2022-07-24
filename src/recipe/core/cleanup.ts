import path from 'path';
import { Ingredients } from '../../ingredients/ingredients.js';
import { FileSystem } from '../../utensils/file-system/file-system.js';
import { Recipe, Step } from '../recipe.js';

export class Cleanup implements Recipe {
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
        description: `Delete ${path.basename(packItDir)} and ${path.basename(
          destination
        )}`,
        perform: this.clean,
      },
    ];
  }

  private clean = async () => {
    const {
      packItDir,
      zip: { destination },
    } = this.ingredients;

    await this.fs.rm(packItDir, destination);
  };

  static from(ingredients: Ingredients) {
    return new Cleanup(ingredients, FileSystem.build());
  }
}
