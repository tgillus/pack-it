import { Ingredients } from '../../pantry/ingredients.js';
import { Process } from '../../utensils/process/process.js';
import { Recipe, Step } from '../recipe.js';

export class Npm implements Recipe {
  constructor(
    private readonly config: Ingredients,
    private readonly process: Process
  ) {}

  installDeps = async () => {
    await this.process.exec('npm', ['install'], this.config.feastDir);
  };

  build = async () => {
    await this.process.exec('npm', ['run', 'build'], this.config.feastDir);
  };

  cleanModules = async () => {
    await this.process.exec(
      'npm',
      ['run', 'clean:modules'],
      this.config.feastDir
    );
  };

  installProdDeps = async () => {
    await this.process.exec(
      'npm',
      ['install', '--production'],
      this.config.feastDir
    );
  };

  steps(): Step[] {
    return [
      {
        description: 'Installing dependencies',
        perform: this.installDeps,
      },
      {
        description: 'Building project',
        perform: this.build,
      },
      {
        description: 'Deleting project dependencies',
        perform: this.cleanModules,
      },
      {
        description: 'Installing project production dependencies',
        perform: this.installProdDeps,
      },
    ];
  }

  static from(config: Ingredients) {
    return new Npm(config, new Process());
  }
}
