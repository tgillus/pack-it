import { Command } from 'commander';
import { Packager } from '../packager';
import { Config } from '../utils/config';
import { Pack } from './commands/pack';
import { Clean } from './commands/clean';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { version } = require('../../package.json');
const packager = new Packager(new Config());

const pack = new Pack(packager);
const clean = new Clean(packager);

const program = new Command();
program.version(version);
program.addCommand(pack.command, { isDefault: true });
program.addCommand(clean.command);

export { program };
