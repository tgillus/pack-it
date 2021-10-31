import { Cleaner } from '../../cleaner';
import { Command } from 'commander';
import { PackItCommand } from './pack-it-command';
import { log } from '../../utils/log';

export class Clean implements PackItCommand {
  public readonly command: Command;

  constructor(cleaner: Cleaner) {
    this.command = new Command('clean');
    this.command
      .description('remove tmp and artifact build directory')
      .action(async () => {
        try {
          await cleaner.clean();
        } catch (error) {
          log.error(error);
        }
      });
  }
}
