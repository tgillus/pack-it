import { Ingredients } from '../../incredients/ingredients.js';
import { Builder } from './builder.js';
import { Cleaner } from './cleaner.js';
import { Setup } from './setup.js';
import { Recipe, Step } from '../recipe.js';

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
    this.steps = Cleaner.from(ingredients).steps;
  }
}

class Prepare implements Recipe {
  public readonly steps: Step[];

  constructor(ingredients: Ingredients) {
    this.steps = [
      new Clean(ingredients),
      Setup.from(ingredients),
      Builder.from(ingredients),
    ].flatMap((recipe) => recipe.steps);
  }
}
