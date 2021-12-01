import { resetAllWhenMocks, when } from 'jest-when';
import { Cleaner } from '../../../src/cleaner';
import { Pack } from '../../../src/cli/commands/pack';
import { Packer } from '../../../src/packer';
import { Config } from '../../../src/utils/config';
import { log } from '../../../src/utils/log';

jest.mock('../../../src/cleaner');
jest.mock('../../../src/packer');
jest.mock('../../../src/utils/config');
jest.mock('../../../src/utils/log');

afterEach(() => {
  jest.resetAllMocks();
  resetAllWhenMocks();
});

test('kicks off the packer', async () => {
  const config = new Config();
  const cleaner = new Cleaner(config);
  const pack = new Pack(new Packer(config, cleaner));

  await pack.command.parseAsync([]);

  expect(Packer.prototype.pack).toBeCalledTimes(1);
});

test('logs errors that are thrown from clean subcommand', async () => {
  const config = new Config();
  const cleaner = new Cleaner(config);
  const packer = new Packer(config, cleaner);
  const pack = new Pack(packer);
  const error = new Error('foo');
  when(packer.pack).calledWith().mockRejectedValueOnce(error);

  await pack.command.parseAsync([]);

  expect(log.error).toBeCalledWith(error);
});
