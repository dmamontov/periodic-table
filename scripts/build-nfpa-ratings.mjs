#!/usr/bin/env node
/**
 * Validate nfpa-element-ratings.json (118 elements, cube format).
 * Run: node scripts/build-nfpa-ratings.mjs
 */
import { readFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ratingsPath = resolve(__dirname, 'data/nfpa-element-ratings.json')

const ratings = JSON.parse(readFileSync(ratingsPath, 'utf8'))
const cubeRe = /^(\d|-)+,(\d|-)+,(\d|-)+,(-|W|OX|SA|RAD|W\+RAD|OX\+W)$/

let ok = 0
let nulls = 0
for (let n = 1; n <= 118; n++) {
  const row = ratings[String(n)]
  if (!row) {
    console.error(`Missing element ${n}`)
    process.exit(1)
  }
  if (!row.cube) {
    nulls++
    continue
  }
  if (!cubeRe.test(row.cube)) {
    console.error(`Invalid cube for ${n} ${row.symbol}: ${row.cube}`)
    process.exit(1)
  }
  ok++
}

console.log(`Valid: ${ok} with ratings, ${nulls} without, 118 total`)
