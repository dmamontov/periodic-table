import { describe, expect, it } from 'vitest';
import { getYouTubeUrl } from '../../../src/utils/external-links/youtube';
import { getSymbolByNumber, storedElementDetails } from '../../../src/data';
import { localeMessages } from '../../../src/locales';
import type { ElementDetail } from '../../../src/types/element/detail';

const HYDROGEN = 1;

describe('getYouTubeUrl', () => {
  it('returns the direct thoisoi.ru link for ru when the element has one', () => {
    const withDirectLink = Object.entries(storedElementDetails).find(([, detail]) => detail.youtube?.trim());
    if (!withDirectLink) throw new Error('No element with a direct youtube link found in test data');
    const [symbol, detail] = withDirectLink;

    let elementNumber = 0;
    for (let n = 1; n <= 118; n++) {
      if (getSymbolByNumber(n) === symbol) elementNumber = n;
    }
    expect(elementNumber).toBeGreaterThan(0);

    expect(getYouTubeUrl(elementNumber, 'ru', null)).toBe(detail.youtube!.trim());
  });

  it('falls back to a YouTube search for ru when the element has no direct link', () => {
    const withoutDirectLink = Object.entries(storedElementDetails).find(([, detail]) => !detail.youtube?.trim());
    if (!withoutDirectLink) throw new Error('Every element has a direct youtube link in test data');
    const [symbol] = withoutDirectLink;

    let elementNumber = 0;
    for (let n = 1; n <= 118; n++) {
      if (getSymbolByNumber(n) === symbol) elementNumber = n;
    }
    expect(elementNumber).toBeGreaterThan(0);

    const url = getYouTubeUrl(elementNumber, 'ru', null);
    expect(url.startsWith('https://www.youtube.com/results?search_query=')).toBe(true);
    expect(decodeURIComponent(url.split('search_query=')[1]!)).toBe(localeMessages.ru.elements[symbol]);
  });

  it('always searches for en, even if a direct ru link exists', () => {
    const detail: ElementDetail = {
      number: HYDROGEN,
      symbol: 'H',
      name: 'Hydrogen',
      overview: { englishName: 'Hydrogen' },
    };
    const url = getYouTubeUrl(HYDROGEN, 'en', detail);
    expect(url).toBe(`https://www.youtube.com/results?search_query=${encodeURIComponent('Hydrogen periodic table')}`);
  });

  it('builds a zh search query with the periodic-table suffix', () => {
    const url = getYouTubeUrl(HYDROGEN, 'zh', null);
    const expectedName = localeMessages.zh.elements.H;
    expect(decodeURIComponent(url.split('search_query=')[1]!)).toBe(`${expectedName} 元素 周期表`);
  });

  it('searches for an empty name when neither detail nor a symbol lookup produce one for en', () => {
    const url = getYouTubeUrl(999, 'en', null);
    expect(url).toBe(`https://www.youtube.com/results?search_query=${encodeURIComponent(' periodic table')}`);
  });

  it('searches with an empty name for ru when the atomic number has no symbol', () => {
    const url = getYouTubeUrl(999, 'ru', null);
    expect(url).toBe(`https://www.youtube.com/results?search_query=${encodeURIComponent('')}`);
  });

  it('searches with an empty name for zh when the atomic number has no symbol', () => {
    const url = getYouTubeUrl(999, 'zh', null);
    expect(url).toBe(`https://www.youtube.com/results?search_query=${encodeURIComponent(' 元素 周期表')}`);
  });
});
