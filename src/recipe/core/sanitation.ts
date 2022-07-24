import path from 'path';
import { Ingredients } from '../../ingredients/ingredients.js';
import { FileSystem } from '../../utensils/file-system/file-system.js';
import { Recipe, Step } from '../recipe.js';

export class Sanitation implements Recipe {
  constructor(
    private readonly ingredients: Ingredients,
    private readonly fs: FileSystem
  ) {}

  get steps(): Step[] {
    const {
      feastDir,
      zip: { destination },
    } = this.ingredients;

    return [
      {
        description: `Deleting ${path.basename(feastDir)} and ${path.basename(
          destination
        )}`,
        perform: this.sanitize,
      },
    ];
  }

  private sanitize = async () => {
    const {
      feastDir,
      zip: { destination },
    } = this.ingredients;

    await this.fs.rm([feastDir, destination]);
  };

  static from(ingredients: Ingredients) {
    return new Sanitation(ingredients, FileSystem.build());
  }
}
