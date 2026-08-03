import type { Locale } from '../locales/types'
import { decayLabels, type DecayModeKey } from '../locales/partials/decay'
import detailsFile from '../data/details.json'
import { formatElementSymbol } from './elementFormatters'

export interface ElementIsotopeEntry {
  mass: number
  abundance?: string | null
}

export interface ElementIsotopeRecord {
  decay: DecayModeKey
  isotopes: ElementIsotopeEntry[]
}

const isotopeData = detailsFile.isotopes as Record<string, ElementIsotopeRecord>

const ISOTOPE_MASS_SUPERSCRIPT: Record<string, string> = {
  '0': '⁰',
  '1': '¹',
  '2': '²',
  '3': '³',
  '4': '⁴',
  '5': '⁵',
  '6': '⁶',
  '7': '⁷',
  '8': '⁸',
  '9': '⁹',
  m: 'ᵐ',
}

/** Mass number / metastable marker as Unicode superscript (e.g. 210 → ²¹⁰, 99m → ⁹⁹ᵐ). */
export function toIsotopeMassSuperscript(mass: string | number): string {
  return String(mass).replace(/[0-9m]/g, (ch) => ISOTOPE_MASS_SUPERSCRIPT[ch] ?? ch)
}

/** Plain isotope notation: ²¹⁰Bi */
export function formatIsotopeNotation(symbol: string, mass: string | number): string {
  return `${toIsotopeMassSuperscript(mass)}${formatElementSymbol(symbol)}`
}

/** HTML isotope notation with mass superscript before symbol. */
export function formatIsotopeHtml(
  symbol: string,
  mass: string | number | null | undefined,
): string {
  if (mass === null || mass === undefined || mass === '') return ''
  const sym = formatElementSymbol(symbol)
  return `<sup class="collection-isotope-mass">${String(mass)}</sup>${sym}`
}

export function formatMainIsotopesHtml(symbol: string, number: number): string {
  const record = isotopeData[String(number)]
  if (!record?.isotopes?.length) return ''

  return record.isotopes
    .map(({ mass, abundance }) => {
      const iso = formatIsotopeHtml(symbol, mass)
      return abundance ? `${iso} (${abundance}%)` : iso
    })
    .join(', ')
}

export function formatDecayType(number: number, locale: Locale): string {
  const key = isotopeData[String(number)]?.decay
  if (!key) return ''
  return decayLabels[locale][key] ?? decayLabels.ru[key] ?? ''
}
