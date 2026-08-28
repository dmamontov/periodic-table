import { describe, expect, it, vi } from 'vitest';
import type { StoredElementDetail } from '../../../src/types/element/detail';

const DETAILS: Record<string, StoredElementDetail> = {
  Fe: {
    overview: { englishName: 'Iron' },
    isotopes: { decay: 'beta-minus', isotopes: [] },
    ghs: ['flammable'],
    productionCountries: [{ country: 'cn' }],
    radiacodeIsotope: { slug: 'fe-59' },
  } as unknown as StoredElementDetail,
  He: {}, // present, but every optional field absent
};

vi.mock('../../../src/data', () => ({
  storedElementDetails: DETAILS,
}));

vi.mock('../../../src/utils/element/lookup', () => ({
  getSymbolByNumber: (number: number) => (number === 26 ? 'Fe' : number === 2 ? 'He' : number === 999 ? 'Xx' : null),
}));

const {
  getElementDetail,
  getElementDecayMode,
  getElementGhsPictograms,
  getElementProductionCountries,
  getElementRadiacodeIsotope,
} = await import('../../../src/utils/element/detail');

describe('getElementDetail', () => {
  it('returns null when the number has no matching symbol', () => {
    expect(getElementDetail(-1)).toBeNull();
  });

  it('returns null when the symbol has no stored detail record', () => {
    expect(getElementDetail(999)).toBeNull();
  });

  it('merges the raw record with number/symbol/name when englishName is present', () => {
    expect(getElementDetail(26)).toEqual({ ...DETAILS.Fe, number: 26, symbol: 'Fe', name: 'Iron' });
  });

  it('falls back to an empty name when overview.englishName is absent', () => {
    expect(getElementDetail(2)).toEqual({ ...DETAILS.He, number: 2, symbol: 'He', name: '' });
  });
});

describe('getElementDecayMode', () => {
  it('returns undefined when the number has no matching symbol', () => {
    expect(getElementDecayMode(-1)).toBeUndefined();
  });

  it('returns undefined when the record has no isotopes.decay', () => {
    expect(getElementDecayMode(2)).toBeUndefined();
  });

  it('returns the decay mode when present', () => {
    expect(getElementDecayMode(26)).toBe('beta-minus');
  });
});

describe('getElementGhsPictograms', () => {
  it('returns an empty array when the number has no matching symbol', () => {
    expect(getElementGhsPictograms(-1)).toEqual([]);
  });

  it('returns an empty array when the record has no ghs field', () => {
    expect(getElementGhsPictograms(2)).toEqual([]);
  });

  it('returns the pictogram ids when present', () => {
    expect(getElementGhsPictograms(26)).toEqual(['flammable']);
  });
});

describe('getElementProductionCountries', () => {
  it('returns an empty array when the number has no matching symbol', () => {
    expect(getElementProductionCountries(-1)).toEqual([]);
  });

  it('returns an empty array when the record has no productionCountries field', () => {
    expect(getElementProductionCountries(2)).toEqual([]);
  });

  it('returns the country entries when present', () => {
    expect(getElementProductionCountries(26)).toEqual([{ country: 'cn' }]);
  });
});

describe('getElementRadiacodeIsotope', () => {
  it('returns null when the number has no matching symbol', () => {
    expect(getElementRadiacodeIsotope(-1)).toBeNull();
  });

  it('returns null when the record has no radiacodeIsotope field', () => {
    expect(getElementRadiacodeIsotope(2)).toBeNull();
  });

  it('returns the isotope ref when present', () => {
    expect(getElementRadiacodeIsotope(26)).toEqual({ slug: 'fe-59' });
  });
});
