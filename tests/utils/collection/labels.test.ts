import { describe, expect, it } from 'vitest';
import {
  formatCollectionAcquiredDate,
  formatCollectionManufactureDate,
  formatCollectionPurity,
  formatCollectionSampleLabel,
  formatCollectionWeight,
  resolveCollectionLabel,
  resolveCollectionSampleState,
  resolvePhysicalStateLabel,
  resolveSourceType,
} from '../../../src/utils/collection/labels';
import { sampleStateLabels } from '../../../src/locales/collection';
import { localeMessages } from '../../../src/locales';
import { resolveLocalizedLabel } from '../../../src/utils/localizedLabel';

const gasRu = resolveLocalizedLabel(sampleStateLabels.gas, 'ru');
const gasEn = resolveLocalizedLabel(sampleStateLabels.gas, 'en');

describe('resolveCollectionLabel', () => {
  it('returns an empty string for a missing key', () => {
    expect(resolveCollectionLabel('ru', 'sampleStates', null)).toBe('');
    expect(resolveCollectionLabel('ru', 'sampleStates', undefined)).toBe('');
    expect(resolveCollectionLabel('ru', 'sampleStates', '')).toBe('');
  });

  it('resolves a known key to its localized label', () => {
    expect(resolveCollectionLabel('ru', 'sampleStates', 'gas')).toBe(gasRu);
    expect(resolveCollectionLabel('en', 'sampleStates', 'gas')).toBe(gasEn);
  });

  it('returns the raw key when it has no entry in the dictionary', () => {
    expect(resolveCollectionLabel('ru', 'sampleStates', 'notARealKey')).toBe('notARealKey');
  });
});

describe('resolveSourceType', () => {
  it('returns an empty string for a missing key', () => {
    expect(resolveSourceType('ru', null)).toBe('');
    expect(resolveSourceType('ru', undefined)).toBe('');
  });

  it('resolves a known source type', () => {
    expect(resolveSourceType('ru', 'primary')).toBe(localeMessages.ru.sidebar.sourceTypes.primary);
    expect(resolveSourceType('ru', 'secondary')).toBe(localeMessages.ru.sidebar.sourceTypes.secondary);
  });

  it('returns the raw key when unrecognized', () => {
    expect(resolveSourceType('ru', 'tertiary')).toBe('tertiary');
  });
});

describe('resolvePhysicalStateLabel', () => {
  it('returns an empty string for a missing physical object', () => {
    expect(resolvePhysicalStateLabel(null, 'ru')).toBe('');
    expect(resolvePhysicalStateLabel(undefined, 'ru')).toBe('');
  });

  it('prefers description over sampleState when present', () => {
    expect(resolvePhysicalStateLabel({ description: 'Custom description', sampleState: 'gas' }, 'ru')).toBe(
      'Custom description',
    );
  });

  it('falls back to the sampleState label when there is no description', () => {
    expect(resolvePhysicalStateLabel({ sampleState: 'gas' }, 'ru')).toBe(gasRu);
  });
});

describe('resolveCollectionSampleState', () => {
  it('resolves via the entry physical field', () => {
    expect(resolveCollectionSampleState('ru', { physical: { sampleState: 'gas' } })).toBe(gasRu);
  });

  it('returns an empty string when the entry itself is missing', () => {
    expect(resolveCollectionSampleState('ru', null)).toBe('');
    expect(resolveCollectionSampleState('ru', undefined)).toBe('');
  });
});

describe('formatCollectionSampleLabel', () => {
  it('returns an empty string when there is no state label', () => {
    expect(formatCollectionSampleLabel(null, 'ru')).toBe('');
    expect(formatCollectionSampleLabel({}, 'ru')).toBe('');
  });

  it('appends the manufacture date in parentheses when known', () => {
    const label = formatCollectionSampleLabel({ sampleState: 'gas', manufactureDate: '2021' }, 'ru');
    expect(label).toBe(`${gasRu} (2021)`);
  });

  it('omits the parentheses when there is no manufacture date', () => {
    const label = formatCollectionSampleLabel({ sampleState: 'gas' }, 'ru');
    expect(label).toBe(gasRu);
  });
});

describe('formatCollectionPurity', () => {
  it('returns an empty string for a missing purity', () => {
    expect(formatCollectionPurity(null)).toBe('');
    expect(formatCollectionPurity(undefined)).toBe('');
  });

  it('formats a 3+ digit value with a decimal comma', () => {
    expect(formatCollectionPurity({ value: 999 })).toBe('99,9%');
    expect(formatCollectionPurity({ value: 9999 })).toBe('99,99%');
  });

  it('formats a sub-3-digit value as a literal percentage', () => {
    expect(formatCollectionPurity({ value: 50 })).toBe('50%');
  });

  it('prefixes an approximate purity with a tilde', () => {
    expect(formatCollectionPurity({ value: 999, approx: true })).toBe('~99,9%');
  });
});

describe('formatCollectionAcquiredDate', () => {
  it('returns an empty string for a missing value', () => {
    expect(formatCollectionAcquiredDate(null, 'ru')).toBe('');
    expect(formatCollectionAcquiredDate(undefined, 'ru')).toBe('');
    expect(formatCollectionAcquiredDate('', 'ru')).toBe('');
  });

  it('returns the raw value when it does not parse as a date', () => {
    expect(formatCollectionAcquiredDate('not-a-date', 'ru')).toBe('not-a-date');
  });

  it('formats a valid date using the ru locale', () => {
    const formatted = formatCollectionAcquiredDate('2021-05-01', 'ru');
    expect(formatted).toBe(
      new Date('2021-05-01T00:00:00').toLocaleDateString('ru', { day: 'numeric', month: 'long', year: 'numeric' }),
    );
  });

  it('uses zh-CN for the zh locale', () => {
    const formatted = formatCollectionAcquiredDate('2021-05-01', 'zh');
    expect(formatted).toBe(
      new Date('2021-05-01T00:00:00').toLocaleDateString('zh-CN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
    );
  });
});

describe('formatCollectionManufactureDate', () => {
  it('returns an empty string for a missing value', () => {
    expect(formatCollectionManufactureDate(null, 'ru')).toBe('');
    expect(formatCollectionManufactureDate(undefined, 'ru')).toBe('');
    expect(formatCollectionManufactureDate('', 'ru')).toBe('');
  });

  it('returns a bare 4-digit year unchanged', () => {
    expect(formatCollectionManufactureDate('2021', 'ru')).toBe('2021');
  });

  it('formats a year-month value', () => {
    const formatted = formatCollectionManufactureDate('2021-07', 'ru');
    expect(formatted).toBe(
      new Date('2021-07-01T00:00:00').toLocaleDateString('ru', { month: 'long', year: 'numeric' }),
    );
  });

  it('returns the raw year-month value when it does not parse as a date', () => {
    expect(formatCollectionManufactureDate('2021-99', 'ru')).toBe('2021-99');
  });

  it('formats a full date value', () => {
    const formatted = formatCollectionManufactureDate('2021-07-31', 'ru');
    expect(formatted).toBe(
      new Date('2021-07-31T00:00:00').toLocaleDateString('ru', { day: 'numeric', month: 'long', year: 'numeric' }),
    );
  });

  it('returns the raw full-date value when it does not parse as a date', () => {
    expect(formatCollectionManufactureDate('2021-07-99', 'ru')).toBe('2021-07-99');
  });

  it('uses zh-CN for the zh locale', () => {
    const formatted = formatCollectionManufactureDate('2021-07', 'zh');
    expect(formatted).toBe(
      new Date('2021-07-01T00:00:00').toLocaleDateString('zh-CN', { month: 'long', year: 'numeric' }),
    );
  });

  it('formats a range with both ends known', () => {
    expect(formatCollectionManufactureDate({ from: '1950', to: '1960' }, 'ru')).toBe('1950 – 1960');
  });

  it('formats a range with only the start known', () => {
    expect(formatCollectionManufactureDate({ from: '1938' }, 'ru')).toBe('1938 –');
  });

  it('formats a range with only the end known', () => {
    expect(formatCollectionManufactureDate({ to: '1962' }, 'ru')).toBe('– 1962');
  });

  it('returns an empty string for a range with neither end known', () => {
    expect(formatCollectionManufactureDate({}, 'ru')).toBe('');
  });
});

describe('formatCollectionWeight', () => {
  it('returns an empty string for a missing weight', () => {
    expect(formatCollectionWeight(null, 'мг', 'г')).toBe('');
    expect(formatCollectionWeight(undefined, 'мг', 'г')).toBe('');
  });

  it('renders sub-gram weights in milligrams', () => {
    expect(formatCollectionWeight({ mg: 60 }, 'мг', 'г')).toBe('60 мг');
  });

  it('renders gram-scale weights in grams, trimming trailing zeros', () => {
    expect(formatCollectionWeight({ mg: 1850 }, 'мг', 'г')).toBe('1.85 г');
    expect(formatCollectionWeight({ mg: 5000 }, 'мг', 'г')).toBe('5 г');
    expect(formatCollectionWeight({ mg: 2500 }, 'мг', 'г')).toBe('2.5 г');
  });

  it('prefixes an approximate weight with a tilde', () => {
    expect(formatCollectionWeight({ mg: 60, approx: true }, 'мг', 'г')).toBe('~60 мг');
    expect(formatCollectionWeight({ mg: 1850, approx: true }, 'мг', 'г')).toBe('~1.85 г');
  });
});
