#!/usr/bin/env node
import _ from 'lodash';
import { program } from 'commander';
import { Cook } from '../cook/cook.js';
import { Ingredients } from '../pantry/ingredients.js';
import { release } from './release.js';
import { title } from './ui/title.js';
import { Chef } from './ui/chef.js';
import { Cookbook } from '../recipe/feast/cookbook.js';

program
  .name('Feast!')
  .description('Feast! bundles source code into a zip file')
  .version(release());

program
  .command('prepare')
  .description('build zip file')
  .requiredOption(
    '-b, --branch <branch>',
    'Git branch used to build the zip file',
    'main'
  )
  .action(async ({ branch }: { branch: string }) => {
    const ingredients = new Ingredients(
      _.merge(Cook.ingredients(), { git: { branch } })
    );
    const recipe = Cookbook.recipe(ingredients, 'prepare');
    const tasklist = Chef.from(recipe.steps());

    await tasklist.prepare();
  });

program
  .command('clean')
  .description('delete build artifacts')
  .action(async () => {
    const ingredients = new Ingredients(Cook.ingredients());
    const recipe = Cookbook.recipe(ingredients, 'clean');
    const tasklist = Chef.from(recipe.steps());

    await tasklist.prepare();
  });

function main() {
  title();
  program.parseAsync();
}

main();
