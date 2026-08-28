import { describe, expect, it, vi } from 'vitest';
import type { Element } from '../../../src/types/element/element';

const H: Element = {
  number: 1,
  symbol: 'H',
  mass: '1.008',
  group: 1,
  oldGroup: 'IA',
  row: 1,
  col: 1,
  periodEnd: false,
  color: '#00ccff',
  category: 'nonmetal',
  inCollection: false,
};

const FE: Element = { ...H, number: 26, symbol: 'Fe', row: 4, col: 8, category: 'transition' };

vi.mock('../../../src/data', () => ({
  elements: [H, FE],
}));

const {
  getElementRouteSymbol,
  getElementBySymbol,
  getSymbolByNumber,
  isElementRadioactive,
  isElementWeaklyRadioactive,
} = await import('../../../src/utils/element/lookup');

describe('getElementRouteSymbol', () => {
  it('lowercases the symbol', () => {
    expect(getElementRouteSymbol('Fe')).toBe('fe');
  });
});

describe('getElementBySymbol', () => {
  it('finds an element case-insensitively', () => {
    expect(getElementBySymbol('fe')).toEqual(FE);
    expect(getElementBySymbol('H')).toEqual(H);
  });

  it('returns null for an unknown symbol', () => {
    expect(getElementBySymbol('Xx')).toBeNull();
  });
});

describe('getSymbolByNumber', () => {
  it('finds the symbol for a known atomic number', () => {
    expect(getSymbolByNumber(26)).toBe('Fe');
  });

  it('returns null for an unknown atomic number', () => {
    expect(getSymbolByNumber(999)).toBeNull();
  });
});

describe('isElementWeaklyRadioactive', () => {
  it('is true for the fixed weakly-radioactive numbers (Re, Pt, Bi)', () => {
    expect(isElementWeaklyRadioactive(75)).toBe(true);
    expect(isElementWeaklyRadioactive(78)).toBe(true);
    expect(isElementWeaklyRadioactive(83)).toBe(true);
  });

  it('is false for any other number', () => {
    expect(isElementWeaklyRadioactive(26)).toBe(false);
  });
});

describe('isElementRadioactive', () => {
  it('is true for Tc/Pm and every element from 84 to 118', () => {
    expect(isElementRadioactive(43)).toBe(true);
    expect(isElementRadioactive(61)).toBe(true);
    expect(isElementRadioactive(84)).toBe(true);
    expect(isElementRadioactive(118)).toBe(true);
  });

  it('is true for the weakly-radioactive numbers too', () => {
    expect(isElementRadioactive(75)).toBe(true);
  });

  it('is false for a stable element', () => {
    expect(isElementRadioactive(26)).toBe(false);
  });
});
