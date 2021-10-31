import { Command } from 'commander';
import { Packer } from '../packer';
import { Config } from '../utils/config';
import { Pack } from './commands/pack';
import { Clean } from './commands/clean';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { version } = require('../../package.json');
const packer = new Packer(new Config());

const pack = new Pack(packer);
const clean = new Clean(packer);

const program = new Command();
program.version(version);
program.addCommand(pack.command, { isDefault: true });
program.addCommand(clean.command);

export { program };
