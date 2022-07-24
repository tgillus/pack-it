import { Ingredients } from '../../pantry/ingredients.js';
import { Recipe, Step } from '../recipe.js';
import { GitGateway } from './git-gateway.js';

export class Git implements Recipe {
  constructor(
    private readonly config: Ingredients,
    private readonly gitGateway: GitGateway
  ) {}

  clone = async () => {
    const {
      git: { url, branch },
      feastDir,
    } = this.config;

    await this.gitGateway.clone(url, branch, feastDir);
  };

  steps(): Step[] {
    const { url, branch } = this.config.git;

    return [
      {
        description: `Cloning from ${url} and checking out ${branch} branch`,
        perform: this.clone,
      },
    ];
  }

  static from(config: Ingredients) {
    return new Git(config, GitGateway.build());
  }
}
