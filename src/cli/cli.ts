#!/usr/bin/env node
import _ from 'lodash';
import { program } from 'commander';
import { Loader } from '../config/loader.js';
import { Config } from '../config/config.js';
import { release } from './release.js';
import { PackIt } from '../pack-it/pack-it.js';
import { Spinner } from './spinner.js';
import { EmitterListener } from '../emitter/emitter.js';

const listeners: EmitterListener[] = [new Spinner()];

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
      new Config(_.merge(Loader.load(), { git: { branch } })),
      listeners
    );

    await packIt.build();
  });

program
  .command('clean')
  .description('delete .pack-it and zip file directories')
  .action(() => {
    const packIt = PackIt.from(new Config(Loader.load()), listeners);

    packIt.clean();
  });

program.parseAsync();
