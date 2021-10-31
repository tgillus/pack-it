import { Command } from 'commander';
import { log } from '../../utils/log';
import { Packager } from '../../packager';
import { PackItCommand } from './pack-it-command';

export class Clean implements PackItCommand {
  public readonly command: Command;

  constructor(packager: Packager) {
    this.command = new Command('clean');
    this.command
      .description('remove tmp and artifact build directory')
      .action(async () => {
        try {
          await packager.clean();
        } catch (error) {
          log.error(error);
        }
      });
  }
}
