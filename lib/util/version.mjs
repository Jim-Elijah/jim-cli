import fs from 'fs/promises'
import path from 'path';

const { dirname } = import.meta
const packagePath = path.join(dirname, "../../package.json")

export async function readPackageJSON() {
  const data = await fs.readFile(packagePath, 'utf-8')
  return JSON.parse(data || "{}")
};