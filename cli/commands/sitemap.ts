import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { ROOT } from '../lib/paths.ts'
import { loadElements } from '../lib/element-data.ts'

function readSiteUrl(): string {
  const source = readFileSync(resolve(ROOT, 'src/data/collection.ts'), 'utf8')
  const match = /export const siteUrl = '([^']+)'/.exec(source)
  if (!match) throw new Error("Couldn't find siteUrl in src/data/collection.ts")
  return match[1]
}

export function buildSitemap(): void {
  const siteUrl = readSiteUrl()
  const elements = loadElements()

  const urls = [
    { loc: `${siteUrl}/`, priority: '1.0' },
    ...elements.map((el) => ({
      loc: `${siteUrl}/element/${el.symbol.toLowerCase()}`,
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

  const outPath = resolve(ROOT, 'public/sitemap.xml')
  writeFileSync(outPath, xml)
  console.log(`Wrote ${outPath} (${urls.length} URLs)`)
}
