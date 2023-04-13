import meow from 'meow'

export const cli = meow(
  `
  Usage
    $ greasify <input>

  Options
    --init, -i  Scaffold a new userscript
    --name, -n  Name of the userscript

  Examples
    $ greasify --init --name new-userscript
`,
  {
    importMeta: import.meta,
    flags: {
      init: {
        type: 'boolean',
        shortFlag: 'i'
      },
      name: {
        type: 'string',
        shortFlag: 'n'
      }
    }
  }
)
