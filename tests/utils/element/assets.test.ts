import { describe, expect, it, vi } from 'vitest';
import type { StoredElementDetail } from '../../../src/types/element/detail';

// Fe (26) and H (1) are real assets checked into src/assets/ - used here (with fully synthetic
// storedElementDetails/getSymbolByNumber) so the "resolved" branches exercise a real glob-loaded URL
// without depending on any of this project's actual element data.
const DETAILS: Record<string, StoredElementDetail> = {
  Fe: { overview: { hasImage: true, hasSpectre: true } },
  He: { overview: { hasImage: false } },
  // hasImage/hasSpectre true, but no 9999.jpg/9999.webp file actually exists - exercises the "not
  // in the glob-loaded map" fallback branch, distinct from the "hasImage/hasSpectre is false" one.
  Zz: { overview: { hasImage: true, hasSpectre: true } },
};

vi.mock('../../../src/data', () => ({
  storedElementDetails: DETAILS,
}));

vi.mock('../../../src/utils/element/lookup', () => ({
  getSymbolByNumber: (number: number) => (number === 26 ? 'Fe' : number === 2 ? 'He' : number === 9999 ? 'Zz' : null),
}));

const {
  hasElementImage,
  getElementImageUrl,
  hasElementSpectrum,
  getElementSpectrumUrl,
  parseGridStructureNum,
  getPrimaryGridStructureNum,
  getGridStructureImageUrlByNum,
  getGridStructureImageUrl,
} = await import('../../../src/utils/element/assets');

describe('hasElementImage / getElementImageUrl', () => {
  it('is false, and resolves no url, when the number has no matching symbol', () => {
    expect(hasElementImage(-1)).toBe(false);
    expect(getElementImageUrl(-1)).toBeNull();
  });

  it('is false, and resolves no url, when overview.hasImage is not true', () => {
    expect(hasElementImage(2)).toBe(false);
    expect(getElementImageUrl(2)).toBeNull();
  });

  it('is true and resolves the real glob-loaded url when overview.hasImage is true', () => {
    expect(hasElementImage(26)).toBe(true);
    expect(getElementImageUrl(26)).toEqual(expect.stringContaining('.jpg'));
  });

  it('is true but resolves no url when hasImage is true yet no matching file was loaded', () => {
    expect(hasElementImage(9999)).toBe(true);
    expect(getElementImageUrl(9999)).toBeNull();
  });
});

describe('hasElementSpectrum / getElementSpectrumUrl', () => {
  it('is false, and resolves no url, when the number has no matching symbol', () => {
    expect(hasElementSpectrum(-1)).toBe(false);
    expect(getElementSpectrumUrl(-1)).toBeNull();
  });

  it('is false, and resolves no url, when overview.hasSpectre is not true', () => {
    expect(hasElementSpectrum(2)).toBe(false);
    expect(getElementSpectrumUrl(2)).toBeNull();
  });

  it('is true and resolves the real glob-loaded url when overview.hasSpectre is true', () => {
    expect(hasElementSpectrum(26)).toBe(true);
    expect(getElementSpectrumUrl(26)).toEqual(expect.stringContaining('.webp'));
  });

  it('is true but resolves no url when hasSpectre is true yet no matching file was loaded', () => {
    expect(hasElementSpectrum(9999)).toBe(true);
    expect(getElementSpectrumUrl(9999)).toBeNull();
  });
});

describe('parseGridStructureNum', () => {
  it('returns null for a nullish or empty value', () => {
    expect(parseGridStructureNum(null)).toBeNull();
    expect(parseGridStructureNum(undefined)).toBeNull();
  });

  it('returns null for a non-numeric string', () => {
    expect(parseGridStructureNum('abc')).toBeNull();
  });

  it('returns null for a number outside the 1-12 range', () => {
    expect(parseGridStructureNum('0')).toBeNull();
    expect(parseGridStructureNum('13')).toBeNull();
  });

  it('parses a valid in-range number, trimming whitespace', () => {
    expect(parseGridStructureNum(' 5 ')).toBe(5);
  });
});

describe('getPrimaryGridStructureNum', () => {
  it('returns null for a nullish structure code', () => {
    expect(getPrimaryGridStructureNum(null)).toBeNull();
  });

  it('parses the first "|"-separated part', () => {
    expect(getPrimaryGridStructureNum('5|3')).toBe(5);
  });

  it('returns null when the first part does not parse', () => {
    expect(getPrimaryGridStructureNum('abc|3')).toBeNull();
  });
});

describe('getGridStructureImageUrlByNum', () => {
  it('returns null for a nullish num', () => {
    expect(getGridStructureImageUrlByNum(null)).toBeNull();
    expect(getGridStructureImageUrlByNum(undefined)).toBeNull();
  });

  it('returns null when no image is registered for the num', () => {
    expect(getGridStructureImageUrlByNum(999)).toBeNull();
  });

  it('resolves the real glob-loaded url for a registered num', () => {
    expect(getGridStructureImageUrlByNum(5)).toEqual(expect.stringContaining('.gif'));
  });
});

describe('getGridStructureImageUrl', () => {
  it('resolves the primary structure number and looks up its url', () => {
    expect(getGridStructureImageUrl('5')).toEqual(expect.stringContaining('.gif'));
  });

  it('returns null when the structure code parses to nothing', () => {
    expect(getGridStructureImageUrl('abc')).toBeNull();
  });
});
