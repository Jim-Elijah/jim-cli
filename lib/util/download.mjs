import os from 'os'
import path from 'path'
import download from 'download-git-repo';
import fs from 'fs/promises'

export async function downloadRepo(url, clone = false) {
    const tmpdir = path.resolve(os.tmpdir(), 'jim-cli');
    if (clone) {
        await fs.rm(tmpdir, { recursive: true, force: true });
    }
    return new Promise((resolve, reject) => {
        download(url, tmpdir, { clone }, err => {
            if (err) {
                return reject(err);
            }
            return resolve(tmpdir);
        });
    });
};
