import { describe, expect, it, vi } from 'vitest';
import type { Element } from '../../../src/types/element/element';
import type { StoredElementDetail } from '../../../src/types/element/detail';
import type { DecayModeKey } from '../../../src/locales/types';
import type * as DataModule from '../../../src/data';

function makeElement(number: number, symbol: string, mass: string): Element {
  return {
    number,
    symbol,
    mass,
    group: null,
    oldGroup: '',
    row: 1,
    col: 1,
    periodEnd: false,
    color: '#fff',
    category: 'nonmetal',
    inCollection: false,
  };
}

// number=1: symbol/getSymbolByNumber deliberately mismatched (getSymbolByNumber(1) -> null) to exercise
// getDecayModeScore's "no symbol" branch, while still carrying a fully-populated detail record so every
// other extractHeatmapValue switch case has a real value to extract.
const EL1 = makeElement(1, 'E1', '10.000');
// number=2: no entry in the mocked storedElementDetails at all (detail === null in buildDataset).
const EL2 = makeElement(2, 'E2', '20.000');
// number=3: detail present, decay mode not in DECAY_MODE_SCORE.
const EL3 = makeElement(3, 'E3', '30.000');
// number=4: detail present, halfLife/lifetime both "0/1" (parses to 0 seconds).
const EL4 = makeElement(4, 'E4', '40.000');
// number=5: detail present, no prevalence object at all.
const EL5 = makeElement(5, 'E5', '50.000');
// number=6: detail present, unparseable properties.atomicMass (falls back to RawElement.mass).
const EL6 = makeElement(6, 'E6', '60.000');
// number=7: no detail record, and an unparseable RawElement.mass too.
const EL7 = makeElement(7, 'E7', 'not-a-mass');

const MOCK_ELEMENTS: Element[] = [EL1, EL2, EL3, EL4, EL5, EL6, EL7];

const MOCK_DETAILS: Record<string, StoredElementDetail> = {
  E1: {
    reactivity: { electronegativity: '2.2' },
    atomic: { atomicRadius: '100', ionizationPotential: '10', covalentRadius: '90' },
    properties: { density: '1', meltingPoint: '10', boilingPoint: '20', atomicMass: '10.001' },
    nucleus: { halfLife: '1/1', lifetime: '1/1' },
    prevalence: { crust: '1', meteorites: '1', universe: '1', sun: '1', ocean: '1', humanBody: '1' },
    isotopes: { decay: 'stable', isotopes: [] },
  },
  E3: {
    isotopes: { decay: 'notARealMode' as unknown as DecayModeKey, isotopes: [] },
  },
  E4: {
    nucleus: { halfLife: '0/1', lifetime: '0/1' },
  },
  E5: {
    // no prevalence field
  },
  E6: {
    properties: {}, // no atomicMass
  },
};

vi.mock('../../../src/data', async (importOriginal) => {
  const actual = await importOriginal<typeof DataModule>();
  return {
    ...actual,
    elements: MOCK_ELEMENTS,
    storedElementDetails: MOCK_DETAILS,
    getSymbolByNumber: (number: number) => {
      if (number === 1) return null;
      return MOCK_ELEMENTS.find((e) => e.number === number)?.symbol ?? null;
    },
  };
});

describe('heatmap dataset construction with synthetic data', () => {
  it('treats a missing symbol lookup as no decay score', async () => {
    const { getHeatmapDataset } = await import('../../../src/utils/heatmap');
    expect(getHeatmapDataset('decayMode').values.get(1)).toBeNull();
  });

  it('treats a missing detail record as no data, except atomicMass (falls back to raw mass) and decayMode', async () => {
    const { getHeatmapDataset } = await import('../../../src/utils/heatmap');
    expect(getHeatmapDataset('electronegativity').values.get(2)).toBeNull();
    expect(getHeatmapDataset('atomicMass').values.get(2)).toBeCloseTo(20);
    expect(getHeatmapDataset('decayMode').values.get(2)).toBeNull();
  });

  it('treats an unmapped decay mode as no decay score', async () => {
    const { getHeatmapDataset } = await import('../../../src/utils/heatmap');
    expect(getHeatmapDataset('decayMode').values.get(3)).toBeNull();
  });

  it('treats a zero-second half-life/lifetime as no data', async () => {
    const { getHeatmapDataset } = await import('../../../src/utils/heatmap');
    expect(getHeatmapDataset('halfLife').values.get(4)).toBeNull();
    expect(getHeatmapDataset('lifetime').values.get(4)).toBeNull();
  });

  it('treats a missing prevalence object as no rarity value', async () => {
    const { getHeatmapDataset } = await import('../../../src/utils/heatmap');
    expect(getHeatmapDataset('rarity').values.get(5)).toBeNull();
  });

  it('returns null when neither properties.atomicMass nor the raw mass parse (no detail record)', async () => {
    const { getHeatmapDataset } = await import('../../../src/utils/heatmap');
    expect(getHeatmapDataset('atomicMass').values.get(7)).toBeNull();
  });

  it('falls back to the raw atomic mass when properties.atomicMass is unparseable', async () => {
    const { getHeatmapDataset } = await import('../../../src/utils/heatmap');
    expect(getHeatmapDataset('atomicMass').values.get(6)).toBeCloseTo(60);
  });

  it('falls back to a 0/0 range when no element has data for an id', async () => {
    const { getHeatmapDataset } = await import('../../../src/utils/heatmap');
    const dataset = getHeatmapDataset('electronAffinity');
    expect(dataset.withData).toBe(0);
    expect(dataset.min).toBe(0);
    expect(dataset.max).toBe(0);
  });
});

describe('valueToIntensity edge cases via direct dataset mutation', () => {
  it('returns full intensity when the dataset range collapses to a single value', async () => {
    const { getHeatmapDataset, getHeatmapIntensity } = await import('../../../src/utils/heatmap');
    const dataset = getHeatmapDataset('ionizationEnergy');
    dataset.min = 42;
    dataset.max = 42;
    expect(getHeatmapIntensity('ionizationEnergy', 1)).toBe(1);
  });

  it("returns zero intensity when an inverted id's dataset range collapses to a single value", async () => {
    const { getHeatmapDataset, getHeatmapIntensity } = await import('../../../src/utils/heatmap');
    const dataset = getHeatmapDataset('rarity');
    dataset.min = 7;
    dataset.max = 7;
    expect(getHeatmapIntensity('rarity', 1)).toBe(0);
  });

  it('returns 0 (or 1 when inverted) for a non-positive value on a log scale', async () => {
    const { getHeatmapDataset, getHeatmapIntensity } = await import('../../../src/utils/heatmap');
    const dataset = getHeatmapDataset('halfLife');
    dataset.values.set(1, -5);
    dataset.min = -5;
    dataset.max = 100;
    expect(getHeatmapIntensity('halfLife', 1)).toBe(0);
  });

  it('inverts the non-positive-value-on-log-scale result for an inverted id', async () => {
    const { getHeatmapDataset, getHeatmapIntensity } = await import('../../../src/utils/heatmap');
    const dataset = getHeatmapDataset('rarity');
    dataset.values.set(1, 0);
    dataset.min = 0;
    dataset.max = 100;
    expect(getHeatmapIntensity('rarity', 1)).toBe(1);
  });
});
