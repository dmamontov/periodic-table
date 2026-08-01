#!/usr/bin/env node
/**
 * Search YouTube for Thoisoi element videos missing from thoisoi.ru.
 * Merges results into src/data/thoisoi-youtube.json
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const dataPath = resolve(__dirname, '../src/data/thoisoi-youtube.json')

const ELEMENTS_EN = {
  1: 'Hydrogen', 6: 'Carbon', 9: 'Fluorine', 33: 'Arsenic', 43: 'Technetium',
  61: 'Promethium', 80: 'Mercury', 85: 'Astatine', 87: 'Francium', 89: 'Actinium',
  91: 'Protactinium', 93: 'Neptunium', 95: 'Americium', 96: 'Curium',
  97: 'Berkelium', 98: 'Californium', 99: 'Einsteinium', 100: 'Fermium',
  101: 'Mendelevium', 102: 'Nobelium', 103: 'Lawrencium', 104: 'Rutherfordium',
  105: 'Dubnium', 106: 'Seaborgium', 107: 'Bohrium', 109: 'Meitnerium',
  110: 'Darmstadtium', 111: 'Roentgenium', 114: 'Flerovium', 115: 'Moscovium',
  116: 'Livermorium', 117: 'Tennessine', 118: 'Oganesson',
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms))
}

async function searchYoutubeUrl(elementName) {
  const query = encodeURIComponent(`Thoisoi ${elementName} site:youtube.com`)
  const res = await fetch(`https://html.duckduckgo.com/html/?q=${query}`, {
    headers: { 'User-Agent': 'Mozilla/5.0' },
  })
  if (!res.ok) return null
  const html = await res.text()
  const matches = [...html.matchAll(/uddg=([^&"]+)/g)]
  for (const match of matches) {
    const url = decodeURIComponent(match[1])
    if (!url.includes('youtube.com/watch?v=')) continue
    const videoId = url.match(/v=([A-Za-z0-9_-]{11})/)?.[1]
    if (!videoId) continue
    const oembed = await fetch(
      `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`,
    )
    if (!oembed.ok) continue
    const meta = await oembed.json()
    const author = String(meta.author_name ?? '').toLowerCase()
    const title = String(meta.title ?? '').toLowerCase()
    if (!author.includes('thoisoi')) continue
    const name = elementName.toLowerCase()
    if (!title.includes(name) && !title.includes(name.replace('ium', ''))) continue
    return `https://www.youtube.com/watch?v=${videoId}`
  }
  return null
}

const links = JSON.parse(readFileSync(dataPath, 'utf8'))
const missing = []
for (let n = 1; n <= 118; n++) {
  if (!links[String(n)]) missing.push(n)
}

console.log(`Missing: ${missing.length} elements`)

const found = {}
const notFound = []

for (const number of missing) {
  const name = ELEMENTS_EN[number]
  if (!name) {
    notFound.push(number)
    continue
  }
  process.stdout.write(`${number} ${name}... `)
  await sleep(1200)
  const url = await searchYoutubeUrl(name)
  if (url) {
    found[number] = url
    console.log(url)
  } else {
    notFound.push(number)
    console.log('not found')
  }
}

const merged = { ...links, ...Object.fromEntries(
  Object.entries(found).map(([k, v]) => [k, v]),
) }
writeFileSync(dataPath, `${JSON.stringify(merged, null, 2)}\n`)

console.log(`\nFound ${Object.keys(found).length} new videos`)
console.log('Not found:', notFound.join(', '))
