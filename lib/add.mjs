import { input } from '@inquirer/prompts';
import chalk from 'chalk';
import symbols from 'log-symbols';
import { readTemplateJSON, writeTemplateJSON, showTemplate } from './util/template.mjs';
import { inputTrimFilter } from './util/inquire.mjs';
import { checkForUpdate } from './util/version.mjs';

chalk.level = 1;

async function main() {
  const templateJSON = await readTemplateJSON();

  // inquirer.js legacy questions
  const nameQuestion = {
    name: 'name',
    message: 'Input name of template',
    // notice: filter is useless for input of @inquirer/prompts
    validate(val = '') {
      const trimmed = inputTrimFilter(val);
      if (!trimmed) {
        return 'Name is required!';
      }
      if (!/^[a-zA-Z_$][a-zA-Z0-9_$]{1,29}$/.test(trimmed)) {
        return `Name cannot start with a digit, can only contain letters, digits, $, and _, and its length must be between 2 and 30.`;
      }
      if (templateJSON[trimmed]) {
        return 'This name has already existed!';
      }
      return true;
    },
  };
  const urlQuestion = {
    name: 'url',
    message: 'Input download address of template',
    validate(val) {
      const trimmed = inputTrimFilter(val);
      if (!trimmed) {
        return 'Url is required!';
      }
      return true;
    },
  };

  const name = inputTrimFilter(await input(nameQuestion));
  const url = inputTrimFilter(await input(urlQuestion));
  if (!(name && url)) {
    return;
  }

  // eslint-disable-next-line no-control-regex -- strip ASCII control characters from URL
  templateJSON[name] = url.replace(/[\u0000-\u0019]/g, '');
  try {
    await writeTemplateJSON(templateJSON);
    console.log(chalk.green(symbols.success, `Add template ${chalk.yellow(name)} successfully!\n`));
    await showTemplate();
  } catch (err) {
    console.log(chalk.red(symbols.error), chalk.red(err));
  }
  await checkForUpdate();
}

main();
