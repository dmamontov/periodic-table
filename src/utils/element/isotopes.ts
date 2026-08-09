import type { Locale, DecayModeKey } from '../../locales/types'
import { localeMessages } from '../../locales'
import detailsFile from '../../data/elements/details.json'
import { getSymbolByNumber } from '../../data'
import { formatElementSymbol } from './formatters'
import type { ElementCollectionDecayParent } from '../../types/collection/collection'

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

/** Decay chain notation, e.g. "²¹⁰Pb → ²¹⁰Bi → ²¹⁰Po" — empty string if there's no chain. */
export function formatDecayChainHtml(
  currentSymbol: string,
  currentIsotope: string | null | undefined,
  parents: ElementCollectionDecayParent[] | null | undefined,
): string {
  if (!parents?.length) return ''
  const chain = parents.filter((p) => p.symbol && p.isotope)
  if (!chain.length) return ''
  const labels = chain.map((p) => formatIsotopeHtml(p.symbol, p.isotope))
  labels.push(formatIsotopeHtml(currentSymbol, currentIsotope))
  return labels.join(' → ')
}

export function formatDecayType(number: number, locale: Locale): string {
  const symbol = getSymbolByNumber(number)
  const key = symbol ? isotopeData[symbol]?.decay : undefined
  if (!key) return ''
  return localeMessages[locale].decay[key] ?? localeMessages.ru.decay[key] ?? ''
}
