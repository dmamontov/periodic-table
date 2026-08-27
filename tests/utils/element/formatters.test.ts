import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  buildGhsDisplay,
  buildNfpaDisplay,
  formatElementSymbol,
  formatIonChargeHtml,
} from '../../../src/utils/element/formatters';
import { getElementGhsPictograms } from '../../../src/data';
import { localeMessages } from '../../../src/locales';

afterEach(() => {
  vi.restoreAllMocks();
});

describe('formatElementSymbol', () => {
  it('returns single-character symbols unchanged', () => {
    expect(formatElementSymbol('H')).toBe('H');
  });

  it('returns the input unchanged when index 0 is missing despite length >= 2 (noUncheckedIndexedAccess guard)', () => {
    const fakeSymbol = {
      length: 2,
      1: 'e',
      toUpperCase: () => 'FAKE',
      slice: () => 'ake',
    } as unknown as string;
    expect(formatElementSymbol(fakeSymbol)).toBe(fakeSymbol);
  });

  it('returns an empty string unchanged', () => {
    expect(formatElementSymbol('')).toBe('');
  });

  it('title-cases a two-letter symbol regardless of input casing', () => {
    expect(formatElementSymbol('he')).toBe('He');
    expect(formatElementSymbol('HE')).toBe('He');
    expect(formatElementSymbol('He')).toBe('He');
  });
});

describe('formatIonChargeHtml', () => {
  it('returns a placeholder when charge is missing', () => {
    expect(formatIonChargeHtml('Na', null)).toBe('----');
    expect(formatIonChargeHtml('Na', undefined)).toBe('----');
    expect(formatIonChargeHtml('Na', '')).toBe('----');
  });

  it('renders the charge as a superscript', () => {
    expect(formatIonChargeHtml('Na', '+1')).toBe('Na<sup>+1</sup>');
  });
});

describe('buildNfpaDisplay', () => {
  it('returns null for a missing raw value', () => {
    expect(buildNfpaDisplay(null, 'ru')).toBeNull();
    expect(buildNfpaDisplay(undefined, 'ru')).toBeNull();
    expect(buildNfpaDisplay('', 'ru')).toBeNull();
  });

  it('returns null when fewer than 4 comma-separated parts are given', () => {
    expect(buildNfpaDisplay('1,2,3', 'ru')).toBeNull();
  });

  it('builds red/blue/yellow scores and labels from numeric codes', () => {
    const display = buildNfpaDisplay('2,3,0,-', 'ru');
    expect(display).not.toBeNull();
    expect(display!.red).toBe('2');
    expect(display!.blue).toBe('3');
    expect(display!.yellow).toBe('0');
    expect(display!.redLabel).toBe(localeMessages.ru.nfpa.nfpa1.item2);
    expect(display!.blueLabel).toBe(localeMessages.ru.nfpa.nfpa2.item3);
    expect(display!.yellowLabel).toBe(localeMessages.ru.nfpa.nfpa3.item0);
  });

  it('treats "-" and non-numeric codes as blank scores with placeholder labels', () => {
    const display = buildNfpaDisplay('-,x,-,-', 'ru');
    expect(display).not.toBeNull();
    expect(display!.red).toBe('');
    expect(display!.blue).toBe('');
    expect(display!.redLabel).toBe('----');
    expect(display!.blueLabel).toBe('----');
  });

  it('falls back to a placeholder label for a numeric code with no matching nfpa entry', () => {
    const display = buildNfpaDisplay('9,0,0,-', 'ru');
    expect(display).not.toBeNull();
    expect(display!.red).toBe('9');
    expect(display!.redLabel).toBe('----');
  });

  it('renders a blank white field for "-"', () => {
    const display = buildNfpaDisplay('0,0,0,-', 'ru');
    expect(display).not.toBeNull();
    expect(display!.white).toBe('');
    expect(display!.whiteDiamond).toBe('');
    expect(display!.whiteDiamondParts).toEqual([]);
    expect(display!.whiteLabel).toBe('----');
    expect(display!.whiteStrike).toBe(false);
  });

  it('resolves special white-diamond codes (W/OX/SA/RAD) to their nfpa4 labels', () => {
    const w = buildNfpaDisplay('0,0,0,W', 'ru');
    expect(w!.whiteLabel).toBe(localeMessages.ru.nfpa.nfpa4.item0);
    expect(w!.whiteStrike).toBe(true);

    const ox = buildNfpaDisplay('0,0,0,OX', 'ru');
    expect(ox!.whiteLabel).toBe(localeMessages.ru.nfpa.nfpa4.item1);

    const sa = buildNfpaDisplay('0,0,0,SA', 'ru');
    expect(sa!.whiteLabel).toBe(localeMessages.ru.nfpa.nfpa4.item2);
    expect(sa!.whiteDiamondParts).toEqual([{ type: 'text', value: 'SA' }]);

    const rad = buildNfpaDisplay('0,0,0,RAD', 'ru');
    expect(rad!.whiteLabel).toBe(localeMessages.ru.nfpa.nfpa4.item3);
    expect(rad!.whiteDiamondParts).toEqual([{ type: 'rad', value: '' }]);
    expect(rad!.whiteDiamond).toBe('');
  });

  it('combines multiple "+"-joined white-diamond codes', () => {
    const display = buildNfpaDisplay('0,0,0,W+OX', 'ru');
    expect(display!.whiteLabel).toBe(`${localeMessages.ru.nfpa.nfpa4.item0}; ${localeMessages.ru.nfpa.nfpa4.item1}`);
    expect(display!.whiteStrike).toBe(true);
  });

  it('falls back to the raw code for an unrecognized white-diamond code', () => {
    const display = buildNfpaDisplay('0,0,0,ZZ', 'ru');
    expect(display!.whiteDiamond).toBe('ZZ');
    expect(display!.whiteDiamondParts).toEqual([{ type: 'text', value: 'ZZ' }]);
    expect(display!.whiteLabel).toBe('ZZ');
  });

  it('treats a white value with no non-empty codes after splitting as a placeholder', () => {
    const display = buildNfpaDisplay('0,0,0,+', 'ru');
    expect(display!.whiteLabel).toBe('----');
  });

  it('falls back to the raw code when the internal category:index pair is malformed (noUncheckedIndexedAccess guard)', () => {
    // eslint-disable-next-line @typescript-eslint/unbound-method -- always invoked via .call(this, ...) below
    const originalSplit = String.prototype.split as (separator: string, limit?: number) => string[];
    vi.spyOn(String.prototype, 'split').mockImplementation(function (this: string, separator?: string, limit?: number) {
      if (this === 'nfpa4:0' && separator === ':') return ['nfpa4'];
      return originalSplit.call(this, separator!, limit);
    } as unknown as typeof String.prototype.split);

    const display = buildNfpaDisplay('0,0,0,W', 'ru');
    expect(display!.whiteLabel).toBe('W');
  });

  it('treats a raw value with 4+ parts but a missing color as invalid (noUncheckedIndexedAccess guard)', () => {
    const originalMap = Array.prototype.map;
    vi.spyOn(Array.prototype, 'map').mockImplementation(function <T, U>(
      this: T[],
      ...args: Parameters<typeof originalMap>
    ) {
      const result = originalMap.apply(this, args) as U[];
      if (this.length === 4 && this[0] === 'MARK1') result[3] = undefined as unknown as U;
      return result;
    });

    expect(buildNfpaDisplay('MARK1,2,3,4', 'ru')).toBeNull();
  });
});

describe('buildGhsDisplay', () => {
  it('returns an empty array for an atomic number with no pictograms', () => {
    let number = 0;
    for (let n = 1; n <= 118; n++) {
      if (getElementGhsPictograms(n).length === 0) {
        number = n;
        break;
      }
    }
    expect(number).toBeGreaterThan(0);
    expect(buildGhsDisplay(number, 'ru')).toEqual([]);
  });

  it('maps each pictogram id to its localized label', () => {
    let number = 0;
    for (let n = 1; n <= 118; n++) {
      if (getElementGhsPictograms(n).length > 0) {
        number = n;
        break;
      }
    }
    expect(number).toBeGreaterThan(0);

    const display = buildGhsDisplay(number, 'ru');
    const pictograms = getElementGhsPictograms(number);
    expect(display).toEqual(pictograms.map((id) => ({ id, label: localeMessages.ru.ghs[id] })));
  });
});
