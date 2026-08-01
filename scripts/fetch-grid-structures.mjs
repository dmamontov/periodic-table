/**
 * Download crystal lattice structure animations from periodic-table.tech.
 * 12 structure types (struct1–struct12), mapped via GridPro.gridStructureNum.
 * Usage: node scripts/fetch-grid-structures.mjs
 */
import { mkdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const bundlePath = join(root, '1 _ H – Водород_files/main.98995f62.js')
const outDir = join(root, 'src/assets/grid-structures')
const manifestPath = join(root, 'scripts/manifests/grid-structure-manifest.json')

const CDN = 'https://periodic-table.tech/static/media'

function pickGifFilename(bundle, number) {
  const match = bundle.match(new RegExp(`struct${number}\\.[a-f0-9]+\\.gif`))
  return match?.[0] ?? null
}

const bundle = readFileSync(bundlePath, 'utf8')
const manifest = {}

for (let number = 1; number <= 12; number++) {
  const filename = pickGifFilename(bundle, number)
  if (filename) manifest[number] = filename
}

mkdirSync(outDir, { recursive: true })

let downloaded = 0
let skipped = 0

for (const [number, filename] of Object.entries(manifest)) {
  const outFile = join(outDir, `${number}.gif`)
  if (existsSync(outFile)) {
    skipped++
    continue
  }

  const response = await fetch(`${CDN}/${filename}`)
  if (!response.ok) {
    throw new Error(`Structure ${number}: HTTP ${response.status} for ${filename}`)
  }

  writeFileSync(outFile, Buffer.from(await response.arrayBuffer()))
  downloaded++
  process.stdout.write(`\r${downloaded + skipped}/${Object.keys(manifest).length}`)
  await new Promise((r) => setTimeout(r, 50))
}

writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`)
console.log(`\nSaved ${Object.keys(manifest).length} structures to src/assets/grid-structures/`)
