import { Command } from 'commander';
import { Packager } from '../../packager';
import { PackItCommand } from '../pack-it';
import { log } from '../../utils/log';

export class Clean implements PackItCommand {
  public readonly command: Command;

  constructor(packager: Packager) {
    this.command = new Command('clean');
    this.command.description('remove tmp build directory').action(async () => {
      try {
        await packager.clean();
      } catch (error) {
        log.error(error);
      }
    });
  }
}
