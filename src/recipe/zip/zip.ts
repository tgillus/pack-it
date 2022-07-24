import path from 'path';
import { Ingredients } from '../../ingredients/ingredients.js';
import { FileSystem } from '../../utensils/file-system/file-system.js';
import { Recipe, Step } from '../recipe.js';

export class Zip implements Recipe {
  constructor(
    private readonly ingredients: Ingredients,
    private readonly fs: FileSystem
  ) {}

  get steps(): readonly Step[] {
    const {
      artifact,
      zip: { destination },
    } = this.ingredients;

    return [
      {
        description: `Build ${path.basename(artifact)} in ${path.basename(
          destination
        )}`,
        perform: this.zip,
      },
    ];
  }

  private zip = async () => {
    const {
      artifact,
      zip: { include },
    } = this.ingredients;

    await this.fs.zip(include, artifact);
  };

  static from(ingredients: Ingredients) {
    return new Zip(ingredients, FileSystem.build());
  }
}
