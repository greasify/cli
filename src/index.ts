import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { commands } from './commands/index.js'

// @ts-ignore
yargs(hideBin(process.argv)).command(commands).argv
