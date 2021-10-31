import { Command } from 'commander';
import { log } from '../../utils/log';
import { Packer } from '../../packer';
import { PackItCommand } from './pack-it-command';

export class Clean implements PackItCommand {
  public readonly command: Command;

  constructor(packer: Packer) {
    this.command = new Command('clean');
    this.command
      .description('remove tmp and artifact build directory')
      .action(async () => {
        try {
          await packer.clean();
        } catch (error) {
          log.error(error);
        }
      });
  }
}
