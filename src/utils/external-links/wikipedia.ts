import type { Locale } from '../../locales/types'
import type { ElementDetail } from '../../types/element/detail'
import { localeMessages } from '../../locales'
import { getSymbolByNumber } from '../../data'

const WIKI_HOST: Record<Locale, string> = {
  ru: 'ru.wikipedia.org',
  en: 'en.wikipedia.org',
  zh: 'zh.wikipedia.org',
}

/** First non-empty string, e.g. a fetched name over a blank field before falling back to a lookup table. */
function firstNonEmpty(...values: (string | null | undefined)[]): string {
  for (const value of values) {
    if (value) return value
  }
  return ''
}

function wikiTitle(number: number, locale: Locale, detail: ElementDetail | null): string {
  const symbol = detail?.symbol ?? getSymbolByNumber(number)
  if (locale === 'en') {
    return firstNonEmpty(detail?.overview?.englishName, symbol && localeMessages.en.elements[symbol])
  }
  return (symbol && localeMessages[locale].elements[symbol]) ?? ''
}

export function getWikipediaUrl(
  number: number,
  locale: Locale,
  detail: ElementDetail | null,
): string {
  const title = wikiTitle(number, locale, detail).trim().replace(/ /g, '_')
  return `https://${WIKI_HOST[locale]}/wiki/${encodeURIComponent(title)}`
}
