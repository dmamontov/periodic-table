/**
 * Download element hero images from periodic-table.tech static CDN.
 * Filenames are resolved from the site's JS bundle mapping.
 * Usage: node scripts/fetch-element-images.mjs
 */
import { mkdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const bundlePath = join(root, '1 _ H – Водород_files/main.98995f62.js')
const detailsPath = join(root, 'src/data/details.json')
const outDir = join(root, 'src/assets/element-images')
const manifestPath = join(root, 'scripts/manifests/element-image-manifest.json')

const CDN = 'https://periodic-table.tech/static/media'

function pickJpgFilenames(bundle, number) {
  const files = [
    ...new Set(
      [...bundle.matchAll(new RegExp(`element_${number}\\.[a-f0-9]+\\.jpg`, 'g'))].map(
        (m) => m[0],
      ),
    ),
  ]
  if (!files.length) return null
  return files.length > 1 ? files[1] : files[0]
}

function buildManifest(bundle, details) {
  const manifest = {}
  for (let number = 1; number <= 118; number++) {
    if (!details[number]?.OverviewCommon?.hasImage) continue
    const filename = pickJpgFilenames(bundle, number)
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
  const outFile = join(outDir, `${number}.jpg`)
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
console.log(`\nSaved ${Object.keys(manifest).length} images to src/assets/element-images/`)
