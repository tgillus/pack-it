import is from '@sindresorhus/is';
import { cosmiconfigSync } from 'cosmiconfig';
import _ from 'lodash';
import { CliCompounds } from '../cli/compounds.js';
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

  static mix(pantry: PantryCompounds, cli: CliCompounds) {
    return _.merge(pantry, cli);
  }
}
