import type { Locale } from '../locales/types'
import { localeMessages } from '../locales/messages'
import elementColorIndex from '../data/element-color-index.json'
import { getElementGhsPictograms } from '../data'
import type { GhsDisplayItem } from '../types/ghs'

/** Realistic pure-substance colors (an extended palette, not Jmol/CPK). */
export const ELEMENT_SAMPLE_COLORS = [
  '#E8E8E8', // 0  colorless (gases)
  '#C6C6C6', // 1  silvery white
  '#D4B060', // 2  pale gold (Cs, Fr)
  '#B5B5A8', // 3  white-gray (Be)
  '#B0B0B0', // 4  shiny gray (Mg)
  '#808080', // 5  gray (Fe, Ni, U…)
  '#6A7078', // 6  steel gray (Hf, W, Re)
  '#9A9A96', // 7  grayish white (Ge, As, Sb)
  '#8FA4B4', // 8  bluish gray (V, Ga, Zn, Os…)
  '#D0C8A0', // 9  pale yellow tint (Ca, Sr, Ba, Eu)
  '#B87333', // 10 copper
  '#FFD123', // 11 gold
  '#FFF030', // 12 sulfur yellow
  '#F0E8B0', // 13 pale halogen yellow (spare)
  '#A62929', // 14 bromine red-brown
  '#940094', // 15 iodine purple
  '#1A1A1A', // 16 black (B, C)
  '#8A7D72', // 17 brownish silver (Bi)
  '#B8B8C8', // 18 mercury liquid
  '#5C5C62', // 19 metallic gray (Pb)
  '#8C2A2A', // 20 red phosphorus
  '#F5F0D8', // 21 fluorine (pale yellow gas)
  '#E8E2B0', // 22 chlorine (pale yellow, faintly greenish)
] as const

export type ElementSampleColorFinish = 'metallic' | 'glossy' | 'subtle' | 'matte'

/** Palette indices with a matte / glossy / subtle finish (the rest are metallic). */
const GLOSSY_COLOR_INDICES = new Set([12, 14, 15, 20])
const SUBTLE_COLOR_INDICES = new Set([0, 21, 22])
const MATTE_COLOR_INDICES = new Set([16])

const colorIndexByNumber = elementColorIndex as Record<string, number>

export function formatOpener(
  raw: string | null | undefined,
  locale: Locale,
): string {
  if (!raw) return '----'
  const table = localeMessages[locale].openers
  return raw
    .split('/')
    .map((id) => table[id.trim()] ?? id.trim())
    .join(', ')
}

export function formatElementSymbol(symbol: string): string {
  if (symbol.length < 2) return symbol
  const first = symbol[0]
  if (!first) return symbol
  return first.toUpperCase() + symbol.slice(1).toLowerCase()
}

export function formatIonChargeHtml(
  symbol: string,
  charge: string | null | undefined,
): string {
  if (!charge) return '----'
  return `${symbol}<sup>${charge}</sup>`
}

export function getElementColorHex(index: string | null | undefined): string | null {
  if (index === null || index === undefined || index === '') return null
  const i = Number(index)
  if (Number.isNaN(i) || i < 0 || i >= ELEMENT_SAMPLE_COLORS.length) return null
  const color = ELEMENT_SAMPLE_COLORS[i]
  return color ?? null
}

export function getElementSampleColorHex(atomicNumber: number): string | null {
  const index = colorIndexByNumber[String(atomicNumber)]
  if (index === undefined || index < 0 || index >= ELEMENT_SAMPLE_COLORS.length) return null
  const color = ELEMENT_SAMPLE_COLORS[index]
  return color ?? null
}

export function getElementSampleColorFinish(atomicNumber: number): ElementSampleColorFinish {
  const index = colorIndexByNumber[String(atomicNumber)]
  if (index === undefined) return 'metallic'
  if (MATTE_COLOR_INDICES.has(index)) return 'matte'
  if (SUBTLE_COLOR_INDICES.has(index)) return 'subtle'
  if (GLOSSY_COLOR_INDICES.has(index)) return 'glossy'
  return 'metallic'
}

export interface NfpaWhiteDiamondPart {
  type: 'text' | 'rad'
  value: string
}

export interface NfpaDisplay {
  red: string
  blue: string
  yellow: string
  white: string
  whiteDiamond: string
  whiteDiamondParts: NfpaWhiteDiamondPart[]
  redLabel: string
  blueLabel: string
  yellowLabel: string
  whiteLabel: string
  whiteStrike: boolean
}

function nfpaSpecialLabel(locale: Locale, code: string): string {
  const map: Record<string, string> = {
    W: 'nfpa4:0',
    OX: 'nfpa4:1',
    SA: 'nfpa4:2',
    RAD: 'nfpa4:3',
  }
  const ref = map[code]
  if (!ref) return code
  const [category, index] = ref.split(':')
  if (!category || index === undefined) return code
  return nfpaLabel(locale, category as 'nfpa4', index)
}

function nfpaWhiteDiamondParts(value: string): NfpaWhiteDiamondPart[] {
  if (!value || value === '-') return []
  const codes = value.split('+').map((p) => p.trim()).filter(Boolean)
  if (codes.includes('RAD')) return [{ type: 'rad', value: '' }]
  return codes.map((part) => ({ type: 'text' as const, value: part }))
}

function nfpaWhiteDiamond(value: string): string {
  return nfpaWhiteDiamondParts(value).map((part) => part.value).join('')
}

function nfpaWhiteLabel(locale: Locale, value: string): string {
  if (value === '-' || value === '') return '----'
  const parts = value.split('+').map((p) => p.trim()).filter(Boolean)
  if (!parts.length) return '----'
  return parts.map((part) => nfpaSpecialLabel(locale, part)).join('; ')
}

function nfpaLabel(
  locale: Locale,
  category: 'nfpa1' | 'nfpa2' | 'nfpa3' | 'nfpa4',
  index: number | string,
): string {
  const labels = localeMessages[locale].nfpa
  const table: Record<string, string> = labels[category]
  return table[`item${index}`] ?? '----'
}

export function buildNfpaDisplay(
  raw: string | null | undefined,
  locale: Locale,
): NfpaDisplay | null {
  if (!raw) return null
  const parts = raw.split(',').map((s) => s.trim())
  if (parts.length < 4) return null

  const [red, blue, yellow, white] = parts
  if (red === undefined || blue === undefined || yellow === undefined || white === undefined) {
    return null
  }
  const redNum = Number(red)
  const blueNum = Number(blue)
  const yellowNum = Number(yellow)

  const score = (value: string, num: number) =>
    value === '-' || Number.isNaN(num) ? '' : String(num)

  return {
    red: score(red, redNum),
    blue: score(blue, blueNum),
    yellow: score(yellow, yellowNum),
    white: white === '-' ? '' : white,
    whiteDiamond: nfpaWhiteDiamond(white),
    whiteDiamondParts: nfpaWhiteDiamondParts(white),
    redLabel: Number.isNaN(redNum) ? '----' : nfpaLabel(locale, 'nfpa1', redNum),
    blueLabel: Number.isNaN(blueNum) ? '----' : nfpaLabel(locale, 'nfpa2', blueNum),
    yellowLabel: Number.isNaN(yellowNum) ? '----' : nfpaLabel(locale, 'nfpa3', yellowNum),
    whiteLabel: nfpaWhiteLabel(locale, white),
    whiteStrike: white.split('+').includes('W'),
  }
}

export function buildGhsDisplay(atomicNumber: number, locale: Locale): GhsDisplayItem[] {
  const pictograms = getElementGhsPictograms(atomicNumber)
  if (!pictograms.length) return []

  const labels = localeMessages[locale].ghs
  return pictograms.map((id) => ({
    id,
    label: labels[id],
  }))
}
