import { Clean } from '../../../src/cli/commands/clean';
import { Cleaner } from '../../../src/cleaner';
import { Config } from '../../../src/utils/config';
import { log } from '../../../src/utils/log';
import { resetAllWhenMocks, when } from 'jest-when';

jest.mock('../../../src/cleaner');
jest.mock('../../../src/utils/config');
jest.mock('../../../src/utils/log');

afterEach(() => {
  jest.resetAllMocks();
  resetAllWhenMocks();
});

test('kicks off the cleaner', async () => {
  const clean = new Clean(new Cleaner(new Config()));

  await clean.command.parseAsync([]);

  expect(Cleaner.prototype.clean).toBeCalledTimes(1);
});

test('logs errors that are thrown from clean subcommand', async () => {
  const cleaner = new Cleaner(new Config());
  const clean = new Clean(cleaner);
  const error = new Error('foo');
  when(cleaner.clean).calledWith().mockRejectedValueOnce(error);

  await clean.command.parseAsync([]);

  expect(log.error).toBeCalledWith(error);
});
