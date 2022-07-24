import { Ingredients } from '../../pantry/ingredients.js';
import { Git } from '../git/git.js';
import { Npm } from '../npm/npm.js';
import { Recipe, Step } from '../recipe.js';

export class Builder implements Recipe {
  constructor(private readonly git: Git, private readonly npm: Npm) {}

  steps(): Step[] {
    return [...this.git.steps(), ...this.npm.steps()];
  }

  static from(config: Ingredients) {
    return new Builder(Git.from(config), Npm.from(config));
  }
}
