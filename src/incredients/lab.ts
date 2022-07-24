import { cosmiconfigSync } from 'cosmiconfig';
import is from '@sindresorhus/is';
import { PantryCompounds } from './compounds.js';

export class Lab {
  compounds() {
    const result = cosmiconfigSync('feast').search();

    if (is.nullOrUndefined(result)) {
      throw new Error('Feast configuration not found');
    }

    return result.config as PantryCompounds;
  }

  static compounds() {
    return new Lab().compounds();
  }
}
