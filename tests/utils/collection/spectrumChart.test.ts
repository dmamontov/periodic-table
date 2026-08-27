import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  buildSpectrumChart,
  formatSpectrumCaption,
  formatSpectrumCpsLabel,
  formatSpectrumDurationLabel,
  SPECTRUM_SMOOTHING_DEFAULT,
} from '../../../src/utils/collection/spectrumChart';
import type { CollectionSpectrumData } from '../../../src/types/collection/spectrum';
import type { SpectrumAnnotation } from '../../../src/types/collection/collection';

const LINEAR_CALIBRATION: [number, number, number] = [0, 1, 0];

function makeSpectrum(counts: number[], overrides: Partial<CollectionSpectrumData> = {}): CollectionSpectrumData {
  return {
    id: 'test',
    device: 'Test Device',
    sample: 'Test Sample',
    serialNumber: 'SN1',
    measurementTimeSec: 100,
    startTime: '',
    endTime: '',
    channels: counts.length,
    calibration: LINEAR_CALIBRATION,
    counts,
    ...overrides,
  };
}

/** counts[0..750] = 0 (751 real channels after slicing off the overflow tally), displayMaxEnergy floors at 750. */
function makeZeroSpectrum(): CollectionSpectrumData {
  return makeSpectrum(new Array<number>(802).fill(0));
}

afterEach(() => {
  vi.restoreAllMocks();
});

describe('buildSpectrumChart', () => {
  it('returns null for missing data', () => {
    expect(buildSpectrumChart(null, null)).toBeNull();
  });

  it('returns null when there are no plottable points (single-channel spectrum)', () => {
    expect(buildSpectrumChart(makeSpectrum([100]), null)).toBeNull();
  });

  it('builds a chart with a real peak, using the default linear scale and smoothing', () => {
    const counts = new Array<number>(200).fill(1);
    counts[100] = 500;
    counts[199] = 999999; // overflow tally, excluded
    const chart = buildSpectrumChart(makeSpectrum(counts), null);

    expect(chart).not.toBeNull();
    expect(chart!.width).toBe(640);
    expect(chart!.height).toBe(260);
    expect(chart!.markers).toEqual([]);
    expect(chart!.backgroundLinePath).toBeNull();
    expect(chart!.backgroundAreaPath).toBeNull();
    expect(chart!.areaPath.startsWith('M ')).toBe(true);
    expect(chart!.linePath.length).toBeGreaterThan(0);
    expect(chart!.xTicks.length).toBeGreaterThan(0);
    expect(chart!.yTicks.length).toBeGreaterThan(0);
  });

  it('falls back to the largest x-tick step when the display range is very wide', () => {
    const counts = new Array<number>(802).fill(0);
    counts[700] = 1000; // energy 7000 keV at 10 keV/channel
    const chart = buildSpectrumChart(makeSpectrum(counts, { calibration: [0, 10, 0] }), null);

    expect(chart).not.toBeNull();
    expect(chart!.displayMaxEnergy).toBeGreaterThan(6000);
    const steps = chart!.xTicks.slice(1).map((t, i) => t.energy - chart!.xTicks[i]!.energy);
    expect(steps.every((s) => s === 1000)).toBe(true);
  });

  it('produces both plain and "k"-suffixed y-tick labels, including a non-integer k', () => {
    const counts = new Array<number>(200).fill(0);
    // Flat plateau so smoothing (radius default 2) doesn't distort interior values.
    for (let ch = 0; ch < 190; ch++) counts[ch] = 1900;
    const chart = buildSpectrumChart(makeSpectrum(counts), null, 'linear', 0);

    const labels = chart!.yTicks.map((t) => t.label);
    expect(labels).toContain('1k');
    expect(labels).toContain('1.5k');
    expect(labels.some((l) => !l.includes('k'))).toBe(true);
  });

  it('builds log-scale y-ticks, one per decade', () => {
    const counts = new Array<number>(200).fill(0);
    for (let ch = 0; ch < 190; ch++) counts[ch] = 150;
    const chart = buildSpectrumChart(makeSpectrum(counts), null, 'log', 0);

    expect(chart!.yTicks.map((t) => t.value)).toEqual([0, 1, 10, 100]);
  });

  it('includes markers within the display range and excludes ones outside it', () => {
    const counts = new Array<number>(200).fill(0);
    counts[100] = 500;
    const annotations: SpectrumAnnotation[] = [
      { energy: 50, label: 'In range' },
      { energy: 0, label: 'Zero energy, excluded' },
      { energy: -10, label: 'Negative, excluded' },
      { energy: 100000, label: 'Beyond display range, excluded' },
    ];
    const chart = buildSpectrumChart(makeSpectrum(counts), annotations);

    expect(chart!.markers).toHaveLength(1);
    expect(chart!.markers[0]!.label).toBe('In range');
  });

  it('treats missing annotations as no markers', () => {
    const counts = new Array<number>(200).fill(0);
    counts[100] = 500;
    expect(buildSpectrumChart(makeSpectrum(counts), undefined)!.markers).toEqual([]);
  });

  it('overlays a time-scaled background trace when provided', () => {
    const counts = new Array<number>(200).fill(0);
    counts[100] = 500;
    const background = makeSpectrum(new Array<number>(200).fill(10), { measurementTimeSec: 50 });
    const chart = buildSpectrumChart(makeSpectrum(counts), null, 'linear', SPECTRUM_SMOOTHING_DEFAULT, background);

    expect(chart!.backgroundLinePath).not.toBeNull();
    expect(chart!.backgroundAreaPath).not.toBeNull();
    expect(chart!.backgroundAreaPath!.startsWith('M ')).toBe(true);
  });

  it('ignores a background spectrum with zero or negative measurement time', () => {
    const counts = new Array<number>(200).fill(0);
    counts[100] = 500;
    const background = makeSpectrum(new Array<number>(200).fill(10), { measurementTimeSec: 0 });
    const chart = buildSpectrumChart(makeSpectrum(counts), null, 'linear', SPECTRUM_SMOOTHING_DEFAULT, background);

    expect(chart!.backgroundLinePath).toBeNull();
    expect(chart!.backgroundAreaPath).toBeNull();
  });

  it('treats a missing channel count as zero, identically to a real zero, when detecting the display range and smoothing', () => {
    const zero = new Array<number>(802).fill(0);
    const hole = [...zero] as (number | undefined)[];
    hole[300] = undefined;

    const chartZero = buildSpectrumChart(makeSpectrum(zero), null, 'linear', 0);
    const chartHole = buildSpectrumChart(makeSpectrum(hole as number[]), null, 'linear', 0);
    expect(chartHole).toEqual(chartZero);
  });

  it('treats a missing background channel count as zero when the background spectrum has fewer channels', () => {
    const counts = new Array<number>(200).fill(0);
    counts[100] = 500;
    const shortBackground = makeSpectrum(new Array<number>(50).fill(10), { measurementTimeSec: 50 });
    const chart = buildSpectrumChart(makeSpectrum(counts), null, 'linear', 0, shortBackground);

    expect(chart!.backgroundLinePath).not.toBeNull();
  });

  it('produces a step-1 nice tick (niceResidual=2) for a mid-range peak', () => {
    const counts = new Array<number>(200).fill(0);
    for (let ch = 0; ch < 190; ch++) counts[ch] = 600;
    const chart = buildSpectrumChart(makeSpectrum(counts), null, 'linear', 0);
    expect(chart!.yTicks.map((t) => t.value)).toEqual([0, 200, 400, 600]);
  });

  it('produces a nice tick step of 10x magnitude (niceResidual=10) for a high peak', () => {
    const counts = new Array<number>(200).fill(0);
    for (let ch = 0; ch < 190; ch++) counts[ch] = 2400;
    const chart = buildSpectrumChart(makeSpectrum(counts), null, 'linear', 0);
    expect(chart!.yTicks.map((t) => t.value)).toEqual([0, 1000, 2000]);
  });

  it('falls back to a single zero y-tick when maxCount collapses to 0 (noUncheckedIndexedAccess / dead-branch guard)', () => {
    const originalMax = Math.max;
    vi.spyOn(Math, 'max').mockImplementation((...args: number[]) => {
      if (args.length > 0 && args[args.length - 1] === 1 && args.slice(0, -1).every((a) => a === 0)) return 0;
      return originalMax(...args);
    });

    const chart = buildSpectrumChart(makeZeroSpectrum(), null, 'linear', 0);
    expect(chart!.yTicks).toHaveLength(1);
    expect(chart!.yTicks[0]!.value).toBe(0);
    expect(chart!.yTicks[0]!.label).toBe('0');
  });
});

describe('formatSpectrumCaption', () => {
  it('returns the device name', () => {
    expect(formatSpectrumCaption(makeSpectrum([1, 2], { device: 'RadiaCode-103' }))).toBe('RadiaCode-103');
  });

  it('returns an empty string for missing data', () => {
    expect(formatSpectrumCaption(null)).toBe('');
  });
});

describe('formatSpectrumDurationLabel', () => {
  it('returns an empty string for missing data', () => {
    expect(formatSpectrumDurationLabel(null)).toBe('');
  });

  it('formats seconds as zero-padded HH:MM:SS', () => {
    expect(formatSpectrumDurationLabel(makeSpectrum([1], { measurementTimeSec: 5 }))).toBe('00:00:05');
  });

  it('formats durations spanning hours and minutes', () => {
    expect(formatSpectrumDurationLabel(makeSpectrum([1], { measurementTimeSec: 3725 }))).toBe('01:02:05');
  });
});

describe('formatSpectrumCpsLabel', () => {
  it('returns an empty string for missing data', () => {
    expect(formatSpectrumCpsLabel(null, 'ru')).toBe('');
  });

  it('computes counts per second, excluding the overflow tally, with 2 decimal places', () => {
    const label = formatSpectrumCpsLabel(makeSpectrum([10, 20, 999999], { measurementTimeSec: 10 }), 'ru');
    expect(label).toBe(`${(30 / 10).toLocaleString('ru', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} cps`);
  });

  it('uses zh-CN for the zh locale', () => {
    const label = formatSpectrumCpsLabel(makeSpectrum([10, 999999], { measurementTimeSec: 10 }), 'zh');
    expect(label).toBe(
      `${(10 / 10).toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} cps`,
    );
  });
});
