#!/usr/bin/env node
import { program } from "commander"
import { readPackageJSON } from "../lib/util/version.mjs" 

const packageJSON = await readPackageJSON()

program.usage('<command>')

program.version(packageJSON.version)

program
  .command('add')
  .alias('a')
  .description('add a new template')
  .action(() => {
    import('../lib/add.mjs')
  })

program
  .command('delete')
  .alias('d')
  .description('delete a template')
  .action(() => {
    import('../lib/delete.mjs')
  })

program
  .command('list')
  .alias('l')
  .description('list templates')
  .action(() => {
    import('../lib/list.mjs')
  })

program
  .command('init')
  .alias('i')
  .description('init a project')
  .action(() => {
    import('../lib/init.mjs')
  })

program.parse(process.argv)

// catch ctrl + c exit
process.on('uncaughtException', (error) => {
  if (error instanceof Error && error.name === 'ExitPromptError') {
    console.log('👋 until next time!');
  } else {
    // Rethrow unknown errors
    throw error;
  }
});