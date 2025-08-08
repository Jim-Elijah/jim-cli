import { showTemplate } from './util/template.mjs';
import { checkForUpdate } from './util/version.mjs';

async function main() {
  await showTemplate();

  await checkForUpdate();
}

main();
