import os from 'os';
import path from 'path';
import { downloadTemplate } from 'giget';

export async function downloadRepo(url) {
  const tmpdir = path.resolve(os.tmpdir(), 'jim-cli');
  const source = url.startsWith('git:') ? url : `git:${url}`;
  const { dir } = await downloadTemplate(source, {
    dir: tmpdir,
    force: true,
    forceClean: true,
  });
  return dir;
}
