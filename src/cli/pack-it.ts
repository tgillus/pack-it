#!/usr/bin/env node
import { program } from 'commander';
import { Ingredients } from '../ingredients/ingredients.js';
import { Lab } from '../ingredients/lab.js';
import { Cookbook } from '../recipe/cookbook.js';
import { Release } from './release.js';
import { Feast } from './ui/feast.js';
import { title } from './ui/title.js';

const { version } = Release.build();

program
  .name('pack-it')
  .description('Pack It! bundles source code into a zip file')
  .version(version);

program
  .command('prepare')
  .description('build zip file')
  .requiredOption(
    '-b, --branch <branch>',
    'Git branch used to build the zip file',
    'main'
  )
  .action(async ({ branch }: { branch: string }) => {
    const ingredients = Ingredients.from(
      Lab.mix(Lab.compounds(), { git: { branch } })
    );
    const recipe = Cookbook.recipe(ingredients, 'prepare');
    const feast = Feast.from(recipe.steps);

    await feast.prepare();
  });

program
  .command('clean')
  .description('delete build artifacts')
  .action(async () => {
    const ingredients = Ingredients.from(Lab.compounds());
    const recipe = Cookbook.recipe(ingredients, 'clean');
    const feast = Feast.from(recipe.steps);

    await feast.prepare();
  });

function run() {
  title();
  program.parseAsync();
}

run();
