import type { Endpoints } from '@octokit/types'

const RELEASES_API_URL =
  'https://api.github.com/repos/greasify/templates/releases/latest'

interface Template {
  name: string
  value: string
}

async function loadTemplates() {
  const response = await fetch(RELEASES_API_URL)
  const data =
    (await response.json()) as Endpoints['GET /repos/{owner}/{repo}/releases/latest']['response']['data']

  const templates: Template[] = []
  for (const asset of data.assets) {
    const [name] = asset.name.split('.')
    templates.push({
      name: name!,
      value: asset.browser_download_url
    })
  }

  return templates
}

export const templates = await loadTemplates()
