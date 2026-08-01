#!/usr/bin/env node
/**
 * Derive GHS pictograms for elements from NFPA ratings + aggregation state.
 * Output: src/data/element-ghs.json
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const nfpa = JSON.parse(readFileSync(resolve(__dirname, 'data/nfpa-element-ratings.json'), 'utf8'))
const details = JSON.parse(readFileSync(resolve(__dirname, '../src/data/details.json'), 'utf8'))

/** Standard GHS display order */
const ORDER = [
  'explosive',
  'oxidizer',
  'flammable',
  'compressedGas',
  'corrosive',
  'acuteToxicity',
  'healthHazard',
  'irritant',
  'environment',
]

function parseCube(cube) {
  const [fire, health, , special] = (cube || '0,0,0,-').split(',').map((s) => s.trim())
  return {
    fire: Number(fire),
    health: Number(health),
    specs: special.split('+').filter(Boolean),
  }
}

function derive(number, cube, aggState) {
  const set = new Set()
  const { fire, health, specs } = parseCube(cube)
  const isGas = aggState === 0

  if (isGas) set.add('compressedGas')
  if (specs.includes('OX')) set.add('oxidizer')
  if (!Number.isNaN(fire) && fire >= 3) set.add('flammable')
  if (!Number.isNaN(health) && health >= 4) set.add('acuteToxicity')
  else if (!Number.isNaN(health) && health >= 3) set.add('healthHazard')
  else if (!Number.isNaN(health) && health >= 1) set.add('irritant')

  if ([9, 17, 35, 53, 117].includes(number)) set.add('corrosive')
  if (specs.includes('W')) {
    set.add('flammable')
    if ([3, 11, 19, 37, 55, 87].includes(number)) set.add('corrosive')
  }

  if ([4, 27, 28, 33, 48, 80, 81, 82].includes(number)) set.add('healthHazard')
  if ([33, 80, 81, 84, 85].includes(number)) set.add('acuteToxicity')
  if ([48, 80, 82, 92].includes(number)) set.add('environment')

  if (specs.includes('RAD') || number === 43) {
    set.add('healthHazard')
    if (health >= 4 || [84, 85, 86, 94].includes(number)) set.add('acuteToxicity')
  }

  if (number === 15) set.add('flammable')

  // Element-specific refinements (elemental form, typical SDS)
  const only = (items) => {
    set.clear()
    for (const item of items) set.add(item)
  }

  if (number === 1) only(['compressedGas', 'flammable'])
  if (number === 2) only(['compressedGas'])
  if (number === 7) only(['compressedGas'])
  if (number === 8) only(['compressedGas', 'oxidizer'])
  if (number === 9) only(['compressedGas', 'oxidizer', 'corrosive', 'acuteToxicity'])
  if (number === 10) only(['compressedGas'])
  if (number === 17) only(['compressedGas', 'oxidizer', 'corrosive', 'acuteToxicity'])
  if (number === 18) only(['compressedGas'])
  if (number === 35) only(['oxidizer', 'corrosive', 'acuteToxicity'])
  if (number === 36) only(['compressedGas'])
  if (number === 53) only(['corrosive', 'irritant'])
  if (number === 54) only(['compressedGas'])
  if (number === 86) only(['compressedGas', 'healthHazard', 'acuteToxicity'])
  if (number === 118) only(['compressedGas', 'healthHazard'])
  if ([46, 47, 78, 79].includes(number)) only([])
  if ([5, 6, 14].includes(number)) only([])

  return ORDER.filter((p) => set.has(p))
}

const out = {}
for (let n = 1; n <= 118; n++) {
  const key = String(n)
  const row = nfpa[key]
  const agg = details[key]?.PropertiesCommon?.aggregationState
  const pictograms = derive(n, row?.cube, agg)
  if (pictograms.length) out[key] = pictograms
}

writeFileSync(resolve(__dirname, '../src/data/element-ghs.json'), `${JSON.stringify(out, null, 2)}\n`)
console.log(`GHS pictograms for ${Object.keys(out).length} elements`)
