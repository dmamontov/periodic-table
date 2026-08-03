import type { Locale } from '../locales/types'
import type { ElementDetail } from '../types/elementDetail'
import ru from '../locales/lang/ru'
import en from '../locales/lang/en'
import zh from '../locales/lang/zh'
import thoisoiLinks from '../data/thoisoi-youtube.json'

const localeMessages = { ru, en, zh }

const thoisoiVideos = thoisoiLinks as Record<string, string>

function youtubeSearch(query: string): string {
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`
}

function searchQuery(number: number, locale: Locale, detail: ElementDetail | null): string {
  if (locale === 'ru') {
    return localeMessages.ru.elements[String(number)] ?? ''
  }
  if (locale === 'zh') {
    const name = localeMessages.zh.elements[String(number)] ?? ''
    return `${name} 元素 周期表`
  }
  const name =
    detail?.OverviewCommon?.englishName ??
    detail?.name ??
    localeMessages.en.elements[String(number)] ??
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
    const direct = thoisoiVideos[String(number)]?.trim()
    if (direct) return direct
  }
  return youtubeSearch(searchQuery(number, locale, detail))
}
