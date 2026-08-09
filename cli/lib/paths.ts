import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const here = dirname(fileURLToPath(import.meta.url))

/** Project root, resolved once from this file's own location (cli/lib/paths.ts). */
export const ROOT = resolve(here, '../..')
