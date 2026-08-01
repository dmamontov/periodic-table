/**
 * Extract openers and NFPA label tables from periodic-table.tech JS bundle.
 * Usage: node scripts/extract-pt-i18n.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const bundlePath = join(root, '1 _ H – Водород_files/main.98995f62.js')
const js = readFileSync(bundlePath, 'utf8')

function extractObject(key, fromIndex = 0) {
  const start = js.indexOf(`"${key}":{`, fromIndex)
  if (start < 0) return null
  let depth = 0
  let end = start
  for (let i = start; i < js.length; i++) {
    if (js[i] === '{') depth++
    if (js[i] === '}') {
      depth--
      if (depth === 0) {
        end = i + 1
        break
      }
    }
  }
  return Function(`return {${js.slice(start, end)}}`)()[key]
}

function toIdMap(obj) {
  const map = {}
  for (const [key, value] of Object.entries(obj)) {
    map[key.replace('item', '')] = value
  }
  return map
}

function toTsExport(name, obj) {
  return `export const ${name} = ${JSON.stringify(obj, null, 2)} as const\n`
}

const openerPositions = []
let searchFrom = 0
while (true) {
  const pos = js.indexOf('"first_opener":{', searchFrom)
  if (pos < 0) break
  openerPositions.push(pos)
  searchFrom = pos + 1
}

const locales = openerPositions.map((pos, index) => {
  const openers = extractObject('first_opener', pos)
  const regionStart = index === 0 ? 0 : openerPositions[index - 1]
  const regionEnd = index + 1 < openerPositions.length ? openerPositions[index + 1] : js.length
  const region = js.slice(regionStart, regionEnd)
  const nfpa = {}
  for (const key of ['nfpa1', 'nfpa2', 'nfpa3', 'nfpa4']) {
    const localPos = region.indexOf(`"${key}":{`)
    if (localPos >= 0) {
      nfpa[key] = extractObject(key, regionStart + localPos)
    }
  }
  return {
    sample: openers?.item0 ?? '',
    openers: toIdMap(openers ?? {}),
    nfpa,
  }
})

const en = locales.find((l) => /[A-Za-z]/.test(l.sample) && !/[А-Яа-я]/.test(l.sample))
const ru = locales.find((l) => /[А-Яа-я]/.test(l.sample))
const zh = locales.find((l) => /[\u4e00-\u9fff]/.test(l.sample))

const partialsDir = join(root, 'src/locales/partials')
writeFileSync(join(partialsDir, 'openers.en.ts'), toTsExport('openersEn', en?.openers ?? {}))
writeFileSync(join(partialsDir, 'openers.ru.ts'), toTsExport('openersRu', ru?.openers ?? en?.openers ?? {}))
writeFileSync(
  join(partialsDir, 'nfpa.ts'),
  toTsExport('nfpaLabels', { en: en?.nfpa, ru: ru?.nfpa, zh: zh?.nfpa ?? en?.nfpa }),
)

console.log(`Locales: ${locales.length}, EN openers: ${Object.keys(en?.openers ?? {}).length}, RU openers: ${Object.keys(ru?.openers ?? {}).length}`)
