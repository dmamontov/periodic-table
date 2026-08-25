import { containerLabels, reasonLabels, sampleStateLabels } from '../../locales/collection';
import { resolveLocalizedLabel } from '../localizedLabel';
import { localeMessages } from '../../locales';
import type { Locale } from '../../locales/types';
import type {
  ElementCollection,
  ElementCollectionPhysical,
  ElementCollectionPurity,
  ElementCollectionWeight,
} from '../../types/collection/collection';

const DICTS = {
  sampleStates: sampleStateLabels,
  containers: containerLabels,
  reasons: reasonLabels,
};

export function resolveCollectionLabel(
  locale: Locale,
  group: keyof typeof DICTS,
  key: string | null | undefined,
): string {
  if (!key) return '';
  const label = DICTS[group][key];
  return label ? resolveLocalizedLabel(label, locale) : key;
}

export function resolveSourceType(locale: Locale, key: string | null | undefined): string {
  if (!key) return '';
  return localeMessages[locale].sidebar.sourceTypes[key as 'primary' | 'secondary'] ?? key;
}

/** Works for both the live ElementCollectionPhysical and a history entry's physical snapshot. */
export function resolvePhysicalStateLabel(
  physical: Pick<ElementCollectionPhysical, 'description' | 'sampleState'> | null | undefined,
  locale: Locale,
): string {
  if (!physical) return '';
  if (physical.description) return resolveLocalizedLabel(physical.description, locale);
  return resolveCollectionLabel(locale, 'sampleStates', physical.sampleState);
}

/** "What this sample is" + its manufacture date if known, e.g. "Источник из антистатической щётки Staticmaster (июль 1951 г.)". */
export function formatCollectionSampleLabel(
  physical: Pick<ElementCollectionPhysical, 'description' | 'sampleState' | 'manufactureDate'> | null | undefined,
  locale: Locale,
): string {
  const stateLabel = resolvePhysicalStateLabel(physical, locale);
  const dateLabel = formatCollectionManufactureDate(physical?.manufactureDate, locale);
  if (!stateLabel) return '';
  return dateLabel ? `${stateLabel} (${dateLabel})` : stateLabel;
}

export function resolveCollectionSampleState(locale: Locale, entry: ElementCollection | null | undefined): string {
  return resolvePhysicalStateLabel(entry?.physical, locale);
}

/** 999 → 99,9%; 50 → 50% (fewer than 3 digits is already a literal percentage) */
function formatPurityRaw(digits: string): string {
  if (digits.length >= 3) return `${digits.slice(0, 2)},${digits.slice(2)}%`;
  return `${digits}%`;
}

/** { value: 999 } → 99,9%; { value: 999, approx: true } → ~99,9% */
export function formatCollectionPurity(purity: ElementCollectionPurity | null | undefined): string {
  if (!purity) return '';
  return `${purity.approx ? '~' : ''}${formatPurityRaw(String(purity.value))}`;
}

/** '2021-05-01' → "1 мая 2021 г." (ru) / "May 1, 2021" (en) / "2021年5月1日" (zh) */
export function formatCollectionAcquiredDate(value: string | null | undefined, locale: Locale): string {
  if (!value) return '';
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleDateString(locale === 'zh' ? 'zh-CN' : locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

/** Variable-precision date: "2021" → "2021"; "2021-07" → "июль 2021 г." (ru); "2021-07-31" → "31 июля 2021 г." */
export function formatCollectionManufactureDate(value: string | null | undefined, locale: Locale): string {
  if (!value) return '';
  const intlLocale = locale === 'zh' ? 'zh-CN' : locale;

  if (/^\d{4}$/.test(value)) return value;

  if (/^\d{4}-\d{2}$/.test(value)) {
    const date = new Date(`${value}-01T00:00:00`);
    if (Number.isNaN(date.getTime())) return value;
    return date.toLocaleDateString(intlLocale, { month: 'long', year: 'numeric' });
  }

  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString(intlLocale, { day: 'numeric', month: 'long', year: 'numeric' });
}

/** { mg: 60 } → "60 мг"; { mg: 1850, approx: true } → "~1.85 г" — switches to grams at 1000 mg */
export function formatCollectionWeight(
  weight: ElementCollectionWeight | null | undefined,
  milligramUnit: string,
  gramUnit: string,
): string {
  if (!weight) return '';

  const prefix = weight.approx ? '~' : '';
  if (weight.mg < 1000) return `${prefix}${weight.mg} ${milligramUnit}`;

  const grams = (weight.mg / 1000).toFixed(2).replace(/\.?0+$/, '');
  return `${prefix}${grams} ${gramUnit}`;
}
