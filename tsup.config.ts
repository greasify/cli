import { defineConfig } from 'tsup'

export default defineConfig([
  {
    entry: {
      bin: 'src/index.ts'
    },
    target: ['node20'],
    format: ['esm'],
    minify: false,
    clean: true
  }
])
