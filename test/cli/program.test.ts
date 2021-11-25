import { Cleaner } from '../../src/cleaner';
import { Packer } from '../../src/packer';
import { program } from '../../src/cli/program';

jest.mock('../../src/cleaner');
jest.mock('../../src/packer');

afterEach(() => {
  jest.clearAllMocks();
});

test('kicks off the clean subcommand', async () => {
  await program.parseAsync(['node', 'pack-it', 'clean']);

  expect(Cleaner.prototype.clean).toBeCalledTimes(1);
});

test('kicks off the pack subcommand', async () => {
  await program.parseAsync(['node', 'pack-it', 'pack']);

  expect(Packer.prototype.pack).toBeCalledTimes(1);
});

test('kicks off the pack subcommand as the default command', async () => {
  await program.parseAsync(['node', 'pack-it']);

  expect(Packer.prototype.pack).toBeCalledTimes(1);
});
