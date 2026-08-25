import type { Locale } from '../../locales/types';
import type { ElementDetail } from '../../types/element/detail';
import { localeMessages } from '../../locales';
import { getSymbolByNumber, storedElementDetails } from '../../data';

/** First non-empty string, e.g. a fetched name over a blank field before falling back to a lookup table. */
function firstNonEmpty(...values: (string | null | undefined)[]): string {
  for (const value of values) {
    if (value) return value;
  }
  return '';
}

function youtubeSearch(query: string): string {
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
}

function searchQuery(number: number, locale: Locale, detail: ElementDetail | null): string {
  const symbol = detail?.symbol ?? getSymbolByNumber(number);
  if (locale === 'ru') {
    return (symbol && localeMessages.ru.elements[symbol]) ?? '';
  }
  if (locale === 'zh') {
    const name = (symbol && localeMessages.zh.elements[symbol]) ?? '';
    return `${name} 元素 周期表`;
  }
  const name = firstNonEmpty(detail?.overview?.englishName, symbol && localeMessages.en.elements[symbol]);
  return `${name} periodic table`;
}

/** RU prefers a direct thoisoi.ru link when available; EN/ZH always fall back to a YouTube search. */
export function getYouTubeUrl(number: number, locale: Locale, detail: ElementDetail | null): string {
  if (locale === 'ru') {
    const symbol = detail?.symbol ?? getSymbolByNumber(number);
    const direct = symbol ? storedElementDetails[symbol]?.youtube?.trim() : undefined;
    if (direct) return direct;
  }
  return youtubeSearch(searchQuery(number, locale, detail));
}
