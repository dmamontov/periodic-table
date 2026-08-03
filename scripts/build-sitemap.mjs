#!/usr/bin/env node
/**
 * Generate public/sitemap.xml from src/data/elements.json.
 * Run: node scripts/build-sitemap.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

function readSiteUrl() {
  const source = readFileSync(resolve(__dirname, '../src/data/myCollection.ts'), 'utf8')
  const match = source.match(/export const siteUrl = '([^']+)'/)
  if (!match) throw new Error("Couldn't find siteUrl in src/data/myCollection.ts")
  return match[1]
}

const SITE_URL = readSiteUrl()

const elements = JSON.parse(
  readFileSync(resolve(__dirname, '../src/data/elements.json'), 'utf8'),
)

const urls = [
  { loc: `${SITE_URL}/`, priority: '1.0' },
  ...elements.map((el) => ({
    loc: `${SITE_URL}/element/${el.symbol.toLowerCase()}`,
    priority: '0.6',
  })),
]

const body = urls
  .map(
    ({ loc, priority }) =>
      `  <url>\n    <loc>${loc}</loc>\n    <priority>${priority}</priority>\n  </url>`,
  )
  .join('\n')

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`

writeFileSync(resolve(__dirname, '../public/sitemap.xml'), xml)
console.log(`sitemap.xml written with ${urls.length} URLs`)
