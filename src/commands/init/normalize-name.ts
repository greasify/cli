import decamelize from 'decamelize'

export const DEFAULT_NAME = 'greasify-userscript'

export function normalizeName(name: string, templateName?: string) {
  if (name === DEFAULT_NAME && templateName) {
    name += `-${templateName}`
  }

  return decamelize(name, { separator: '-' })
}
