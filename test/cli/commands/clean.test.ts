import { Clean } from '../../../src/cli/commands/clean';
import { Cleaner } from '../../../src/cleaner';
import { Config } from '../../../src/utils/config';
import { log } from '../../../src/utils/log';

jest.mock('../../../src/cleaner');
jest.mock('../../../src/utils/config');
jest.mock('../../../src/utils/log');

test('kicks off the cleaner', async () => {
  const clean = new Clean(new Cleaner(new Config()));

  await clean.command.parseAsync([]);

  expect(Cleaner.prototype.clean).toBeCalledTimes(1);
});

test('logs errors that are thrown from clean subcommand', async () => {
  const cleaner = new Cleaner(new Config());
  const error = new Error('foo');
  jest.spyOn(cleaner, 'clean').mockRejectedValueOnce(error);
  const clean = new Clean(cleaner);

  await clean.command.parseAsync([]);

  expect(log.error).toBeCalledWith(error);
});
