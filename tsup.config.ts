import { defineConfig } from 'tsup'

export default defineConfig([
  {
    name: 'lib',
    entry: {
      lib: 'src/index.ts'
    },
    target: ['node16'],
    format: ['esm'],
    sourcemap: true,
    // minify: true,
    clean: true,
    dts: true
  },
  {
    name: 'bin',
    entry: {
      bin: 'src/bin/index.ts'
    },
    target: ['node16'],
    format: ['esm'],
    // minify: true,
    clean: true
  }
])
