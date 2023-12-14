import { exec } from 'node:child_process'
import fs from 'node:fs/promises'
import path from 'node:path'
import util from 'node:util'

import type { PackageManager } from '../../utils/package-manager.js'

interface ConfigJson {
  dependencies: string[]
  devDependencies: string[]
}

const CONFIG_FILE = 'config.json'

export async function installDependencies(
  templatePath: string,
  packageManager: PackageManager
) {
  const templateConfigPath = path.resolve(templatePath, CONFIG_FILE)
  const templateConfigJson = JSON.parse(
    await fs.readFile(templateConfigPath, 'utf8')
  ) as ConfigJson
  await fs.rm(templateConfigPath)

  const installCommand =
    packageManager === 'pnpm' || packageManager === 'yarn' ? 'add' : 'install'
  const dependenciesList = `${packageManager} ${installCommand} ${templateConfigJson.dependencies.join(
    ' '
  )}`
  const devDependenciesList = `${packageManager} ${installCommand} ${templateConfigJson.devDependencies.join(
    ' '
  )} -D`

  const execPromise = util.promisify(exec)

  const { stdout: dependenciesStdout } = await execPromise(dependenciesList, {
    cwd: templatePath
  })
  console.log(dependenciesStdout)

  const { stdout: devDependenciesStdout } = await execPromise(
    devDependenciesList,
    { cwd: templatePath }
  )
  console.log(devDependenciesStdout)
}
