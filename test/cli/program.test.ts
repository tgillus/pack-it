import { Cleaner } from '../../src/cleaner';
import { Packer } from '../../src/packer';
import { program } from '../../src/cli/program';
import { log } from '../../src/utils/log';

jest.mock('../../src/cleaner');
jest.mock('../../src/packer');
jest.mock('../../src/utils/log');

afterEach(() => {
  jest.clearAllMocks();
});

test('kicks off the clean subcommand', async () => {
  await program.parseAsync(['node', 'pack-it', 'clean']);

  expect(Cleaner.prototype.clean).toBeCalledTimes(1);
});

test('logs errors that are thrown from clean subcommand', async () => {
  const error = new Error('foo');
  jest.spyOn(Cleaner.prototype, 'clean').mockRejectedValueOnce(error);

  await program.parseAsync(['node', 'pack-it', 'clean']);

  expect(log.error).toBeCalledWith(error);
});

test('kicks off the pack subcommand', async () => {
  await program.parseAsync(['node', 'pack-it', 'pack']);

  expect(Packer.prototype.pack).toBeCalledTimes(1);
});

test('kicks off the pack subcommand as the default command', async () => {
  await program.parseAsync(['node', 'pack-it']);

  expect(Packer.prototype.pack).toBeCalledTimes(1);
});

test('logs errors that are thrown from pack subcommand', async () => {
  const error = new Error('foo');
  jest.spyOn(Packer.prototype, 'pack').mockRejectedValueOnce(error);

  await program.parseAsync(['node', 'pack-it', 'pack']);

  expect(log.error).toBeCalledWith(error);
});
