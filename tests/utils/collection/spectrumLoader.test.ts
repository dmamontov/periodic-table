import { describe, expect, it } from 'vitest';
import {
  getAllCollectionSpectrumIds,
  getCollectionSpectrum,
  getCollectionSpectrumXmlHref,
} from '../../../src/utils/collection/spectrumLoader';

// 'bg-lead-shield' is a real file under src/data/spectra/ - used as a "known id" so the resolved
// branches exercise a real lazy dynamic import rather than needing to mock import.meta.glob itself.
const KNOWN_ID = 'bg-lead-shield';

describe('getCollectionSpectrum', () => {
  it('returns null for a nullish id', async () => {
    expect(await getCollectionSpectrum(null)).toBeNull();
    expect(await getCollectionSpectrum(undefined)).toBeNull();
  });

  it('returns null for an unknown id', async () => {
    expect(await getCollectionSpectrum('not-a-real-id')).toBeNull();
  });

  it('resolves the real spectrum data for a known id', async () => {
    const data = await getCollectionSpectrum(KNOWN_ID);
    expect(data?.id).toBe(KNOWN_ID);
  });
});

describe('getAllCollectionSpectrumIds', () => {
  it('includes every known spectrum id', () => {
    const ids = getAllCollectionSpectrumIds();
    expect(ids).toContain(KNOWN_ID);
    expect(ids.length).toBeGreaterThan(0);
  });
});

describe('getCollectionSpectrumXmlHref', () => {
  it('returns null for a nullish id', () => {
    expect(getCollectionSpectrumXmlHref(null)).toBeNull();
  });

  it('returns null for an unknown id', () => {
    expect(getCollectionSpectrumXmlHref('not-a-real-id')).toBeNull();
  });

  it('builds the download href for a known id', () => {
    expect(getCollectionSpectrumXmlHref(KNOWN_ID)).toBe(`/collection-spectra/${KNOWN_ID}.xml`);
  });
});
