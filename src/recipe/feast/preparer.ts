import path from 'path';
import { Ingredients } from '../../pantry/ingredients.js';
import { FileSystem } from '../../utensils/file-system/file-system.js';
import { Recipe, Step } from '../recipe.js';

export class Preparer implements Recipe {
  constructor(
    private readonly config: Ingredients,
    private readonly fs: FileSystem
  ) {}

  prepare = async () => {
    const {
      feastDir,
      zip: { destination },
    } = this.config;

    this.fs.mkdir(feastDir);
    this.fs.mkdir(destination);
  };

  steps(): Step[] {
    const {
      feastDir,
      zip: { destination },
    } = this.config;

    return [
      {
        description: `Creating ${path.basename(feastDir)} and ${path.basename(
          destination
        )}`,
        perform: this.prepare,
      },
    ];
  }

  static from(config: Ingredients) {
    return new Preparer(config, FileSystem.build());
  }
}
