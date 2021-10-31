import { Command } from 'commander';
import { log } from '../../utils/log';
import { Packer } from '../../packer';
import { PackItCommand } from './pack-it-command';

export class Pack implements PackItCommand {
  public readonly command: Command;

  constructor(packer: Packer) {
    this.command = new Command('pack');
    this.command
      .description('package source code as a zip file')
      .action(async () => {
        try {
          await packer.pack();
        } catch (error) {
          log.error(error);
        }
      });
  }
}
