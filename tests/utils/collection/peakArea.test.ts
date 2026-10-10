import { describe, expect, it } from 'vitest';
import {
  computePeakAreas,
  formatSignificance,
  formatWithUncertainty,
  peakFwhm,
  solveNormalEquations,
} from '../../../src/utils/collection/peakArea';
import type { CollectionSpectrumData } from '../../../src/types/collection/spectrum';

const CHANNELS = 400;

/** 1 keV/channel spectrum: Gaussian peaks of the given full areas on a sloped continuum, plus the overflow tally channel. */
function spectrum(peaks: { energy: number; area: number }[], continuum = (e: number) => 200 - 0.2 * e, time = 1000) {
  const counts = Array.from({ length: CHANNELS }, (_, ch) => {
    let value = continuum(ch);
    for (const { energy, area } of peaks) {
      const s = peakFwhm(energy) / 2.3548;
      value += (area / (s * Math.sqrt(2 * Math.PI))) * Math.exp(-((ch - energy) ** 2) / (2 * s * s));
    }
    return Math.round(value);
  });
  counts.push(99999);
  return {
    id: 'test',
    device: 'RadiaCode-102',
    sample: 'Test',
    serialNumber: '1',
    measurementTimeSec: time,
    startTime: '',
    endTime: '',
    channels: CHANNELS + 1,
    calibration: [0, 1, 0],
    counts,
  } satisfies CollectionSpectrumData;
}

describe('computePeakAreas', () => {
  it('recovers an isolated peak area on a sloped continuum', () => {
    const [result] = computePeakAreas(spectrum([{ energy: 150, area: 20000 }]), [{ energy: 150, label: 'X' }]);
    expect(result!.netCounts).toBeGreaterThan(19000);
    expect(result!.netCounts).toBeLessThan(21000);
    expect(result!.significance).toBeGreaterThan(20);
    expect(result!.netCps).toBeCloseTo(result!.netCounts / 1000);
    expect(result!.sigmaCps).toBeCloseTo(result!.sigma / 1000);
    expect(result!.blended).toBe(false);
  });

  it('separates overlapping lines by fitting them jointly', () => {
    const results = computePeakAreas(
      spectrum([
        { energy: 200, area: 30000 },
        { energy: 240, area: 10000 },
      ]),
      [
        { energy: 240, label: 'B' },
        { energy: 200, label: 'A' },
      ],
    );
    expect(results.map((r) => r.label)).toEqual(['B', 'A']);
    expect(results[0]!.netCounts).toBeGreaterThan(9000);
    expect(results[0]!.netCounts).toBeLessThan(11000);
    expect(results[1]!.netCounts).toBeGreaterThan(28500);
    expect(results[1]!.netCounts).toBeLessThan(31500);
    expect(results.every((r) => r.blended)).toBe(true);
  });

  it('subtracts the time-scaled background spectrum', () => {
    const data = spectrum([{ energy: 150, area: 20000 }], () => 100, 1000);
    const background = { ...spectrum([{ energy: 150, area: 5000 }], () => 50, 500), id: 'bg' };
    const [result] = computePeakAreas(data, [{ energy: 150, label: 'X' }], background);
    // 5000 counts in 500 s → 10000 in 1000 s.
    expect(result!.netCounts).toBeGreaterThan(9000);
    expect(result!.netCounts).toBeLessThan(11000);
  });

  it('ignores a background with no live time', () => {
    const data = spectrum([{ energy: 150, area: 20000 }]);
    const background = { ...spectrum([{ energy: 150, area: 5000 }]), measurementTimeSec: 0 };
    const [result] = computePeakAreas(data, [{ energy: 150, label: 'X' }], background);
    expect(result!.netCounts).toBeGreaterThan(19000);
  });

  it('skips lines near the detector threshold or past the spectrum end', () => {
    expect(computePeakAreas(spectrum([]), [{ energy: 15, label: 'Low' }])).toEqual([]);
    expect(computePeakAreas(spectrum([]), [{ energy: 395, label: 'High' }])).toEqual([]);
  });

  it('skips a cluster whose fit region has too few channels', () => {
    const coarse = { ...spectrum([]), calibration: [0, 40, 0] as [number, number, number] };
    expect(computePeakAreas(coarse, [{ energy: 200, label: 'X' }])).toEqual([]);
  });

  it('skips a cluster whose fit is singular', () => {
    // Two lines at the same energy have identical basis columns.
    const results = computePeakAreas(spectrum([{ energy: 150, area: 1000 }]), [
      { energy: 150, label: 'A' },
      { energy: 150, label: 'B' },
    ]);
    expect(results).toEqual([]);
  });

  it('returns nothing without data, annotations or live time', () => {
    expect(computePeakAreas(null, [{ energy: 150, label: 'X' }])).toEqual([]);
    expect(computePeakAreas(spectrum([]), null)).toEqual([]);
    expect(computePeakAreas(spectrum([]), [])).toEqual([]);
    expect(computePeakAreas({ ...spectrum([]), measurementTimeSec: 0 }, [{ energy: 150, label: 'X' }])).toEqual([]);
  });
});

describe('solveNormalEquations', () => {
  it('solves a small system and returns its inverse', () => {
    const result = solveNormalEquations(
      [
        [0, 2],
        [4, 0],
      ],
      [2, 8],
    );
    expect(result!.x).toEqual([2, 1]);
    expect(result!.inverse).toEqual([
      [0, 0.25],
      [0.5, 0],
    ]);
  });

  it('returns null for a singular matrix', () => {
    expect(
      solveNormalEquations(
        [
          [1, 1],
          [1, 1],
        ],
        [1, 1],
      ),
    ).toBeNull();
  });
});

describe('formatWithUncertainty', () => {
  it('rounds σ to two significant digits and the value to match', () => {
    expect(formatWithUncertainty(54265136, 340121, 'en')).toEqual({ value: '54,270,000', sigma: '340,000' });
    expect(formatWithUncertainty(5.27631, 0.03561, 'en')).toEqual({ value: '5.276', sigma: '0.036' });
    expect(formatWithUncertainty(757.5, 4.7, 'ru')).toEqual({ value: '757,5', sigma: '4,7' });
  });

  it('falls back to the bare value without an uncertainty', () => {
    expect(formatWithUncertainty(12, 0, 'zh')).toEqual({ value: '12', sigma: '0' });
  });
});

describe('formatSignificance', () => {
  it('keeps one decimal below 10σ and none above', () => {
    expect(formatSignificance(3.24, 'en')).toBe('3.2σ');
    expect(formatSignificance(-1.5, 'ru')).toBe('-1,5σ');
    expect(formatSignificance(159.5, 'en')).toBe('160σ');
  });
});
