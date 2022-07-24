import { Ingredients } from '../ingredients/ingredients.js';
import { Construction } from './core/construction.js';
import { Cleanup } from './core/cleanup.js';
import { Groundwork } from './core/groundwork.js';
import { Recipe, Step } from './recipe.js';

export class Cookbook implements Recipe {
  constructor(private readonly recipes: Recipe[]) {}

  get steps() {
    return this.recipes.flatMap((recipe) => recipe.steps);
  }

  static recipe(ingredients: Ingredients, name: 'clean' | 'prepare') {
    switch (name) {
      case 'clean':
        return new Clean(ingredients);
      case 'prepare':
      default:
        return new Prepare(ingredients);
    }
  }
}

class Clean implements Recipe {
  public readonly steps: Step[];

  constructor(ingredients: Ingredients) {
    this.steps = Cleanup.from(ingredients).steps;
  }
}

class Prepare implements Recipe {
  public readonly steps: Step[];

  constructor(ingredients: Ingredients) {
    this.steps = [
      new Clean(ingredients),
      Groundwork.from(ingredients),
      Construction.from(ingredients),
    ].flatMap((recipe) => recipe.steps);
  }
}
