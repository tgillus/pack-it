import log from 'loglevel';

test('sets default log level to info', async () => {
  const spy = jest.spyOn(log, 'setDefaultLevel');
  await import('../../src/utils/log');

  expect(spy).toBeCalledTimes(1);
  expect(spy).toBeCalledWith(log.levels.INFO);
});
