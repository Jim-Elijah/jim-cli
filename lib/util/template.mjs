import fs from 'fs/promises';
import path from 'path';
import chalk from 'chalk';
import Table from 'easy-table';
import { getConfigDir, getTemplatePath } from './paths.mjs';

const { dirname } = import.meta;
const defaultTemplatePath = path.join(dirname, '../../template.json');
const templatePath = getTemplatePath();

async function ensureUserTemplate() {
  try {
    await fs.access(templatePath);
  } catch {
    await fs.mkdir(getConfigDir(), { recursive: true });
    try {
      await fs.copyFile(defaultTemplatePath, templatePath);
    } catch {
      await fs.writeFile(templatePath, '{}\n', 'utf-8');
    }
  }
}

export async function readTemplateJSON() {
  await ensureUserTemplate();
  const data = await fs.readFile(templatePath, 'utf-8');
  return JSON.parse(data || '{}');
}

export async function writeTemplateJSON(data) {
  await fs.mkdir(getConfigDir(), { recursive: true });
  return fs.writeFile(templatePath, JSON.stringify(data, null, 2), 'utf-8');
}

export function isTemplateEmpty(templateJSON) {
  return JSON.stringify(templateJSON) === '{}';
}

export async function showTemplate() {
  const templateJSON = await readTemplateJSON();
  if (isTemplateEmpty(templateJSON)) {
    console.log(chalk.blue('No template. Please add a template first.'));
    return;
  }
  const table = new Table();

  Object.entries(templateJSON).forEach(([key, value]) => {
    table.cell('name', key);
    table.cell('url', value);
    table.newRow();
  });
  console.log(chalk.green('The latest template is:'));
  console.log(table.toString());
}
