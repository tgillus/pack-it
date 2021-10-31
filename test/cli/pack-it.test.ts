const mockParseAsync = jest.fn();
const program = {
  parseAsync: mockParseAsync,
};

jest.mock('../../src/cli/program', () => {
  return {
    program,
  };
});
jest.mock('../../src/utils/log');

import '../../src/cli/pack-it';

test('executes program', () => {
  expect(mockParseAsync).toBeCalledTimes(1);
});
