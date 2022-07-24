import archiver from 'archiver';
import fs from 'fs';

export class Zip {
  async zip(stream: fs.WriteStream, patterns: readonly string[]) {
    const archive = archiver('zip');

    archive.pipe(stream);
    patterns.forEach((pattern) => archive.glob(pattern));

    await archive.finalize();
  }
}
