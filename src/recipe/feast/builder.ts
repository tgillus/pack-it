import { Ingredients } from '../../ingredients/ingredients.js';
import { Git } from '../git/git.js';
import { Npm } from '../npm/npm.js';
import { Recipe, Step } from '../recipe.js';

export class Builder implements Recipe {
  public readonly steps: Step[];

  constructor(recipes: readonly Recipe[]) {
    this.steps = recipes.flatMap((recipe) => recipe.steps);
  }

  static from(ingredients: Ingredients) {
    return new Builder([Git.from(ingredients), Npm.from(ingredients)]);
  }
}
