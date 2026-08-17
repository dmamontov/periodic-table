import { containerLabels, reasonLabels, sampleStateLabels } from '../../locales/collection'
import { resolveLocalizedLabel } from '../localizedLabel'
import { localeMessages } from '../../locales'
import type { Locale } from '../../locales/types'
import type { ElementCollection, ElementCollectionPhysical } from '../../types/collection/collection'

const DICTS = {
  sampleStates: sampleStateLabels,
  containers: containerLabels,
  reasons: reasonLabels,
}

export function resolveCollectionLabel(
  locale: Locale,
  group: keyof typeof DICTS,
  key: string | null | undefined,
): string {
  if (!key) return ''
  const label = DICTS[group][key]
  return label ? resolveLocalizedLabel(label, locale) : key
}

export function resolveSourceType(locale: Locale, key: string | null | undefined): string {
  if (!key) return ''
  return localeMessages[locale].sidebar.sourceTypes[key as 'primary' | 'secondary'] ?? key
}

/** Works for both the live ElementCollectionPhysical and a history entry's physical snapshot. */
export function resolvePhysicalStateLabel(
  physical: Pick<ElementCollectionPhysical, 'description' | 'sampleState'> | null | undefined,
  locale: Locale,
): string {
  if (!physical) return ''
  if (physical.description) return resolveLocalizedLabel(physical.description, locale)
  return resolveCollectionLabel(locale, 'sampleStates', physical.sampleState)
}

export function resolveCollectionSampleState(
  locale: Locale,
  entry: ElementCollection | null | undefined,
): string {
  return resolvePhysicalStateLabel(entry?.physical, locale)
}

/** 999 → 99,9%; 6N → 99,9999%; ~999 → ~99,9%; values that already contain % are returned as-is */
function formatPurityRaw(raw: string): string | null {
  const nMatch = raw.match(/^(\d+)N$/i)
  if (nMatch) {
    const n = Number(nMatch[1])
    if (n >= 3) return `99,${'9'.repeat(n - 2)}%`
    if (n === 2) return '99%'
    return null
  }

  if (/^\d{3,}$/.test(raw)) {
    return `${raw.slice(0, 2)},${raw.slice(2)}%`
  }

  if (/^\d+([.,]\d+)?$/.test(raw)) {
    return `${raw.replace('.', ',')}%`
  }

  return null
}

export function formatCollectionPurity(value: string | null | undefined): string {
  if (!value) return ''
  const trimmed = value.trim()
  if (!trimmed) return ''

  const approximate = trimmed.startsWith('~')
  const raw = approximate ? trimmed.slice(1).trim() : trimmed
  if (!raw) return trimmed
  if (raw.includes('%')) return trimmed

  const formatted = formatPurityRaw(raw)
  if (!formatted) return trimmed

  return approximate ? `~${formatted}` : formatted
}

/** '2021-05-01' → "1 мая 2021 г." (ru) / "May 1, 2021" (en) / "2021年5月1日" (zh) */
export function formatCollectionAcquiredDate(value: string | null | undefined, locale: Locale): string {
  if (!value) return ''
  const date = new Date(`${value}T00:00:00`)
  if (Number.isNaN(date.getTime())) return value

  return date.toLocaleDateString(locale === 'zh' ? 'zh-CN' : locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

/** 1.85 → 1.85 г; ~1.85 → ~1.85 г (approximate) */
export function formatCollectionWeight(value: string | null | undefined, gramUnit: string): string {
  if (!value) return ''
  const trimmed = value.trim()
  if (!trimmed) return ''

  const approximate = trimmed.startsWith('~')
  const raw = approximate ? trimmed.slice(1).trim() : trimmed
  if (!raw || Number.isNaN(Number(raw))) return trimmed

  return `${approximate ? '~' : ''}${raw} ${gramUnit}`
}
