import fs from 'node:fs/promises'
import path from 'node:path'
import Zip from 'adm-zip'

import { templates } from './templates.js'

export async function createTemplate(
  projectName: string,
  templateName: string
) {
  const template = templates.find((template) => template.name === templateName)
  if (!template) {
    throw new Error(`Template "${templateName}" not found`)
  }

  const response = await fetch(template.value)
  const buffer = await response.arrayBuffer()

  const cwd = process.cwd()
  const templatePath = path.resolve(cwd, `greasify-${templateName}.zip`)
  const outputPath = path.resolve(cwd, projectName)

  await fs.writeFile(templatePath, Buffer.from(buffer))
  await fs.mkdir(outputPath)

  const zip = new Zip(templatePath)
  zip.extractAllTo(outputPath, true)

  await fs.rm(templatePath)

  return outputPath
}
