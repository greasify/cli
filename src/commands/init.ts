import type { ArgumentsCamelCase, Argv } from 'yargs'

export const command = 'init <name> <template>'
export const description = 'Initialize a new project'

export const builder = (argv: Argv) => {
  return argv
    .option('name', {
      alias: 'n',
      type: 'string',
      description: 'The name of the project',
      default: 'New Userscript'
    })
    .option('template', {
      alias: 't',
      type: 'string',
      description: 'The template to use',
      default: 'ts',
      choices: [
        'ts',
        'js',
        'redom',
        'preact'
      ]
    })
}

export const handler = (
  args: ArgumentsCamelCase<{ name: string; template: string }>
) => {
  console.info(args)
}
