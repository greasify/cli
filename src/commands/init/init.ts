import { input, select } from '@inquirer/prompts'
import type { ArgumentsCamelCase, Argv } from 'yargs'

import { getPackageManager } from '../../utils/package-manager.js'
import { createTemplate } from './create-template.js'
import { installDependencies } from './install-deps.js'
import { DEFAULT_NAME, normalizeName } from './normalize-name.js'
import { replaceVariables } from './replace-variables.js'
import { templates } from './templates.js'

export const command = 'init'
export const description = 'Initialize a new project'

export const builder = (argv: Argv) => {
  return argv
    .option('name', {
      alias: 'n',
      type: 'string',
      description: 'The name of the project'
    })
    .option('template', {
      alias: 't',
      type: 'string',
      description: 'The template to use',
      choices: templates.map((template) => template.name)
    })
    .usage(`\nExample:\n $0 ${command} --name "greasify" --template "ts"`)
}

export const handler = async ({
  name,
  template
}: ArgumentsCamelCase<{
  name?: string
  template?: string
}>) => {
  if (!name) {
    name = await input({
      message: 'Project name:',
      default: DEFAULT_NAME
    })
  }

  if (!template) {
    template = await select({
      message: 'Select a template',
      choices: templates.map((template) => ({
        name: template.name,
        value: template.name
      }))
    })
  }

  name = normalizeName(name, template)
  const templatePath = await createTemplate(name, template)
  const packageManager = getPackageManager()

  await replaceVariables(templatePath, {
    name,
    homepage: `https://github.com/greasify/${name}`,
    packageManager
  })

  await installDependencies(templatePath, packageManager)
  console.log(`Template "${template}" generated: ${templatePath}`)
}
