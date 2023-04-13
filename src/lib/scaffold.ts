export interface ScaffoldOptions {
  name: string
}

export function scaffold(options: ScaffoldOptions) {
  console.log(options.name)
}
