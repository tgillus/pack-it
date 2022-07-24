import { Ingredients } from '../../incredients/ingredients.js';
import { Recipe, Step } from '../recipe.js';
import { GitGateway } from './git-gateway.js';

export class Git implements Recipe {
  constructor(
    private readonly ingredients: Ingredients,
    private readonly gitGateway: GitGateway
  ) {}

  get steps(): Step[] {
    const { url, branch } = this.ingredients.git;

    return [
      {
        description: `Cloning from ${url} and checking out ${branch} branch`,
        perform: this.clone,
      },
    ];
  }

  private clone = async () => {
    const {
      git: { url, branch },
      feastDir,
    } = this.ingredients;

    await this.gitGateway.clone(url, branch, feastDir);
  };

  static from(ingredients: Ingredients) {
    return new Git(ingredients, GitGateway.build());
  }
}
