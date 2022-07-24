import { Ingredients } from '../ingredients/ingredients.js';
import { Construction } from './core/construction.js';
import { Cleanup } from './core/cleanup.js';
import { Groundwork } from './core/groundwork.js';
import { Recipe, recipesToSteps, Step } from './recipe.js';

export class Cookbook implements Recipe {
  public readonly steps: Step[];

  constructor(...recipes: readonly Recipe[]) {
    this.steps = recipesToSteps(...recipes);
  }

  static recipe(ingredients: Ingredients, name: 'clean' | 'prepare'): Recipe {
    switch (name) {
      case 'clean':
        return new Cookbook(new Clean(ingredients));
      case 'prepare':
      default:
        return new Cookbook(new Clean(ingredients), new Prepare(ingredients));
    }
  }
}

class Clean implements Recipe {
  public readonly steps: readonly Step[];

  constructor(ingredients: Ingredients) {
    this.steps = recipesToSteps(Cleanup.from(ingredients));
  }
}

class Prepare implements Recipe {
  public readonly steps: readonly Step[];

  constructor(ingredients: Ingredients) {
    this.steps = recipesToSteps(
      Groundwork.from(ingredients),
      Construction.from(ingredients)
    );
  }
}
