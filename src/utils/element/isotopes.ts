import type { Locale } from '../../locales/types';
import { localeMessages } from '../../locales';
import { getElementDecayMode, storedElementDetails } from '../../data';
import type { ElementCollectionDecayParent } from '../../types/collection/collection';
import { formatElementSymbol } from './formatters';

/** HTML isotope notation with mass superscript before symbol. */
export function formatIsotopeHtml(symbol: string, mass: string | number | null | undefined): string {
  if (mass === null || mass === undefined || mass === '') return '';
  const sym = formatElementSymbol(symbol);
  return `<sup class="collection-isotope-mass">${String(mass)}</sup>${sym}`;
}

export function formatMainIsotopesHtml(symbol: string): string {
  const record = storedElementDetails[symbol]?.isotopes;
  if (!record?.isotopes?.length) return '';

  return record.isotopes
    .map(({ mass, abundance }) => {
      const iso = formatIsotopeHtml(symbol, mass);
      return abundance ? `${iso} (${abundance}%)` : iso;
    })
    .join(', ');
}

/** Decay chain notation, e.g. "²¹⁰Pb → ²¹⁰Bi → ²¹⁰Po" — empty string if there's no chain. */
export function formatDecayChainHtml(
  currentSymbol: string,
  currentIsotope: string | null | undefined,
  parents: ElementCollectionDecayParent[] | null | undefined,
): string {
  if (!parents?.length) return '';
  const chain = parents.filter((p) => p.symbol && p.isotope);
  if (!chain.length) return '';
  const labels = chain.map((p) => formatIsotopeHtml(p.symbol, p.isotope));
  labels.push(formatIsotopeHtml(currentSymbol, currentIsotope));
  return labels.join(' → ');
}

/** Decay chain when there's one, otherwise the bare current isotope. */
export function formatSpectrumOriginHtml(
  symbol: string,
  isotope: string | null | undefined,
  decayParent: ElementCollectionDecayParent[] | null | undefined,
): string {
  return formatDecayChainHtml(symbol, isotope, decayParent) || formatIsotopeHtml(symbol, isotope);
}

export function formatDecayType(number: number, locale: Locale): string {
  const key = getElementDecayMode(number);
  if (!key) return '';
  return localeMessages[locale].decay[key] ?? localeMessages.ru.decay[key] ?? '';
}
