import 'source-map-support/register';
import figlet from 'figlet';
import { log } from '../utils/log';
import { program } from './program';

log.info(
  figlet.textSync('Pack It!', {
    font: 'Standard',
    horizontalLayout: 'full',
  })
);

program.parseAsync(process.argv);
