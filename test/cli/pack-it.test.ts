import '../../src/cli/pack-it';
import { program } from '../../src/cli/program';

jest.mock('../../src/cli/program');
jest.mock('../../src/utils/log');

afterEach(() => {
  jest.resetAllMocks();
});

test('executes program', () => {
  expect(program.parseAsync).toBeCalledTimes(1);
});
