import log from 'loglevel';

jest.mock('loglevel');

afterEach(() => {
  jest.clearAllMocks();
});

test('sets default log level to info', async () => {
  await import('../../src/utils/log');

  expect(log.setDefaultLevel).toBeCalledWith(log.levels.INFO);
});
