import { cosmiconfigSync } from 'cosmiconfig';
import is from '@sindresorhus/is';
import { PackItSettings } from './settings.js';

export class Loader {
  load() {
    const result = cosmiconfigSync('pack-it').search();

    if (is.nullOrUndefined(result)) {
      throw new Error('Pack It! configuration not found');
    }

    return result.config as PackItSettings;
  }

  static load() {
    return new Loader().load();
  }
}
