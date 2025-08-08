import fs from 'fs/promises';
import path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';
import chalk from 'chalk';
import semver from 'semver';

const promisifyExec = promisify(exec);

const { dirname } = import.meta;
const packagePath = path.join(dirname, '../../package.json');

const checkInterval = 60 * 60 * 1000 * 24;

// 缓存上一次的最新版本号以及本地版本号
/**
 * cached info, including
 *   latest: latest version last time
 *   lastCheckTime: last check time
 *   current: local version
 */
let cachedVersions;
let cliName;
// remote latest version
let latest;
// local version
let current;

export async function readPackageJSON() {
  const data = await fs.readFile(packagePath, 'utf-8');
  return JSON.parse(data || '{}');
}

export async function getCLIName() {
  if (!cliName) {
    const obj = await readPackageJSON();
    cliName = obj.name;
  }
  return cliName;
}

// get current version
export async function getVersion() {
  if (!current) {
    const obj = await readPackageJSON();
    current = obj.version;
  }
  return current;
}

// get remote version
async function getLatestVersion() {
  const pkgName = await getCLIName();
  const { stdout } = await promisifyExec(`npm view ${pkgName} version`);
  return stdout.trim();
}

// get current version and latest version
export async function getVersions() {
  if (cachedVersions) {
    return cachedVersions;
  }
  current = await getVersion();
  const { lastCheckTime = 0 } = cachedVersions || {};
  const shouldCheck = (Date.now() - lastCheckTime) / checkInterval > 1;
  try {
    if (shouldCheck) {
      latest = await getLatestVersion();
    }
  } catch (e) {
    latest = current;
  }
  cachedVersions = {
    latest,
    current,
    lastCheckTime: Date.now(),
  };
  return cachedVersions;
}

// check for new version
export async function checkForUpdate() {
  const { current, latest } = await getVersions();
  if (semver.gt(latest, current)) {
    console.log(
      chalk.green(
        `New Update available: ${latest}. Run ${chalk.yellow(`npm update ${cliName} -g`)} to update.`
      )
    );
  }
}
