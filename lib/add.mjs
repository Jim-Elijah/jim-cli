import { input } from '@inquirer/prompts';
import chalk from 'chalk';
import symbols from 'log-symbols';
import { readTemplateJSON, writeTemplateJSON, showTemplate } from './util/template.mjs';
import { inputTrimFilter } from './util/inquire.mjs';

chalk.level = 1;

async function main() {
  const templateJSON = await readTemplateJSON();

  // inquirer.js legacy questions
  const questions = [
    {
      name: 'name',
      message: 'Input name of template',
      // notice: filter is useless for input of @inquirer/prompts
      validate(val = '') {
        val = inputTrimFilter(val);
        if (!val) {
          return 'Name is required!';
        }
        if (!/^[a-zA-Z_$][a-zA-Z0-9_$]{1,29}$/.test(val)) {
          return `Name cannot start with a digit, can only contain letters, digits, $, and _, and its length must be between 2 and 30.`;
        }
        if (templateJSON[val]) {
          return 'This name has already existed!';
        }
        return true;
      },
    },
    {
      name: 'url',
      message: 'Input download address of template',
      validate(val) {
        val = inputTrimFilter(val);
        if (!val) {
          return 'Url is required!';
        }
        return true;
      },
    },
  ];
  const answers = {};
  for (const question of questions) {
    await input(question).then((answer) => {
      answers[question.name] = inputTrimFilter(answer);
    });
  }
  const { name, url } = answers;
  if (!(name && url)) {
    return;
  }

  templateJSON[name] = url.replace(/[\u0000-\u0019]/g, ''); // 过滤 unicode 字符
  try {
    await writeTemplateJSON(templateJSON);
    console.log(chalk.green(symbols.success, `Add template ${chalk.yellow(name)} successfully!\n`));
    await showTemplate();
  } catch (err) {
    console.log(chalk.red(symbols.error), chalk.red(err));
  }
}

main();
