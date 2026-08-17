import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import type {
  ElementCollection,
  ElementCollectionHistoryEntry,
  ElementCollectionPhysical,
  ElementCollectionRadioactive,
  ElementCollectionSpectrum,
} from '../../src/types/collection/collection.ts'
import type { LocalizedLabel } from '../../src/utils/localizedLabel.ts'
import { ROOT } from './paths.ts'
import type { ElementRow } from './element-data.ts'

export const COLLECTION_PATH = resolve(ROOT, 'src/data/collection.ts')

/** Reads the real, current `myElements` map straight from the source file — always in sync with what the app itself loads. */
export async function loadCollection(): Promise<Record<string, ElementCollection>> {
  const mod = await import('../../src/data/collection.ts')
  return mod.myElements
}

function quoteString(value: string): string {
  return `'${value.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`
}

function serializeLocalizedLabel(label: LocalizedLabel): string {
  if (typeof label === 'string') return quoteString(label)
  const parts: string[] = []
  for (const key of ['ru', 'en', 'zh'] as const) {
    const value = label[key]
    if (value !== undefined) parts.push(`${key}: ${quoteString(value)}`)
  }
  return `{ ${parts.join(', ')} }`
}

function serializePhysical(physical: ElementCollectionPhysical | null | undefined, indent: string): string | null {
  if (!physical) return null
  const fields: [string, string][] = []
  if (physical.sampleState) fields.push(['sampleState', quoteString(physical.sampleState)])
  if (physical.description) fields.push(['description', serializeLocalizedLabel(physical.description)])
  if (physical.allotrope) fields.push(['allotrope', serializeLocalizedLabel(physical.allotrope)])
  if (physical.container) fields.push(['container', quoteString(physical.container)])
  if (physical.purity) fields.push(['purity', quoteString(physical.purity)])
  if (physical.weight) fields.push(['weight', quoteString(physical.weight)])
  if (physical.acquiredDate) fields.push(['acquiredDate', quoteString(physical.acquiredDate)])
  if (fields.length === 0) return null
  if (!physical.description && !physical.allotrope) {
    return `${indent}physical: { ${fields.map(([key, value]) => `${key}: ${value}`).join(', ')} },`
  }
  const lines = fields.map(([key, value]) => `${indent}  ${key}: ${value},`)
  return `${indent}physical: {\n${lines.join('\n')}\n${indent}},`
}

function serializeRadioactive(radioactive: ElementCollectionRadioactive | null | undefined, indent: string): string | null {
  if (!radioactive) return null
  const lines: string[] = []
  if (radioactive.isotope) lines.push(`${indent}  isotope: ${quoteString(radioactive.isotope)},`)
  if (radioactive.sourceType) lines.push(`${indent}  sourceType: ${quoteString(radioactive.sourceType)},`)
  if (radioactive.decayParent?.length) {
    lines.push(`${indent}  decayParent: [`)
    for (const parent of radioactive.decayParent) {
      const parts = [`symbol: ${quoteString(parent.symbol)}`, `isotope: ${quoteString(parent.isotope)}`]
      if (parent.sampleState) parts.push(`sampleState: ${quoteString(parent.sampleState)}`)
      lines.push(`${indent}    { ${parts.join(', ')} },`)
    }
    lines.push(`${indent}  ],`)
  }
  if (lines.length === 0) return null
  return `${indent}radioactive: {\n${lines.join('\n')}\n${indent}},`
}

function serializeSpectrum(spectrum: ElementCollectionSpectrum | null | undefined, indent: string): string | null {
  if (!spectrum?.id) return null
  const lines = [`${indent}  id: ${quoteString(spectrum.id)},`]
  if (spectrum.filename) lines.push(`${indent}  filename: ${serializeLocalizedLabel(spectrum.filename)},`)
  if (spectrum.leadShielded) lines.push(`${indent}  leadShielded: true,`)
  if (spectrum.annotations?.length) {
    lines.push(`${indent}  annotations: [`)
    for (const annotation of spectrum.annotations) {
      lines.push(`${indent}    { energy: ${annotation.energy}, label: ${quoteString(annotation.label)} },`)
    }
    lines.push(`${indent}  ],`)
  }
  return `${indent}spectrum: {\n${lines.join('\n')}\n${indent}},`
}

function serializeHistoryEntry(entry: ElementCollectionHistoryEntry, indent: string): string {
  const lines = [
    serializePhysical(entry.physical, `${indent}  `),
    serializeRadioactive(entry.radioactive, `${indent}  `),
    serializeSpectrum(entry.spectrum, `${indent}  `),
  ].filter((line): line is string => line !== null)
  if (entry.retained !== undefined && entry.retained !== null) {
    lines.push(`${indent}  retained: ${entry.retained},`)
  }
  if (entry.reason) {
    lines.push(`${indent}  reason: ${quoteString(entry.reason)},`)
  }
  return `${indent}{\n${lines.join('\n')}\n${indent}},`
}

function serializeHistory(history: ElementCollectionHistoryEntry[] | null | undefined, indent: string): string | null {
  if (!history?.length) return null
  const lines = history.map((entry) => serializeHistoryEntry(entry, `${indent}  `))
  return `${indent}history: [\n${lines.join('\n')}\n${indent}],`
}

export function serializeEntry(symbol: string, entry: ElementCollection): string {
  const indent = '    '
  const groupLines = [
    serializePhysical(entry.physical, indent),
    serializeRadioactive(entry.radioactive, indent),
    serializeSpectrum(entry.spectrum, indent),
    serializeHistory(entry.history, indent),
  ].filter((line): line is string => line !== null)
  if (groupLines.length === 0) return `  ${symbol}: {},`
  return `  ${symbol}: {\n${groupLines.join('\n')}\n  },`
}

/** Finds the index of the brace matching text[openIndex] ('{'), skipping braces inside strings/comments. */
export function findMatchingBrace(text: string, openIndex: number): number {
  let depth = 0
  let inString: string | null = null
  let inLineComment = false
  let inBlockComment = false
  for (let i = openIndex; i < text.length; i++) {
    const c = text[i]
    if (inLineComment) { if (c === '\n') inLineComment = false; continue }
    if (inBlockComment) { if (c === '*' && text[i + 1] === '/') { inBlockComment = false; i++ } continue }
    if (inString) {
      if (c === '\\') { i++; continue }
      if (c === inString) inString = null
      continue
    }
    if (c === '/' && text[i + 1] === '/') { inLineComment = true; i++; continue }
    if (c === '/' && text[i + 1] === '*') { inBlockComment = true; i++; continue }
    if (c === '"' || c === "'" || c === '`') { inString = c; continue }
    if (c === '{') depth++
    else if (c === '}') {
      depth--
      if (depth === 0) return i
    }
  }
  throw new Error('Unbalanced braces while scanning myElements')
}

export function renderCollectionSource(
  source: string,
  myElements: Record<string, ElementCollection>,
  elements: ElementRow[],
): string {
  const marker = 'export const myElements: Record<string, ElementCollection> = {'
  const markerIndex = source.indexOf(marker)
  if (markerIndex === -1) throw new Error(`Couldn't find "${marker}"`)
  const openBraceIndex = markerIndex + marker.length - 1
  const closeBraceIndex = findMatchingBrace(source, openBraceIndex)

  const before = source.slice(0, openBraceIndex + 1)
  const after = source.slice(closeBraceIndex + 1)
  const orderedSymbols = elements.filter((el) => myElements[el.symbol]).map((el) => el.symbol)
  const body = orderedSymbols.map((symbol) => serializeEntry(symbol, myElements[symbol])).join('\n')

  return `${before}\n${body}\n}${after}`
}

export function saveCollection(
  myElements: Record<string, ElementCollection>,
  elements: ElementRow[],
  collectionPath: string = COLLECTION_PATH,
): void {
  const source = readFileSync(collectionPath, 'utf8')
  writeFileSync(collectionPath, renderCollectionSource(source, myElements, elements))
}
