#!/usr/bin/env node
/** Convert RadiaCode/GammaVision spectrum XML to collection JSON. Usage: node scripts/convert-radiacode-spectrum.mjs <input.xml> <output-id> */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const [inputPath, outputId] = process.argv.slice(2)
if (!inputPath || !outputId) {
  console.error('Usage: node scripts/convert-radiacode-spectrum.mjs <input.xml> <output-id>')
  process.exit(1)
}

const xml = readFileSync(resolve(inputPath), 'utf8')

function extractTag(block, tag) {
  const re = new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`, 'i')
  const m = block.match(re)
  if (!m) return ''
  return m[1].replace(/<!\[CDATA\[|\]\]>/g, '').trim()
}

const resultBlock = xml.match(/<ResultData>([\s\S]*?)<\/ResultData>/)?.[1]
const energyBlock = xml.match(/<EnergySpectrum>([\s\S]*?)<\/EnergySpectrum>/)?.[1]
if (!resultBlock || !energyBlock) {
  console.error('Invalid RadiaCode spectrum XML')
  process.exit(1)
}

const coeffs = [...energyBlock.matchAll(/<Coefficient>([^<]+)<\/Coefficient>/g)].map((m) =>
  parseFloat(m[1]),
)
const counts = [...energyBlock.matchAll(/<DataPoint>(\d+)<\/DataPoint>/g)].map((m) =>
  parseInt(m[1], 10),
)

const out = {
  id: outputId,
  device: extractTag(resultBlock, 'Name') || 'RadiaCode-102',
  sample: extractTag(energyBlock, 'SpectrumName'),
  serialNumber: extractTag(energyBlock, 'SerialNumber'),
  measurementTimeSec: parseInt(extractTag(energyBlock, 'MeasurementTime'), 10),
  startTime: extractTag(resultBlock, 'StartTime'),
  endTime: extractTag(resultBlock, 'EndTime'),
  channels: counts.length,
  calibration: coeffs,
  counts,
}

const outDir = resolve(__dirname, '../src/data/spectra')
const publicDir = resolve(__dirname, '../public/collection-spectra')
mkdirSync(outDir, { recursive: true })
mkdirSync(publicDir, { recursive: true })
const outPath = resolve(outDir, `${outputId}.json`)
const publicXmlPath = resolve(publicDir, `${outputId}.xml`)
writeFileSync(outPath, `${JSON.stringify(out)}\n`)
writeFileSync(publicXmlPath, xml)
console.log(`Wrote ${outPath} (${counts.length} channels)`)
console.log(`Wrote ${publicXmlPath}`)
