import { describe, expect, it } from 'vitest';
import { getWikipediaUrl } from '../../../src/utils/external-links/wikipedia';
import { localeMessages } from '../../../src/locales';
import type { ElementDetail } from '../../../src/types/element/detail';

const HYDROGEN = 1;

describe('getWikipediaUrl', () => {
  it('links to the ru host using the ru element name', () => {
    const url = getWikipediaUrl(HYDROGEN, 'ru', null);
    expect(url).toBe(`https://ru.wikipedia.org/wiki/${encodeURIComponent(localeMessages.ru.elements.H!)}`);
  });

  it('links to the zh host using the zh element name', () => {
    const url = getWikipediaUrl(HYDROGEN, 'zh', null);
    expect(url).toBe(`https://zh.wikipedia.org/wiki/${encodeURIComponent(localeMessages.zh.elements.H!)}`);
  });

  it('prefers the detail englishName for en, replacing spaces with underscores', () => {
    const detail: ElementDetail = {
      number: HYDROGEN,
      symbol: 'H',
      name: 'Hydrogen',
      overview: { englishName: 'Some Custom Name' },
    };
    const url = getWikipediaUrl(HYDROGEN, 'en', detail);
    expect(url).toBe('https://en.wikipedia.org/wiki/Some_Custom_Name');
  });

  it('falls back to the en locale table when detail has no englishName', () => {
    const url = getWikipediaUrl(HYDROGEN, 'en', null);
    expect(url).toBe(`https://en.wikipedia.org/wiki/${encodeURIComponent(localeMessages.en.elements.H!)}`);
  });

  it('resolves to an empty title when neither detail nor a symbol lookup produce a name', () => {
    const url = getWikipediaUrl(999, 'en', null);
    expect(url).toBe('https://en.wikipedia.org/wiki/');
  });

  it('resolves to an empty title for ru/zh when the atomic number has no symbol', () => {
    expect(getWikipediaUrl(999, 'ru', null)).toBe('https://ru.wikipedia.org/wiki/');
    expect(getWikipediaUrl(999, 'zh', null)).toBe('https://zh.wikipedia.org/wiki/');
  });
});
