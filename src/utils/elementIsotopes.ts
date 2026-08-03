import type { Locale, DecayModeKey } from '../locales/types'
import { localeMessages } from '../locales'
import detailsFile from '../data/details.json'
import { getSymbolByNumber } from '../data'
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

/** HTML isotope notation with mass superscript before symbol. */
export function formatIsotopeHtml(
  symbol: string,
  mass: string | number | null | undefined,
): string {
  if (mass === null || mass === undefined || mass === '') return ''
  const sym = formatElementSymbol(symbol)
  return `<sup class="collection-isotope-mass">${String(mass)}</sup>${sym}`
}

export function formatMainIsotopesHtml(symbol: string): string {
  const record = isotopeData[symbol]
  if (!record?.isotopes?.length) return ''

  return record.isotopes
    .map(({ mass, abundance }) => {
      const iso = formatIsotopeHtml(symbol, mass)
      return abundance ? `${iso} (${abundance}%)` : iso
    })
    .join(', ')
}

export function formatDecayType(number: number, locale: Locale): string {
  const symbol = getSymbolByNumber(number)
  const key = symbol ? isotopeData[symbol]?.decay : undefined
  if (!key) return ''
  return localeMessages[locale].decay[key] ?? localeMessages.ru.decay[key] ?? ''
}
