import fs from 'fs/promises';
import path from 'path';
import chalk from 'chalk';
import Table from 'easy-table';

const { dirname } = import.meta;
const templatePath = path.join(dirname, '../../template.json');

export async function readTemplateJSON() {
  const data = await fs.readFile(templatePath, 'utf-8');
  return JSON.parse(data || '{}');
}

export async function writeTemplateJSON(data) {
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

  for (const [key, value] of Object.entries(templateJSON)) {
    table.cell('name', key);
    table.cell('url', value);
    table.newRow();
  }
  console.log(chalk.green('The latest template is:'));
  console.log(table.toString());
}
