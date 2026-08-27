import { describe, expect, it } from 'vitest';
import { getPubChemUrl, parsePubChemCid } from '../../../src/utils/external-links/pubchem';

describe('parsePubChemCid', () => {
  it('extracts the numeric id from a prefixed CID string', () => {
    expect(parsePubChemCid('CID783')).toBe(783);
  });

  it('extracts a bare numeric string', () => {
    expect(parsePubChemCid('23994')).toBe(23994);
  });

  it('returns null for null/undefined/empty input', () => {
    expect(parsePubChemCid(null)).toBeNull();
    expect(parsePubChemCid(undefined)).toBeNull();
    expect(parsePubChemCid('')).toBeNull();
  });

  it('returns null when there is no digit in the string', () => {
    expect(parsePubChemCid('none')).toBeNull();
  });

  it('returns null for a zero id', () => {
    expect(parsePubChemCid('CID0')).toBeNull();
  });
});

describe('getPubChemUrl', () => {
  it('builds the compound URL from a raw CID', () => {
    expect(getPubChemUrl('CID783')).toBe('https://pubchem.ncbi.nlm.nih.gov/compound/783');
  });

  it('returns null when the CID cannot be parsed', () => {
    expect(getPubChemUrl(null)).toBeNull();
    expect(getPubChemUrl('none')).toBeNull();
  });
});
