/**
 * One-off script: download element details from periodic-table.tech API.
 * Usage: node scripts/fetch-element-details.mjs
 * Token: VITE_PT_API_TOKEN in .env.local or environment.
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { optimizeDetailsRecord } from './optimize-details.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const outPath = join(root, 'src/data/details.json')

function loadToken() {
  if (process.env.VITE_PT_API_TOKEN) return process.env.VITE_PT_API_TOKEN
  try {
    const env = readFileSync(join(root, '.env.local'), 'utf8')
    const match = env.match(/^VITE_PT_API_TOKEN=(.+)$/m)
    if (match) return match[1].trim()
  } catch {
    // no .env.local
  }
  throw new Error('Set VITE_PT_API_TOKEN in .env.local or environment')
}

const token = loadToken()
const results = {}

for (let number = 1; number <= 118; number++) {
  const response = await fetch(
    `https://api.periodic-table.tech/api/periodic/element/${number}`,
    {
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    },
  )

  if (!response.ok) {
    throw new Error(`Element ${number}: HTTP ${response.status}`)
  }

  results[number] = await response.json()
  process.stdout.write(`\r${number}/118`)
  await new Promise((r) => setTimeout(r, 80))
}

writeFileSync(outPath, `${JSON.stringify(optimizeDetailsRecord(results), null, 2)}\n`)
console.log(`\nSaved ${outPath}`)
