import type { CollectionSpectrumData } from '../../types/collection/spectrum';
import type { SpectrumAnnotation } from '../../types/collection/collection';
import { toIntlLocale } from '../intlLocale';
import { channelToEnergy } from './spectrumChart';

/** RadiaCode-102 CsI(Tl) resolution, FWHM² = E·(c1 + c2·E) in keV — fitted to isolated peaks (60–590 keV) in this collection's spectra. */
const FWHM_C1 = 3.6;
const FWHM_C2 = 0.0036;
/** Lines closer than this (in FWHM of the higher one) are fitted together. */
const CLUSTER_GAP = 2.5;
/** Fit region margin beyond the outermost line, in FWHM. */
const REGION_MARGIN = 1.5;
/** Below this the detector's threshold rise can't be modelled by a smooth baseline. */
const MIN_REGION_ENERGY = 12;
/** Grid for a common centroid shift (in FWHM) and width scale per cluster — absorbs the annotation's channel rounding and resolution-curve error. */
const SHIFT_GRID = Array.from({ length: 21 }, (_, i) => (i - 10) * 0.01);
const WIDTH_SCALE_GRID = Array.from({ length: 9 }, (_, i) => 0.8 + i * 0.05);
const FWHM_TO_SIGMA = 2 * Math.sqrt(2 * Math.log(2));

export interface PeakAreaResult {
  label: string;
  energy: number;
  /** Fitted full-peak area, net of the time-scaled background spectrum and the fitted continuum */
  netCounts: number;
  sigma: number;
  netCps: number;
  sigmaCps: number;
  /** netCounts / sigma */
  significance: number;
  /** Other annotated lines were fitted jointly with this one */
  blended: boolean;
  /** χ²/ν of the fit this line belongs to — well above 1 means the model (fixed centroid/width) misfits */
  reducedChiSquare: number;
}

export function peakFwhm(energy: number): number {
  return Math.sqrt(energy * (FWHM_C1 + FWHM_C2 * energy));
}

/** Solves A·x = b for a small symmetric positive-definite system; returns x and A⁻¹, or null if singular. */
export function solveNormalEquations(a: number[][], b: number[]): { x: number[]; inverse: number[][] } | null {
  const n = b.length;
  const m = a.map((row, i) => [...row, ...Array.from({ length: n }, (_, j) => (i === j ? 1 : 0)), b[i]!]);
  for (let col = 0; col < n; col++) {
    let pivot = col;
    for (let row = col + 1; row < n; row++) if (Math.abs(m[row]![col]!) > Math.abs(m[pivot]![col]!)) pivot = row;
    if (Math.abs(m[pivot]![col]!) < 1e-12) return null;
    [m[col], m[pivot]] = [m[pivot]!, m[col]!];
    const p = m[col]![col]!;
    for (let k = 0; k < m[col]!.length; k++) m[col]![k]! /= p;
    for (let row = 0; row < n; row++) {
      if (row === col) continue;
      const f = m[row]![col]!;
      if (f === 0) continue;
      for (let k = 0; k < m[row]!.length; k++) m[row]![k]! -= f * m[col]![k]!;
    }
  }
  return { x: m.map((row) => row[2 * n]!), inverse: m.map((row) => row.slice(n, 2 * n)) };
}

function clusterAnnotations(annotations: SpectrumAnnotation[]): SpectrumAnnotation[][] {
  const sorted = [...annotations].sort((x, y) => x.energy - y.energy);
  const clusters: SpectrumAnnotation[][] = [];
  for (const annotation of sorted) {
    const last = clusters[clusters.length - 1];
    const prev = last?.[last.length - 1];
    if (last && prev && annotation.energy - prev.energy < CLUSTER_GAP * peakFwhm(annotation.energy))
      last.push(annotation);
    else clusters.push([annotation]);
  }
  return clusters;
}

/**
 * Net peak area for each annotated line. The time-scaled background spectrum is subtracted channel by channel,
 * then every cluster of overlapping lines is fitted jointly as Gaussians (centroid = the annotation's energy,
 * width from the detector's resolution curve) on a quadratic continuum — fixed centroids/widths keep it a
 * linear weighted least-squares problem with an exact covariance. Poisson σ is inflated by √(χ²/ν) when the
 * fit is worse than counting statistics alone explain. Lines near the detector threshold or past the
 * spectrum's end are skipped.
 */
export function computePeakAreas(
  data: CollectionSpectrumData | null,
  annotations: SpectrumAnnotation[] | null | undefined,
  background: CollectionSpectrumData | null = null,
): PeakAreaResult[] {
  if (!data || !annotations?.length || data.measurementTimeSec <= 0) return [];
  const { calibration, counts, measurementTimeSec } = data;
  // Last channel is the device's overflow tally.
  const channels = counts.length - 1;
  const bgScale =
    background && background.measurementTimeSec > 0 ? measurementTimeSec / background.measurementTimeSec : 0;
  const bgCounts = background?.counts ?? [];
  const energyOf = (ch: number) => channelToEnergy(ch, calibration);
  const maxEnergy = energyOf(channels - 1);

  const byAnnotation = new Map<SpectrumAnnotation, PeakAreaResult>();
  for (const cluster of clusterAnnotations(annotations)) {
    const from = cluster[0]!.energy - REGION_MARGIN * peakFwhm(cluster[0]!.energy);
    const lastLine = cluster[cluster.length - 1]!;
    const to = lastLine.energy + REGION_MARGIN * peakFwhm(lastLine.energy);
    if (from < MIN_REGION_ENERGY || to > maxEnergy) continue;

    const chs: number[] = [];
    for (let ch = 0; ch < channels; ch++) {
      const e = energyOf(ch);
      if (e >= from && e <= to) chs.push(ch);
    }
    const center = (from + to) / 2;
    const halfSpan = (to - from) / 2;
    const nParams = cluster.length + 3;
    if (chs.length <= nParams + 2) continue;

    const fit = (shift: number, widthScale: number) => {
      const ata = Array.from({ length: nParams }, () => new Array<number>(nParams).fill(0));
      const atb = new Array<number>(nParams).fill(0);
      const rows: { y: number; w: number; basis: number[] }[] = [];
      for (const ch of chs) {
        const e = energyOf(ch);
        const width = energyOf(ch + 0.5) - energyOf(ch - 0.5);
        const basis = cluster.map((line) => {
          const s = (widthScale * peakFwhm(line.energy)) / FWHM_TO_SIGMA;
          return (width / (s * Math.sqrt(2 * Math.PI))) * Math.exp(-((e - line.energy - shift) ** 2) / (2 * s * s));
        });
        const u = (e - center) / halfSpan;
        basis.push(1, u, u * u);
        const bg = bgCounts[ch] ?? 0;
        const y = counts[ch]! - bgScale * bg;
        // Floor at 1 so an empty channel doesn't get infinite weight.
        const w = 1 / Math.max(1, counts[ch]! + bgScale * bgScale * bg);
        rows.push({ y, w, basis });
        for (let i = 0; i < nParams; i++) {
          atb[i]! += w * basis[i]! * y;
          for (let j = 0; j < nParams; j++) ata[i]![j]! += w * basis[i]! * basis[j]!;
        }
      }

      const solved = solveNormalEquations(ata, atb);
      if (!solved) return null;
      let chiSquare = 0;
      for (const { y, w, basis } of rows) {
        const model = basis.reduce((sum, v, i) => sum + v * solved.x[i]!, 0);
        chiSquare += w * (y - model) ** 2;
      }
      return { solved, chiSquare };
    };

    let best: { solved: { x: number[]; inverse: number[][] }; chiSquare: number } | null = null;
    for (const shift of SHIFT_GRID) {
      for (const widthScale of WIDTH_SCALE_GRID) {
        const result = fit(shift * peakFwhm(cluster[0]!.energy), widthScale);
        if (result && (!best || result.chiSquare < best.chiSquare)) best = result;
      }
    }
    if (!best) continue;
    const { solved, chiSquare } = best;
    // Shift and width scale are fitted too (by grid search), so they count as two more parameters.
    const reducedChiSquare = chiSquare / (chs.length - nParams - 2);
    const inflation = Math.sqrt(Math.max(1, reducedChiSquare));

    cluster.forEach((line, i) => {
      const netCounts = solved.x[i]!;
      const sigma = Math.sqrt(Math.max(0, solved.inverse[i]![i]!)) * inflation;
      byAnnotation.set(line, {
        label: line.label,
        energy: line.energy,
        netCounts,
        sigma,
        netCps: netCounts / measurementTimeSec,
        sigmaCps: sigma / measurementTimeSec,
        significance: netCounts / sigma,
        blended: cluster.length > 1,
        reducedChiSquare,
      });
    });
  }

  return annotations.flatMap((a) => {
    const result = byAnnotation.get(a);
    return result ? [result] : [];
  });
}

/** Rounds σ to 2 significant digits and the value to the same decimal place, e.g. 54 265 136 ± 340 121 → "54 270 000", "340 000". */
export function formatWithUncertainty(value: number, sigma: number, locale: string): { value: string; sigma: string } {
  const intl = toIntlLocale(locale);
  if (!(sigma > 0)) return { value: value.toLocaleString(intl), sigma: '0' };
  const decimals = 1 - Math.floor(Math.log10(sigma));
  const fmt = (x: number) => {
    if (decimals > 0)
      return x.toLocaleString(intl, { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
    const step = 10 ** -decimals;
    return (Math.round(x / step) * step).toLocaleString(intl, { maximumFractionDigits: 0 });
  };
  return { value: fmt(value), sigma: fmt(sigma) };
}

export function formatSignificance(significance: number, locale: string): string {
  const digits = Math.abs(significance) < 10 ? 1 : 0;
  return `${significance.toLocaleString(toIntlLocale(locale), { minimumFractionDigits: digits, maximumFractionDigits: digits })}σ`;
}
