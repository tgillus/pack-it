import { Command } from 'commander';
import { Clean } from './commands/clean';
import { Cleaner } from '../cleaner';
import { Config } from '../utils/config';
import { Pack } from './commands/pack';
import { Packer } from '../packer';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { version } = require('../../package.json');
const config = new Config();
const cleaner = new Cleaner(config);
const packer = new Packer(config, cleaner);

const pack = new Pack(packer);
const clean = new Clean(cleaner);

const program = new Command();
program.version(version);
program.addCommand(pack.command, { isDefault: true });
program.addCommand(clean.command);

export { program };
