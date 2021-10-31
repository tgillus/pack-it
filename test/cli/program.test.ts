const logErrorMock = jest.fn();
jest.mock('../../src/utils/log', () => {
  const log = {
    error: logErrorMock,
  };

  return {
    log,
  };
});

import { program } from '../../src/cli/program';
import { Packager } from '../../src/packager';

afterEach(() => {
  jest.clearAllMocks();
});

test('kicks off the clean subcommand', async () => {
  const spy = jest.spyOn(Packager.prototype, 'clean');
  await program.parseAsync(['node', 'pack-it', 'clean']);

  expect(spy).toBeCalledTimes(1);
});

test('logs errors that are thrown from clean subcommand', async () => {
  const error = new Error('foo');
  jest.spyOn(Packager.prototype, 'clean').mockRejectedValue(error);

  await program.parseAsync(['node', 'pack-it', 'clean']);

  expect(logErrorMock).toBeCalledWith(error);
});

test('kicks off the pack subcommand', async () => {
  const spy = jest.spyOn(Packager.prototype, 'pack');
  await program.parseAsync(['node', 'pack-it', 'pack']);

  expect(spy).toBeCalledTimes(1);
});

test('kicks off the pack subcommand as the default command', async () => {
  const spy = jest.spyOn(Packager.prototype, 'pack');
  await program.parseAsync(['node', 'pack-it']);

  expect(spy).toBeCalledTimes(1);
});

test('logs errors that are thrown from pack subcommand', async () => {
  const error = new Error('foo');
  jest.spyOn(Packager.prototype, 'pack').mockRejectedValue(error);

  await program.parseAsync(['node', 'pack-it', 'pack']);

  expect(logErrorMock).toBeCalledWith(error);
});
