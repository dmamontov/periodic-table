import type { Locale } from '../../locales/types'
import { localeMessages } from '../../locales'
import { getElementGhsPictograms } from '../../data'
import type { GhsDisplayItem } from '../../types/element/ghs'

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
