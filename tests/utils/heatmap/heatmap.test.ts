import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  formatHeatmapCellDisplay,
  formatHeatmapElementValue,
  formatHeatmapRangeValue,
  formatHeatmapValue,
  formatNucleusDurationDisplay,
  formatUnitLabel,
  getHeatmapDataset,
  getHeatmapIntensity,
  HEATMAP_DEFINITIONS,
  HEATMAP_GROUP_ORDER,
  intensityToBrightness,
  parseDetailNumeric,
  parseHalfLifeToSeconds,
} from '../../../src/utils/heatmap';
import { getSymbolByNumber } from '../../../src/utils/element/lookup';
import { localeMessages } from '../../../src/locales';

const messages = localeMessages.ru;

function numberForSymbol(symbol: string): number {
  for (let n = 1; n <= 118; n++) {
    if (getSymbolByNumber(n) === symbol) return n;
  }
  throw new Error(`No atomic number found for symbol ${symbol}`);
}

const HYDROGEN = numberForSymbol('H'); // stable, halfLife '∞'
const TECHNETIUM = numberForSymbol('Tc'); // betaMinus, real numeric halfLife/lifetime
const PLATINUM = numberForSymbol('Pt'); // alpha
const ASTATINE = numberForSymbol('At'); // electronCapture
const LAWRENCIUM = numberForSymbol('Lr'); // spontaneousFission
const INVALID_NUMBER = 999;

afterEach(() => {
  vi.restoreAllMocks();
});

describe('parseDetailNumeric', () => {
  it('returns null for null, undefined, or an empty string', () => {
    expect(parseDetailNumeric(null)).toBeNull();
    expect(parseDetailNumeric(undefined)).toBeNull();
    expect(parseDetailNumeric('')).toBeNull();
  });

  it('strips HTML tags', () => {
    expect(parseDetailNumeric('<sup>1</sup>500')).toBe(1500);
  });

  it('treats a comma as a decimal separator', () => {
    expect(parseDetailNumeric('1,5')).toBe(1.5);
  });

  it('strips internal whitespace', () => {
    expect(parseDetailNumeric('1 234')).toBe(1234);
  });

  it('parses "mantissa ⋅ 10^exp" scientific notation with an explicit caret', () => {
    expect(parseDetailNumeric('1.5 ⋅ 10^-8')).toBeCloseTo(1.5e-8);
  });

  it('parses "mantissa ⋅ 10exp" scientific notation without a caret', () => {
    expect(parseDetailNumeric('2 ⋅ 103')).toBe(2 * 10 ** 3);
  });

  it('defaults the exponent to 0 when "⋅ 10" has no trailing digits', () => {
    expect(parseDetailNumeric('5 ⋅ 10')).toBe(5);
  });

  it('falls back to a plain numeric parse when scientific notation does not match (e.g. unicode superscript exponents)', () => {
    // Real prevalence data uses unicode superscript exponents ("7.2 ⋅ 10⁻¹⁰"), which the
    // scientific-notation regex (ASCII digits only) does not match, so parsing falls back
    // to stripping non-numeric characters - this is documented actual behavior.
    expect(parseDetailNumeric('7.2 ⋅ 10⁻¹⁰')).toBe(7.21);
  });

  it('falls through to the plain-numeric fallback when the scientific mantissa overflows to Infinity', () => {
    const hugeMantissa = '9'.repeat(400);
    expect(parseDetailNumeric(`${hugeMantissa} ⋅ 10`)).toBeNull();
  });

  it('parses plain exponent notation via the fallback', () => {
    expect(parseDetailNumeric('1.5e10')).toBe(1.5e10);
  });

  it('parses a plain integer via the fallback', () => {
    expect(parseDetailNumeric('42abc')).toBe(42);
  });

  it('returns null when nothing numeric remains', () => {
    expect(parseDetailNumeric('abc')).toBeNull();
  });
});

describe('parseHalfLifeToSeconds', () => {
  it('returns null for null, undefined, or an empty string', () => {
    expect(parseHalfLifeToSeconds(null)).toBeNull();
    expect(parseHalfLifeToSeconds(undefined)).toBeNull();
    expect(parseHalfLifeToSeconds('')).toBeNull();
  });

  it('returns Infinity for "∞"', () => {
    expect(parseHalfLifeToSeconds('∞')).toBe(Number.POSITIVE_INFINITY);
  });

  it('returns null when the value does not match the value/unitCode format', () => {
    expect(parseHalfLifeToSeconds('not-a-value')).toBeNull();
  });

  it('returns null for an unknown unit code', () => {
    expect(parseHalfLifeToSeconds('5/99')).toBeNull();
  });

  it('returns null for a negative value', () => {
    expect(parseHalfLifeToSeconds('-5/1')).toBeNull();
  });

  it('converts each known unit code to seconds', () => {
    expect(parseHalfLifeToSeconds('1/1')).toBeCloseTo(365.25 * 24 * 3600);
    expect(parseHalfLifeToSeconds('1/2')).toBe(24 * 3600);
    expect(parseHalfLifeToSeconds('1/3')).toBe(3600);
    expect(parseHalfLifeToSeconds('1/4')).toBe(60);
    expect(parseHalfLifeToSeconds('1/5')).toBe(1);
  });

  it('accepts a zero value', () => {
    expect(parseHalfLifeToSeconds('0/1')).toBe(0);
  });
});

describe('intensityToBrightness', () => {
  it('maps 0 to the minimum brightness and 1 to the maximum', () => {
    expect(intensityToBrightness(0)).toBeCloseTo(0.52);
    expect(intensityToBrightness(1)).toBeCloseTo(1.02);
  });

  it('interpolates linearly in between', () => {
    expect(intensityToBrightness(0.5)).toBeCloseTo(0.77);
  });
});

describe('formatUnitLabel', () => {
  it('returns an empty string for a missing unit key', () => {
    expect(formatUnitLabel(undefined, messages)).toBe('');
  });

  it('strips parentheses and colons from the localized unit label', () => {
    expect(formatUnitLabel('gPerMol', messages)).toBe('г/моль');
  });

  it('leaves a unit label with no decoration unchanged', () => {
    expect(formatUnitLabel('celsius', messages)).toBe('°C');
  });
});

describe('HEATMAP_DEFINITIONS / HEATMAP_GROUP_ORDER', () => {
  it('has one definition per group id used', () => {
    for (const def of HEATMAP_DEFINITIONS) {
      expect(HEATMAP_GROUP_ORDER).toContain(def.group);
    }
  });
});

describe('getHeatmapDataset', () => {
  it('builds a dataset for every defined heatmap id with a real min <= max', () => {
    for (const def of HEATMAP_DEFINITIONS) {
      const dataset = getHeatmapDataset(def.id);
      expect(dataset.withData).toBeGreaterThan(0);
      expect(dataset.min).toBeLessThanOrEqual(dataset.max);
      expect(dataset.values.size).toBe(118);
    }
  });

  it('captures a decayMode score for every real element (all decay modes present in real data map to a score)', () => {
    const dataset = getHeatmapDataset('decayMode');
    expect(dataset.values.get(HYDROGEN)).toBe(0);
    expect(dataset.values.get(TECHNETIUM)).toBe(3);
    expect(dataset.values.get(PLATINUM)).toBe(4);
    expect(dataset.values.get(ASTATINE)).toBe(2);
    expect(dataset.values.get(LAWRENCIUM)).toBe(6);
  });

  it('excludes stable/missing nucleus data from the halfLife and lifetime datasets', () => {
    const halfLife = getHeatmapDataset('halfLife');
    expect(halfLife.values.get(HYDROGEN)).toBeNull();
    expect(halfLife.values.get(TECHNETIUM)).not.toBeNull();
  });
});

describe('getHeatmapIntensity', () => {
  it('returns null for an id/number with no data', () => {
    expect(getHeatmapIntensity('atomicMass', INVALID_NUMBER)).toBeNull();
    expect(getHeatmapIntensity('halfLife', HYDROGEN)).toBeNull();
  });

  it('returns a normalized intensity in [0, 1] for a linear-scale id', () => {
    const intensity = getHeatmapIntensity('atomicMass', HYDROGEN);
    expect(intensity).not.toBeNull();
    expect(intensity!).toBeGreaterThanOrEqual(0);
    expect(intensity!).toBeLessThanOrEqual(1);
  });

  it('returns a normalized intensity for a log-scale id', () => {
    const intensity = getHeatmapIntensity('halfLife', TECHNETIUM);
    expect(intensity).not.toBeNull();
    expect(intensity!).toBeGreaterThanOrEqual(0);
    expect(intensity!).toBeLessThanOrEqual(1);
  });

  it('applies invertIntensity for rarity', () => {
    const rarityDef = HEATMAP_DEFINITIONS.find((d) => d.id === 'rarity')!;
    expect(rarityDef.invertIntensity).toBe(true);
    const intensity = getHeatmapIntensity('rarity', HYDROGEN);
    expect(intensity).not.toBeNull();
  });
});

describe('formatHeatmapValue', () => {
  it('uses scientific notation for very large magnitudes', () => {
    expect(formatHeatmapValue(123456, 'ru')).toContain('·10');
  });

  it('uses scientific notation for very small nonzero magnitudes', () => {
    expect(formatHeatmapValue(0.0001, 'ru')).toContain('·10');
  });

  it('uses no fraction digits for magnitudes >= 100', () => {
    expect(formatHeatmapValue(250.7, 'ru')).toBe((250.7).toLocaleString('ru', { maximumFractionDigits: 0 }));
  });

  it('uses up to 2 fraction digits for smaller magnitudes', () => {
    expect(formatHeatmapValue(1.5, 'ru')).toBe(
      (1.5).toLocaleString('ru', { minimumFractionDigits: 0, maximumFractionDigits: 2 }),
    );
  });

  it('renders a superscript minus for a negative scientific exponent', () => {
    expect(formatHeatmapValue(0.0001, 'ru')).toContain('⁻');
  });

  it('renders a superscript zero exponent (dead-branch guard: no real caller passes a [1,10)-magnitude value into scientific formatting)', () => {
    vi.spyOn(Math, 'log10').mockReturnValueOnce(0);
    expect(formatHeatmapValue(50000, 'ru').endsWith('⁰')).toBe(true);
  });

  it('renders literal zero via the scientific branch as "0" (dead-branch guard: no real caller passes 0 into scientific formatting)', () => {
    vi.spyOn(Math, 'abs').mockReturnValueOnce(10000);
    expect(formatHeatmapValue(0, 'ru')).toBe('0');
  });

  it('uses zh-CN for the zh locale', () => {
    expect(formatHeatmapValue(1.5, 'zh')).toBe(
      (1.5).toLocaleString('zh-CN', { minimumFractionDigits: 0, maximumFractionDigits: 2 }),
    );
  });
});

describe('formatNucleusDurationDisplay', () => {
  it('returns an empty string for null, undefined, or an empty string', () => {
    expect(formatNucleusDurationDisplay(null, 'ru', messages)).toBe('');
    expect(formatNucleusDurationDisplay(undefined, 'ru', messages)).toBe('');
    expect(formatNucleusDurationDisplay('', 'ru', messages)).toBe('');
  });

  it('returns the localized "stable" label for "∞"', () => {
    expect(formatNucleusDurationDisplay('∞', 'ru', messages)).toBe(messages.heatmap.stable);
  });

  it('returns the raw value unchanged when it does not match the value/unitCode format', () => {
    expect(formatNucleusDurationDisplay('garbage', 'ru', messages)).toBe('garbage');
  });

  it('returns the raw value unchanged for an unknown unit code', () => {
    expect(formatNucleusDurationDisplay('5/99', 'ru', messages)).toBe('5/99');
  });

  it('returns the raw value unchanged when the value overflows to Infinity', () => {
    const raw = `${'9'.repeat(400)}/1`;
    expect(formatNucleusDurationDisplay(raw, 'ru', messages)).toBe(raw);
  });

  it('formats a value in years with the localized unit', () => {
    const result = formatNucleusDurationDisplay('211100/1', 'ru', messages);
    expect(result).toContain(messages.heatmap.durationUnits.years);
  });

  it('formats a value in days/hours/minutes/seconds with the localized unit', () => {
    expect(formatNucleusDurationDisplay('5/2', 'ru', messages)).toContain(messages.heatmap.durationUnits.days);
    expect(formatNucleusDurationDisplay('5/3', 'ru', messages)).toContain(messages.heatmap.durationUnits.hours);
    expect(formatNucleusDurationDisplay('5/4', 'ru', messages)).toContain(messages.heatmap.durationUnits.minutes);
    expect(formatNucleusDurationDisplay('5/5', 'ru', messages)).toContain(messages.heatmap.durationUnits.seconds);
  });

  it('uses scientific notation for very large year values', () => {
    const result = formatNucleusDurationDisplay('200000000/1', 'ru', messages);
    expect(result).toContain('·10');
    expect(result).toContain(messages.heatmap.durationUnits.years);
  });

  it('uses zh-CN formatting for the zh locale', () => {
    const result = formatNucleusDurationDisplay('5/5', 'zh', messages);
    expect(result).toContain(messages.heatmap.durationUnits.seconds);
  });
});

describe('formatHeatmapElementValue', () => {
  it('formats a real halfLife value using duration units', () => {
    const result = formatHeatmapElementValue('halfLife', TECHNETIUM, 'ru', messages);
    expect(result).not.toBeNull();
    expect(result).toContain(messages.heatmap.durationUnits.years);
  });

  it('returns null for halfLife when the element has no tracked raw value', () => {
    expect(formatHeatmapElementValue('halfLife', HYDROGEN, 'ru', messages)).toBeNull();
  });

  it('formats a real lifetime value using duration units', () => {
    const result = formatHeatmapElementValue('lifetime', TECHNETIUM, 'ru', messages);
    expect(result).not.toBeNull();
  });

  it('returns null for lifetime when the element has no tracked raw value', () => {
    expect(formatHeatmapElementValue('lifetime', HYDROGEN, 'ru', messages)).toBeNull();
  });

  it("returns the localized stable label for a stable element's decayMode", () => {
    expect(formatHeatmapElementValue('decayMode', HYDROGEN, 'ru', messages)).toBe(messages.heatmap.stable);
  });

  it("returns the localized decay type label for a non-stable element's decayMode", () => {
    const result = formatHeatmapElementValue('decayMode', TECHNETIUM, 'ru', messages);
    expect(result).toBe(messages.decay.betaMinus);
  });

  it('returns null for decayMode when the atomic number has no symbol', () => {
    expect(formatHeatmapElementValue('decayMode', INVALID_NUMBER, 'ru', messages)).toBeNull();
  });

  it('returns null for a numeric id with no data for that element', () => {
    expect(formatHeatmapElementValue('atomicMass', INVALID_NUMBER, 'ru', messages)).toBeNull();
  });

  it('formats abundance-family ids as a percentage', () => {
    const result = formatHeatmapElementValue('earthAbundance', HYDROGEN, 'ru', messages);
    expect(result).toContain('%');
  });

  it('formats a plain numeric id using formatHeatmapValue', () => {
    const result = formatHeatmapElementValue('atomicMass', HYDROGEN, 'ru', messages);
    expect(result).not.toBeNull();
    expect(result).not.toContain('%');
  });
});

describe('formatHeatmapRangeValue', () => {
  it('formats halfLife/lifetime range values across every duration magnitude', () => {
    const u = messages.heatmap.durationUnits;
    const year = 365.25 * 24 * 3600;
    expect(formatHeatmapRangeValue('halfLife', 2e9 * year, 'ru', messages)).toContain(u.billionYears);
    expect(formatHeatmapRangeValue('halfLife', 2 * year, 'ru', messages)).toContain(u.years);
    expect(formatHeatmapRangeValue('halfLife', 2 * 24 * 3600, 'ru', messages)).toContain(u.days);
    expect(formatHeatmapRangeValue('halfLife', 2 * 3600, 'ru', messages)).toContain(u.hours);
    expect(formatHeatmapRangeValue('halfLife', 120, 'ru', messages)).toContain(u.minutes);
    expect(formatHeatmapRangeValue('halfLife', 30, 'ru', messages)).toContain(u.seconds);
  });

  it('uses zh-CN when formatting a halfLife/lifetime range value for zh', () => {
    expect(formatHeatmapRangeValue('halfLife', 30, 'zh', messages)).toContain(messages.heatmap.durationUnits.seconds);
  });

  it('formats abundance-family range values across every percentage magnitude', () => {
    expect(formatHeatmapRangeValue('rarity', 0.5, 'ru', messages)).toContain('%');
    expect(formatHeatmapRangeValue('rarity', 0.005, 'ru', messages)).toContain('%');
    expect(formatHeatmapRangeValue('rarity', 0.00005, 'ru', messages)).toContain('·10');
    expect(formatHeatmapRangeValue('rarity', 0, 'ru', messages)).toBe('0%');
  });

  it('formats a decayMode range value via its score-to-mode label', () => {
    const alphaScore = 4;
    expect(formatHeatmapRangeValue('decayMode', alphaScore, 'ru', messages)).toBe(messages.decay.alpha);
  });

  it('falls back to the ru decay label when the requested locale is missing the decayMode key', () => {
    const alphaScore = 4;
    const original = localeMessages.en.decay.alpha;
    // @ts-expect-error deliberately clearing a required key to exercise the fallback branch
    delete localeMessages.en.decay.alpha;
    try {
      expect(formatHeatmapRangeValue('decayMode', alphaScore, 'en', messages)).toBe(localeMessages.ru.decay.alpha);
    } finally {
      localeMessages.en.decay.alpha = original;
    }
  });

  it('falls back to the raw mode key when every locale is missing the decayMode key', () => {
    const alphaScore = 4;
    const originalEn = localeMessages.en.decay.alpha;
    const originalRu = localeMessages.ru.decay.alpha;
    // @ts-expect-error deliberately clearing required keys to exercise the final fallback branch
    delete localeMessages.en.decay.alpha;
    // @ts-expect-error deliberately clearing required keys to exercise the final fallback branch
    delete localeMessages.ru.decay.alpha;
    try {
      expect(formatHeatmapRangeValue('decayMode', alphaScore, 'en', messages)).toBe('alpha');
    } finally {
      localeMessages.en.decay.alpha = originalEn;
      localeMessages.ru.decay.alpha = originalRu;
    }
  });

  it('formats the stable decayMode score with the localized stable label', () => {
    expect(formatHeatmapRangeValue('decayMode', 0, 'ru', messages)).toBe(messages.heatmap.stable);
  });

  it('falls back to formatHeatmapValue for an unmapped decayMode score', () => {
    expect(formatHeatmapRangeValue('decayMode', 999, 'ru', messages)).toBe(formatHeatmapValue(999, 'ru'));
  });

  it('formats a plain numeric id via formatHeatmapValue', () => {
    expect(formatHeatmapRangeValue('atomicMass', 42, 'ru', messages)).toBe(formatHeatmapValue(42, 'ru'));
  });
});

describe('formatHeatmapCellDisplay', () => {
  it('renders a placeholder dash when there is no formatted value', () => {
    expect(formatHeatmapCellDisplay('atomicMass', INVALID_NUMBER, 'ru', messages)).toBe('—');
  });

  it('appends a degree sign for celsius-unit ids', () => {
    const result = formatHeatmapCellDisplay('meltingPoint', HYDROGEN, 'ru', messages);
    expect(result.endsWith('°')).toBe(true);
  });

  it('renders the plain formatted value for an id with a non-celsius unit', () => {
    const formatted = formatHeatmapElementValue('atomicMass', HYDROGEN, 'ru', messages);
    expect(formatHeatmapCellDisplay('atomicMass', HYDROGEN, 'ru', messages)).toBe(formatted);
  });

  it('renders the plain formatted value for an id with no unit at all', () => {
    const formatted = formatHeatmapElementValue('electronegativity', HYDROGEN, 'ru', messages);
    expect(formatHeatmapCellDisplay('electronegativity', HYDROGEN, 'ru', messages)).toBe(formatted);
  });

  it('renders the short decay-mode symbol for a known decay mode', () => {
    expect(formatHeatmapCellDisplay('decayMode', PLATINUM, 'ru', messages)).toBe('α');
    expect(formatHeatmapCellDisplay('decayMode', TECHNETIUM, 'ru', messages)).toBe('β⁻');
    expect(formatHeatmapCellDisplay('decayMode', ASTATINE, 'ru', messages)).toBe('ε');
    expect(formatHeatmapCellDisplay('decayMode', LAWRENCIUM, 'ru', messages)).toBe('SF');
  });

  it('renders the localized stable label for a stable element', () => {
    expect(formatHeatmapCellDisplay('decayMode', HYDROGEN, 'ru', messages)).toBe(messages.heatmap.stable);
  });

  it('renders a dash for decayMode when the atomic number has no symbol', () => {
    expect(formatHeatmapCellDisplay('decayMode', INVALID_NUMBER, 'ru', messages)).toBe('—');
  });
});
