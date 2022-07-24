import { Ingredients } from '../../pantry/ingredients.js';
import { Builder } from './builder.js';
import { Cleaner } from './cleaner.js';
import { Preparer } from './preparer.js';
import { Recipe, Step } from '../recipe.js';

export class Cookbook implements Recipe {
  constructor(private readonly recipes: Recipe[]) {}

  steps() {
    return this.recipes.flatMap((recipe) => recipe.steps());
  }

  static recipe(config: Ingredients, name: 'clean' | 'prepare') {
    switch (name) {
      case 'clean':
        return new Clean(config);
      case 'prepare':
      default:
        return new Build(config, [new Clean(config)]);
    }
  }
}

class Clean implements Recipe {
  private readonly recipes: Recipe[];

  constructor(config: Ingredients) {
    this.recipes = [Cleaner.from(config)];
  }

  steps(): Step[] {
    return this.recipes.flatMap((recipe) => recipe.steps());
  }
}

class Build implements Recipe {
  private readonly recipes: Recipe[];

  constructor(config: Ingredients, recipes: Recipe[] = []) {
    this.recipes = [...recipes, Preparer.from(config), Builder.from(config)];
  }

  steps(): Step[] {
    return this.recipes.flatMap((recipe) => recipe.steps());
  }
}
