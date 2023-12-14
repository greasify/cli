import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

import { commands } from './commands/index.js'

yargs(hideBin(process.argv))
  .scriptName('greasify')
  .usage('$0 <cmd> [args]')
  // @ts-ignore
  .command(commands)
  .help().argv
