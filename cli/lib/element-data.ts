import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { ROOT } from './paths.ts'

/** The subset of elements/elements.json fields the CLI tools actually use. */
export interface ElementRow {
  number: number
  symbol: string
}

export function loadElements(): ElementRow[] {
  const raw = readFileSync(resolve(ROOT, 'src/data/elements/elements.json'), 'utf8')
  return JSON.parse(raw) as ElementRow[]
}
