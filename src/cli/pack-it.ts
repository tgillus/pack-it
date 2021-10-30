import 'source-map-support/register';
import { Command } from 'commander';
import { log } from '../utils/log';
import figlet from 'figlet';
import { Packager } from '../packager';
import { Config } from '../utils/config';
import { Pack } from './commands/pack';
import { Clean } from './commands/clean';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { version } = require('../../package.json');

export interface PackItCommand {
  command: Command;
}

log.info(
  figlet.textSync('Pack It!', {
    font: 'Standard',
    horizontalLayout: 'full',
  })
);

const packager = new Packager(new Config());

const pack = new Pack(packager);
const clean = new Clean(packager);

const packIt = new Command();
packIt.version(version);
packIt.addCommand(pack.command, { isDefault: true });
packIt.addCommand(clean.command);

packIt.parseAsync(process.argv);
