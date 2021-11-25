import { Cleaner } from '../../src/cleaner';
import { Packer } from '../../src/packer';
import { program } from '../../src/cli/program';
import { log } from '../../src/utils/log';

jest.mock('../../src/utils/log');

afterEach(() => {
  jest.clearAllMocks();
});

test('kicks off the clean subcommand', async () => {
  const spy = jest.spyOn(Cleaner.prototype, 'clean');
  await program.parseAsync(['node', 'pack-it', 'clean']);

  expect(spy).toBeCalledTimes(1);
});

test('logs errors that are thrown from clean subcommand', async () => {
  const error = new Error('foo');
  jest.spyOn(Cleaner.prototype, 'clean').mockRejectedValue(error);

  await program.parseAsync(['node', 'pack-it', 'clean']);

  expect(log.error).toBeCalledWith(error);
});

test('kicks off the pack subcommand', async () => {
  const spy = jest.spyOn(Packer.prototype, 'pack');
  await program.parseAsync(['node', 'pack-it', 'pack']);

  expect(spy).toBeCalledTimes(1);
});

test('kicks off the pack subcommand as the default command', async () => {
  const spy = jest.spyOn(Packer.prototype, 'pack');
  await program.parseAsync(['node', 'pack-it']);

  expect(spy).toBeCalledTimes(1);
});

test('logs errors that are thrown from pack subcommand', async () => {
  const error = new Error('foo');
  jest.spyOn(Packer.prototype, 'pack').mockRejectedValue(error);

  await program.parseAsync(['node', 'pack-it', 'pack']);

  expect(log.error).toBeCalledWith(error);
});
