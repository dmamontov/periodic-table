import { afterEach, describe, expect, it } from 'vitest';
import {
  formatDecayChainHtml,
  formatDecayType,
  formatIsotopeHtml,
  formatMainIsotopesHtml,
} from '../../../src/utils/element/isotopes';
import { getSymbolByNumber, storedElementDetails } from '../../../src/data';
import { localeMessages } from '../../../src/locales';
import type { ElementCollectionDecayParent } from '../../../src/types/collection/collection';

function numberForSymbol(symbol: string): number {
  for (let n = 1; n <= 118; n++) {
    if (getSymbolByNumber(n) === symbol) return n;
  }
  throw new Error(`No atomic number found for symbol ${symbol}`);
}

describe('formatIsotopeHtml', () => {
  it('renders a mass superscript before the symbol', () => {
    expect(formatIsotopeHtml('Pb', 210)).toBe('<sup class="collection-isotope-mass">210</sup>Pb');
    expect(formatIsotopeHtml('Pb', '210')).toBe('<sup class="collection-isotope-mass">210</sup>Pb');
  });

  it('returns an empty string when mass is null, undefined, or an empty string', () => {
    expect(formatIsotopeHtml('Pb', null)).toBe('');
    expect(formatIsotopeHtml('Pb', undefined)).toBe('');
    expect(formatIsotopeHtml('Pb', '')).toBe('');
  });
});

describe('formatMainIsotopesHtml', () => {
  it('joins isotopes, appending abundance percentage when present', () => {
    const withAbundance = Object.entries(storedElementDetails).find(([, detail]) =>
      detail.isotopes?.isotopes.some((i) => i.abundance),
    );
    if (!withAbundance) throw new Error('No element with an abundance-bearing isotope found in test data');
    const [symbol, detail] = withAbundance;

    const html = formatMainIsotopesHtml(symbol);
    for (const { mass, abundance } of detail.isotopes!.isotopes) {
      const iso = formatIsotopeHtml(symbol, mass);
      expect(html).toContain(abundance ? `${iso} (${abundance}%)` : iso);
    }
  });

  it('omits the abundance suffix for an isotope with no abundance figure', () => {
    const withoutAbundance = Object.entries(storedElementDetails).find(([, detail]) =>
      detail.isotopes?.isotopes.some((i) => !i.abundance),
    );
    if (!withoutAbundance) throw new Error('No isotope without an abundance figure found in test data');
    const [symbol, detail] = withoutAbundance;

    const html = formatMainIsotopesHtml(symbol);
    const bare = detail.isotopes!.isotopes.find((i) => !i.abundance)!;
    expect(html).toContain(formatIsotopeHtml(symbol, bare.mass));
    expect(html).not.toContain(`${formatIsotopeHtml(symbol, bare.mass)} (`);
  });

  it('returns an empty string for a symbol with no isotope record', () => {
    expect(formatMainIsotopesHtml('NotASymbol')).toBe('');
  });
});

describe('formatDecayChainHtml', () => {
  it('returns an empty string when there are no parents', () => {
    expect(formatDecayChainHtml('Po', '210', null)).toBe('');
    expect(formatDecayChainHtml('Po', '210', undefined)).toBe('');
    expect(formatDecayChainHtml('Po', '210', [])).toBe('');
  });

  it('returns an empty string when every parent is missing a symbol or isotope', () => {
    const parents: ElementCollectionDecayParent[] = [{ symbol: '', isotope: '210' }];
    expect(formatDecayChainHtml('Po', '210', parents)).toBe('');
  });

  it('renders a chain from the most distant ancestor through to the current isotope', () => {
    const parents: ElementCollectionDecayParent[] = [
      { symbol: 'Pb', isotope: '210' },
      { symbol: 'Bi', isotope: '210' },
    ];
    const html = formatDecayChainHtml('Po', '210', parents);
    expect(html).toBe(
      `${formatIsotopeHtml('Pb', '210')} → ${formatIsotopeHtml('Bi', '210')} → ${formatIsotopeHtml('Po', '210')}`,
    );
  });

  it('filters out parents that are missing a symbol or isotope before joining', () => {
    const parents: ElementCollectionDecayParent[] = [
      { symbol: 'Pb', isotope: '210' },
      { symbol: '', isotope: '' },
    ];
    const html = formatDecayChainHtml('Po', '210', parents);
    expect(html).toBe(`${formatIsotopeHtml('Pb', '210')} → ${formatIsotopeHtml('Po', '210')}`);
  });
});

describe('formatDecayType', () => {
  it('returns the localized decay label for a real element', () => {
    const entry = Object.entries(storedElementDetails).find(([, detail]) => detail.isotopes?.decay);
    if (!entry) throw new Error('No element with a decay mode found in test data');
    const [symbol, detail] = entry;
    const number = numberForSymbol(symbol);
    const key = detail.isotopes!.decay;

    expect(formatDecayType(number, 'ru')).toBe(localeMessages.ru.decay[key]);
  });

  it('returns an empty string when the atomic number has no corresponding symbol', () => {
    expect(formatDecayType(999, 'ru')).toBe('');
  });

  describe('locale fallback', () => {
    const entry = Object.entries(storedElementDetails).find(([, detail]) => detail.isotopes?.decay);
    if (!entry) throw new Error('No element with a decay mode found in test data');
    const [symbol, detail] = entry;
    const key = detail.isotopes!.decay;
    const originalEnLabel = localeMessages.en.decay[key];
    const originalRuLabel = localeMessages.ru.decay[key];

    afterEach(() => {
      localeMessages.en.decay[key] = originalEnLabel;
      localeMessages.ru.decay[key] = originalRuLabel;
    });

    it('falls back to the ru label when the requested locale is missing the decay key', () => {
      delete localeMessages.en.decay[key];

      const number = numberForSymbol(symbol);
      expect(formatDecayType(number, 'en')).toBe(localeMessages.ru.decay[key]);
    });

    it('returns an empty string when both the requested locale and ru are missing the decay key', () => {
      delete localeMessages.en.decay[key];
      delete localeMessages.ru.decay[key];

      const number = numberForSymbol(symbol);
      expect(formatDecayType(number, 'en')).toBe('');
    });
  });
});
