import fs from 'node:fs/promises'
import path from 'node:path'

const REPLACE_FILES = [
  'package.json',
  'README.md'
]

interface Variables {
  name: string
  homepage: string
  packageManager: string
}

export async function replaceVariables(
  templatePath: string,
  variables: Variables
) {
  for (const file of REPLACE_FILES) {
    const filePath = path.resolve(templatePath, file)
    const content = await fs.readFile(filePath, 'utf8')
    const replacedContent = content.replace(
      /{{\s*(.*?)\s*}}/g,
      (_, variable: keyof Variables) => {
        return variables[variable]
      }
    )
    await fs.writeFile(filePath, replacedContent)
  }
}
