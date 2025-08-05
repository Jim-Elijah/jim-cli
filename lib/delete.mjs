import { search, confirm } from "@inquirer/prompts"
import chalk from "chalk";
import symbols from "log-symbols"
import { readTemplateJSON, writeTemplateJSON, showTemplate } from "./util/template.mjs"
import { inputTrimFilter } from './util/inquire.mjs'

chalk.level = 1

async function main() {
  const templateJSON = await readTemplateJSON()
  const entries = Object.entries(templateJSON)
  const searchQuestion = {
    name: "search",
    message: "Search name of template",
    source: async (input = "", { signal }) => {
      input = inputTrimFilter(input)
      if (!input) {
        return entries.map(([name, url]) => ({ name, value: name, description: `url of "${name}" is "${url}"` }));
      }
      return entries.filter(([name, url]) => name.includes(input) || url.includes(input)).map(([name, url]) => ({ name, value: name, description: `url of "${name}" is "${url}"` }))
    },
  }

  const name = await search(searchQuestion);
  const sure = await confirm({ message: 'Are you sure to delete?', default: false });
  if (!sure) {
    return;
  }
  delete templateJSON[name]
  try {
    await writeTemplateJSON(templateJSON)
    console.log(chalk.green(symbols.success, `Delete template ${chalk.yellow(name)} successfully!\n`))
    await showTemplate()
  } catch (err) {
    console.log(chalk.red(symbols.error), chalk.red(err))
  }
}

main()