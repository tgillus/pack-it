import { Ingredients } from '../../ingredients/ingredients.js';
import { Recipe, Step } from '../recipe.js';
import { GitGateway } from './git-gateway.js';

export class Git implements Recipe {
  constructor(
    private readonly ingredients: Ingredients,
    private readonly gitGateway: GitGateway
  ) {}

  get steps(): readonly Step[] {
    const { url, branch } = this.ingredients.git;

    return [
      {
        description: `Clone from ${url} and check out ${branch} branch`,
        perform: this.clone,
      },
    ];
  }

  private clone = async () => {
    const {
      git: { url, branch },
      packItDir,
    } = this.ingredients;

    await this.gitGateway.clone(url, branch, packItDir);
  };

  static from(ingredients: Ingredients) {
    return new Git(ingredients, GitGateway.build());
  }
}
