import type { Locale } from '../locales/types'
import type { ElementDetail } from '../types/elementDetail'
import ru from '../locales/lang/ru'
import en from '../locales/lang/en'
import zh from '../locales/lang/zh'
import detailsFile from '../data/details.json'
import { getSymbolByNumber } from '../data'

const localeMessages = { ru, en, zh }

const thoisoiVideos = detailsFile.youtube as Record<string, string>

function youtubeSearch(query: string): string {
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`
}

function searchQuery(number: number, locale: Locale, detail: ElementDetail | null): string {
  const symbol = detail?.symbol ?? getSymbolByNumber(number)
  if (locale === 'ru') {
    return (symbol && localeMessages.ru.elements[symbol]) ?? ''
  }
  if (locale === 'zh') {
    const name = (symbol && localeMessages.zh.elements[symbol]) ?? ''
    return `${name} 元素 周期表`
  }
  const name =
    detail?.OverviewCommon?.englishName ??
    detail?.name ??
    (symbol && localeMessages.en.elements[symbol]) ??
    ''
  return `${name} periodic table`
}

/**
 * YouTube: for RU, a direct link from thoisoi.ru when available, otherwise a search.
 * For EN/ZH it's always a YouTube search.
 */
export function getYouTubeUrl(
  number: number,
  locale: Locale,
  detail: ElementDetail | null,
): string {
  if (locale === 'ru') {
    const symbol = detail?.symbol ?? getSymbolByNumber(number)
    const direct = symbol ? thoisoiVideos[symbol]?.trim() : undefined
    if (direct) return direct
  }
  return youtubeSearch(searchQuery(number, locale, detail))
}
