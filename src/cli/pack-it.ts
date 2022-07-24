#!/usr/bin/env node
import { program } from 'commander';
import { Lab } from '../ingredients/lab.js';
import { Ingredients } from '../ingredients/ingredients.js';
import { release } from './release.js';
import { title } from './ui/title.js';
import { Feast } from './ui/feast.js';
import { Cookbook } from '../recipe/cookbook.js';

program
  .name('pack-it')
  .description('Pack It! bundles source code into a zip file')
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
