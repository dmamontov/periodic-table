import { containerLabels, sampleStateLabels } from '../../locales/collection'
import { resolveLocalizedLabel } from '../localizedLabel'
import { localeMessages } from '../../locales'
import type { Locale } from '../../locales/types'
import type { ElementCollection } from '../../types/collection/collection'

const DICTS = {
  sampleStates: sampleStateLabels,
  containers: containerLabels,
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

export function resolveCollectionSampleState(
  locale: Locale,
  entry: ElementCollection | null | undefined,
): string {
  const physical = entry?.physical
  if (!physical) return ''
  if (physical.description) return resolveLocalizedLabel(physical.description, locale)
  return resolveCollectionLabel(locale, 'sampleStates', physical.sampleState)
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
