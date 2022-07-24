import test from 'ava';
import fs from 'fs';
import * as td from 'testdouble';
import { FileSystem } from '../../src/utensils/file-system/file-system.js';
import { Operations } from '../../src/utensils/file-system/operations.js';
import { Zip } from '../../src/utensils/file-system/zip.js';

const operations = td.object<Operations>();
const zip = td.object<Zip>();

const fileSystem = new FileSystem(operations, zip);

test.afterEach(() => {
  td.reset();
});

test('creates directories', () => {
  fileSystem.mkdir('foo');

  td.verify(operations.mkdir('foo'));
});

test('remove files/directories', () => {
  const patterns = ['foo', 'bar'];

  fileSystem.rm(...patterns);

  td.verify(operations.rm(patterns));
});

test('builds zip file', () => {
  const patterns = ['foo', 'bar', 'baz'];
  const destination = 'qux';
  const stream = td.object<fs.WriteStream>();
  td.when(operations.writeStream(destination)).thenReturn(stream);

  fileSystem.zip(destination, ...patterns);

  td.verify(zip.zip(stream, patterns));
});

test('builds a file system object', (t) => {
  t.true(FileSystem.build() instanceof FileSystem);
});
