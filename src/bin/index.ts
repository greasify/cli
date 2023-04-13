#!/usr/bin/env node
import { cli } from '../lib/cli.js'
import { scaffold } from '../lib/scaffold.js'

if (cli.flags.name) {
  scaffold({ name: cli.flags.name })
}
