import { cosmiconfigSync } from 'cosmiconfig';
import is from '@sindresorhus/is';
import { PantrySettings } from '../pantry/settings.js';

export class Cook {
  ingredients() {
    const result = cosmiconfigSync('feast').search();

    if (is.nullOrUndefined(result)) {
      throw new Error('Feast configuration not found');
    }

    return result.config as PantrySettings;
  }

  static ingredients() {
    return new Cook().ingredients();
  }
}
