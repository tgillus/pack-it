export default {
  files: ['test/**/*.ts'],
  timeout: '1m',
  extensions: {
    ts: 'module',
  },
  nodeArguments: ['--loader=tsx', '--trace-warnings'],
  environmentVariables: {
    NODE_NO_WARNINGS: '1',
  },
  failWithoutAssertions: false,
  verbose: true,
};
