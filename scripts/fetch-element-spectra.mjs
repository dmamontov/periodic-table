/**
 * Download emission spectrum images from periodic-table.tech static CDN.
 * Usage: node scripts/fetch-element-spectra.mjs
 */
import { mkdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const bundlePath = join(root, '1 _ H – Водород_files/main.98995f62.js')
const detailsPath = join(root, 'src/data/details.json')
const outDir = join(root, 'src/assets/element-spectra')
const manifestPath = join(root, 'scripts/manifests/element-spectrum-manifest.json')

const CDN = 'https://periodic-table.tech/static/media'

function pickWebpFilename(bundle, number) {
  const match = bundle.match(new RegExp(`element_spec_${number}\\.[a-f0-9]+\\.webp`))
  return match?.[0] ?? null
}

function buildManifest(bundle, details) {
  const manifest = {}
  for (let number = 1; number <= 118; number++) {
    if (!details[number]?.OverviewCommon?.hasSpectre) continue
    const filename = pickWebpFilename(bundle, number)
    if (filename) manifest[number] = filename
  }
  return manifest
}

const bundle = readFileSync(bundlePath, 'utf8')
const details = JSON.parse(readFileSync(detailsPath, 'utf8'))
const manifest = buildManifest(bundle, details)

mkdirSync(outDir, { recursive: true })

let downloaded = 0
let skipped = 0

for (const [number, filename] of Object.entries(manifest)) {
  const outFile = join(outDir, `${number}.webp`)
  if (existsSync(outFile)) {
    skipped++
    continue
  }

  const response = await fetch(`${CDN}/${filename}`)
  if (!response.ok) {
    throw new Error(`Element ${number}: HTTP ${response.status} for ${filename}`)
  }

  const buffer = Buffer.from(await response.arrayBuffer())
  writeFileSync(outFile, buffer)
  downloaded++
  process.stdout.write(`\r${downloaded + skipped}/${Object.keys(manifest).length}`)
  await new Promise((r) => setTimeout(r, 50))
}

writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`)
console.log(`\nSaved ${Object.keys(manifest).length} spectra to src/assets/element-spectra/`)
