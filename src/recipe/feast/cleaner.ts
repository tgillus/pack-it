import path from 'path';
import { Ingredients } from '../../pantry/ingredients.js';
import { FileSystem } from '../../utensils/file-system/file-system.js';
import { Recipe, Step } from '../recipe.js';

export class Cleaner implements Recipe {
  constructor(
    private readonly config: Ingredients,
    private readonly fs: FileSystem
  ) {}

  clean = async () => {
    const {
      feastDir,
      zip: { destination },
    } = this.config;

    await this.fs.rm([feastDir, destination]);
  };

  steps(): Step[] {
    const {
      feastDir,
      zip: { destination },
    } = this.config;

    return [
      {
        description: `Deleting ${path.basename(feastDir)} and ${path.basename(
          destination
        )}`,
        perform: this.clean,
      },
    ];
  }

  static from(config: Ingredients) {
    return new Cleaner(config, FileSystem.build());
  }
}
