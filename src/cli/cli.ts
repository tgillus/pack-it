#!/usr/bin/env node
import _ from 'lodash';
import { program } from 'commander';
import { Loader } from '../config/loader.js';
import { Config } from '../config/config.js';
import { release } from './release.js';
import { PackIt } from '../pack-it/pack-it.js';
import { title } from './ui/title.js';
import { TaskList } from './ui/task-list.js';

program
  .name('pack-it')
  .description('Pack It! bundles source code into a zip file')
  .version(release());

program
  .command('build')
  .description('build zip file')
  .requiredOption(
    '-b, --branch <branch>',
    'Git branch used to build the zip file',
    'main'
  )
  .action(async ({ branch }: { branch: string }) => {
    const packIt = PackIt.from(
      new Config(_.merge(Loader.load(), { git: { branch } }))
    );

    await TaskList.from(packIt.tasks()).run();
  });

// program
//   .command('clean')
//   .description('delete .pack-it and zip file directories')
//   .action(() => {
//     const packIt = PackIt.from(new Config(Loader.load()));

//     packIt.clean();
//   });

function main() {
  title();
  program.parseAsync();
}

main();
