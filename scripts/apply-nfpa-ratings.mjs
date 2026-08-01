#!/usr/bin/env node
/**
 * Apply curated NFPA ratings from scripts/data/nfpa-element-ratings.json to details.json
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const detailsPath = resolve(__dirname, '../src/data/details.json')
const ratingsPath = resolve(__dirname, 'data/nfpa-element-ratings.json')
const outMetaPath = resolve(__dirname, 'manifests/nfpa-ratings.json')

const details = JSON.parse(readFileSync(detailsPath, 'utf8'))
const ratings = JSON.parse(readFileSync(ratingsPath, 'utf8'))

const meta = {}
let set = 0
let cleared = 0

for (const [key, row] of Object.entries(ratings)) {
  const el = details[key]
  if (!el) continue
  if (!el.NucleusPro) el.NucleusPro = {}

  meta[key] = {
    number: Number(key),
    symbol: row.symbol,
    cube: row.cube,
    source: row.cube ? 'curated' : null,
    note: row.note,
  }

  if (row.cube) {
    el.NucleusPro.nfpaCube = row.cube
    set++
  } else {
    el.NucleusPro.nfpaCube = null
    cleared++
  }
}

writeFileSync(detailsPath, `${JSON.stringify(details, null, 2)}\n`)
writeFileSync(outMetaPath, `${JSON.stringify(meta, null, 2)}\n`)
console.log(`Applied ${set} ratings, ${cleared} without data`)
