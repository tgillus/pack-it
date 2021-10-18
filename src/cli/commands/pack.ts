import { Command } from 'commander';
import { Packager } from '../../packager';
import { PackItCommand } from '../pack-it';
import { log } from '../../utils/log';

export class Pack implements PackItCommand {
  public readonly command: Command;

  constructor(packager: Packager) {
    this.command = new Command('pack');
    this.command
      .description('package source code as a zip file')
      .action(async () => {
        try {
          await packager.pack();
        } catch (error) {
          log.error(error);
        }
      });
  }
}
