import ora from 'ora';
import path from 'path';
import fs from 'fs';
import { cp, readFile, writeFile, rm } from 'fs/promises';
import validatePackageName from 'validate-npm-package-name';
import { input, select, confirm } from '@inquirer/prompts';
import chalk from 'chalk';
import symbols from 'log-symbols';
import { readTemplateJSON, isTemplateEmpty } from './util/template.mjs';
import { inputTrimFilter } from './util/inquire.mjs';
import { downloadRepo } from './util/download.mjs';

chalk.level = 1;

async function main() {
  const templateJSON = await readTemplateJSON();
  const entries = Object.entries(templateJSON);

  // inquirer.js legacy questions
  const projectNameQuestion = {
    name: 'projectName',
    message: 'Input project name',
    filter: inputTrimFilter,
    // notice: filter is useless for input of @inquirer/prompts
    async validate(val = '') {
      val = inputTrimFilter(val);
      if (!val) {
        return 'projectName is required!';
      }
      const result = validatePackageName(val);
      if (!result.validForNewPackages) {
        // do not delete this line
        console.log(``);
        if (result.errors) {
          result.errors.forEach((error) => {
            console.error(chalk.red.dim(`Error: ${error}`));
          });
        }
        if (result.warnings) {
          result.warnings.forEach((warn) => {
            console.error(chalk.red.dim(`Warning: ${warn}`));
          });
        }
        return `Invalid project name: "${val}"`;
      }
      return true;
    },
  };
  const templateNameQuestion = {
    name: 'templateName',
    message: 'Select a template',
    choices: entries.map(([name, url]) => ({
      name,
      value: name,
      description: `url of "${name}" is "${url}"`,
    })),
  };

  if (isTemplateEmpty(templateJSON)) {
    console.log(chalk.blue('No template. Please add a template first.'));
    return;
  }

  const projectName = await input(projectNameQuestion);
  const projectPath = path.join(process.cwd(), projectName);
  const projectExist = fs.existsSync(projectPath);
  let overwrite;
  if (projectExist) {
    overwrite = await confirm({ message: 'Project name exists, overwrite?', default: false });
  }
  if (projectExist && !overwrite) {
    return;
  }

  const templateName = await select(templateNameQuestion);

  const url = templateJSON[templateName];

  console.log(chalk.green(`\n Start generating ${chalk.yellow(templateName)} \n`));

  const spinner = ora('Downloading...');
  spinner.start();
  try {
    // download to tmpdir
    const tmpdir = await downloadRepo(`direct:${url}`, true);
    // remove if project exists and use chooses to overwrite
    if (projectExist && overwrite) {
      await rm(projectPath, { recursive: true });
    }
    // cp tmpdir to projectPath
    await cp(tmpdir, projectPath, { recursive: true });
    // change name in package.json
    const packageJSONPath = path.join(projectPath, 'package.json');
    if (fs.existsSync(packageJSONPath)) {
      const content = await readFile(packageJSONPath, 'utf-8');
      const obj = JSON.parse(content);
      obj.name = projectName;
      await writeFile(packageJSONPath, JSON.stringify(obj, null, 2), 'utf-8');
    }
    spinner.succeed();
    console.log(
      chalk.green(symbols.success),
      chalk.green(`Generating ${chalk.yellow(projectName)} completed!`)
    );
    console.log('\n To get started');
    console.log(chalk.green(`cd ${projectName}`));
  } catch (err) {
    spinner.fail();
    console.log(chalk.red(symbols.error), chalk.red(`Generation failed. ${err}`));
  }
}

main();
