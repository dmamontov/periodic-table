import type { Locale } from '../locales/types'
import type { ElementDetail } from '../types/elementDetail'
import ru from '../locales/lang/ru'
import en from '../locales/lang/en'
import zh from '../locales/lang/zh'

const localeMessages = { ru, en, zh }

const WIKI_HOST: Record<Locale, string> = {
  ru: 'ru.wikipedia.org',
  en: 'en.wikipedia.org',
  zh: 'zh.wikipedia.org',
}

function wikiTitle(number: number, locale: Locale, detail: ElementDetail | null): string {
  if (locale === 'en') {
    return detail?.OverviewCommon?.englishName ?? detail?.name ?? localeMessages.en.elements[String(number)] ?? ''
  }
  return localeMessages[locale].elements[String(number)] ?? ''
}

export function getWikipediaUrl(
  number: number,
  locale: Locale,
  detail: ElementDetail | null,
): string {
  const title = wikiTitle(number, locale, detail).trim().replace(/ /g, '_')
  return `https://${WIKI_HOST[locale]}/wiki/${encodeURIComponent(title.replace(/ /g, '_'))}`
}
