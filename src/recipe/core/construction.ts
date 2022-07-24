import { Ingredients } from '../../ingredients/ingredients.js';
import { Git } from '../git/git.js';
import { Npm } from '../npm/npm.js';
import { Recipe, recipesToSteps, Step } from '../recipe.js';
import { Zip } from '../zip/zip.js';

export class Construction implements Recipe {
  public readonly steps: readonly Step[];

  constructor(...recipes: readonly Recipe[]) {
    this.steps = recipesToSteps(...recipes);
  }

  static from(ingredients: Ingredients) {
    return new Construction(
      Git.from(ingredients),
      Npm.from(ingredients),
      Zip.from(ingredients)
    );
  }
}
