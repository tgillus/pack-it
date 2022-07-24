import fs from 'fs';
import archiver from 'archiver';

export class Zip {
  async zip(patterns: readonly string[], stream: fs.WriteStream) {
    const archive = archiver('zip');

    archive.pipe(stream);
    patterns.forEach((pattern) => archive.glob(pattern));

    await archive.finalize();
  }
}
