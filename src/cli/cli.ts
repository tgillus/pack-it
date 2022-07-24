#!/usr/bin/env node
import _ from 'lodash';
import { program } from 'commander';
import { Lab } from '../incredients/lab.js';
import { Ingredients } from '../incredients/ingredients.js';
import { release } from './release.js';
import { title } from './ui/title.js';
import { Feast } from './ui/feast.js';
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
      _.merge(Lab.compounds(), { git: { branch } })
    );
    const recipe = Cookbook.recipe(ingredients, 'prepare');
    const feast = Feast.from(recipe.steps);

    await feast.prepare();
  });

program
  .command('clean')
  .description('delete build artifacts')
  .action(async () => {
    const ingredients = new Ingredients(Lab.compounds());
    const recipe = Cookbook.recipe(ingredients, 'clean');
    const feast = Feast.from(recipe.steps);

    await feast.prepare();
  });

function main() {
  title();
  program.parseAsync();
}

main();
