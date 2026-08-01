/**
 * Compact details.json: drop nulls, API metadata, redundant debye pipes.
 * Usage: node scripts/optimize-details.mjs [path/to/details.json]
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const defaultPath = join(__dirname, '../src/data/details.json')

const META_KEYS = new Set(['_id', '__v', 'name', 'number', 'symbol'])

function stripNulls(value) {
  if (Array.isArray(value)) {
    return value.map(stripNulls)
  }
  if (value && typeof value === 'object') {
    const out = {}
    for (const [key, child] of Object.entries(value)) {
      if (child === null) continue
      out[key] = stripNulls(child)
    }
    return out
  }
  return value
}

/** "645 | | | " → "645"; keep "413 | 2200" and "464 | 349 | 464". */
function normalizeDebyeTemperature(value) {
  if (typeof value !== 'string' || !value.includes('|')) return value

  const parts = value.split('|').map((part) => part.trim())
  while (parts.length > 1 && parts.at(-1) === '') {
    parts.pop()
  }
  if (parts.length <= 1) return parts[0] ?? value
  if (parts.slice(1).every((part) => !part)) return parts[0]
  return parts.join(' | ')
}

export function optimizeElementDetail(detail) {
  const { GridPro, ...rest } = detail
  const cleaned = stripNulls(rest)

  if (GridPro) {
    const grid = stripNulls(GridPro)
    if (grid.debyeTemperature) {
      grid.debyeTemperature = normalizeDebyeTemperature(grid.debyeTemperature)
    }
    cleaned.GridPro = grid
  }

  return cleaned
}

export function optimizeDetailsRecord(record) {
  const out = {}
  for (const [key, detail] of Object.entries(record)) {
    const withoutMeta = {}
    for (const [field, value] of Object.entries(detail)) {
      if (META_KEYS.has(field)) continue
      withoutMeta[field] = value
    }
    out[key] = optimizeElementDetail(withoutMeta)
  }
  return out
}

const inputPath = process.argv[2] ?? defaultPath
const before = readFileSync(inputPath, 'utf8').length
const raw = JSON.parse(readFileSync(inputPath, 'utf8'))
const optimized = optimizeDetailsRecord(raw)
const json = `${JSON.stringify(optimized, null, 2)}\n`

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  writeFileSync(inputPath, json)
  console.log(`Optimized ${inputPath}`)
  console.log(`${before} → ${json.length} bytes (−${((1 - json.length / before) * 100).toFixed(1)}%)`)
}

export default optimizeDetailsRecord
