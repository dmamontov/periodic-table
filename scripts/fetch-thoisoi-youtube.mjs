#!/usr/bin/env node
/**
 * Collects direct YouTube links from https://thoisoi.ru/
 * and supplements them with verified videos from the Russian Thoisoi
 * channel that aren't on the site yet.
 *
 * Output: src/data/thoisoi-youtube.json
 */
import { writeFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const outPath = resolve(__dirname, '../src/data/thoisoi-youtube.json')

/** Verified video IDs from the Russian Thoisoi channel (title contains the element name). */
const SUPPLEMENT = {
  1: 'oRxaGQe0zj8', // Hydrogen — the LIGHTEST Gas in the Universe!
  6: 'q-Oyp936Big', // Carbon — the STRANGEST Chemical Element!
  43: '2UbPY7VHLWs', // Technetium — the First ARTIFICIAL Metal on Earth!
  80: 'MbJRT6XLvBE', // Mercury — the Most MOBILE Metal on Earth!
  95: 'XQcoKrtjfwc', // Americium — the Metal You CAN'T ESCAPE!
  98: 'P0cFU47hD0s',
}

const RU_NAMES = {
  1: 'Водород', 6: 'Углерод', 9: 'Фтор', 33: 'Мышьяк', 43: 'Технеций', 61: 'Прометий',
  80: 'Ртуть', 85: 'Астат', 87: 'Франций', 89: 'Актиний', 91: 'Протактиний', 93: 'Нептуний',
  95: 'Америций', 96: 'Кюрий', 97: 'Берклий', 98: 'Калифорний', 99: 'Эйнштейний',
  100: 'Фермий', 101: 'Менделевий', 102: 'Нобелий', 103: 'Лоуренсий', 104: 'Резерфордий',
  105: 'Дубний', 106: 'Сиборгий', 107: 'Борий', 109: 'Мейтнерий', 110: 'Дармштадтий',
  111: 'Рентгений', 114: 'Флеровий', 115: 'Московий', 116: 'Ливерморий', 117: 'Теннессин',
  118: 'Оганесон',
}

const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'

function toUrl(id) {
  return `https://www.youtube.com/watch?v=${id}`
}

function extractVideos(html) {
  const results = []
  const re = /"videoRenderer":\{(.*?)\},"trackingParams"/gs
  let m
  while ((m = re.exec(html))) {
    const block = m[1]
    const id = block.match(/"videoId":"([^"]+)"/)?.[1]
    const title = block.match(/"title":\{"runs":\[\{"text":"([^"]+)"/)?.[1]
    const channel = block.match(/"ownerText":\{"runs":\[\{"text":"([^"]+)"/)?.[1]
    if (id && title && /thoisoi/i.test(channel ?? '')) {
      results.push({ id, title })
    }
  }
  return results
}

async function searchOnYouTube(name) {
  const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(`${name} Thoisoi`)}`
  const res = await fetch(url, { headers: { 'User-Agent': UA } })
  const html = await res.text()
  const needle = name.toLowerCase()
  return extractVideos(html).find((v) => v.title.toLowerCase().includes(needle)) ?? null
}

async function parseSite() {
  const res = await fetch('https://thoisoi.ru/')
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const html = await res.text()
  const links = {}
  const cellPattern = /<td class="cell[^"]*"[\s\S]*?<\/td>/g

  for (const block of html.match(cellPattern) ?? []) {
    const number = block.match(/<div class="number[^"]*">\s*(\d+)/)?.[1]
    const raw = block.match(/https:\/\/www\.youtube\.com\/watch\?[^'")\s]+/)?.[0]
    if (!number || !raw) continue
    links[number] = raw.replace(/&amp;/g, '&').replace(/&t=[^&]+/, '')
  }
  return links
}

const links = await parseSite()

for (const [num, id] of Object.entries(SUPPLEMENT)) {
  links[num] = toUrl(id)
}

const missing = Object.keys(RU_NAMES).filter((n) => !links[n])
if (missing.length && process.argv.includes('--search-youtube')) {
  for (const num of missing) {
    await new Promise((r) => setTimeout(r, 600))
    const name = RU_NAMES[num]
    const hit = await searchOnYouTube(name)
    if (hit) {
      links[num] = toUrl(hit.id)
      console.log(`YouTube: ${num} ${name} -> ${hit.title}`)
    }
  }
}

const sorted = Object.fromEntries(
  Object.keys(links)
    .sort((a, b) => Number(a) - Number(b))
    .map((k) => [k, links[k]]),
)

writeFileSync(outPath, `${JSON.stringify(sorted, null, 2)}\n`)
console.log(`Wrote ${outPath}: ${Object.keys(sorted).length} videos`)
