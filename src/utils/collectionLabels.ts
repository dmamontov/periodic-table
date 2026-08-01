import { collectionLabels } from '../locales/partials/collection'
import type { Locale } from '../locales/types'

type CollectionDictGroup = 'sampleStates' | 'containers' | 'sourceTypes' | 'samples'

export function resolveCollectionLabel(
  locale: Locale,
  group: CollectionDictGroup,
  key: string | null | undefined,
): string {
  if (!key) return ''
  const dict = collectionLabels[locale][group]
  return dict[key] ?? collectionLabels.ru[group][key] ?? key
}

export function resolveCollectionSampleState(locale: Locale, key: string | null | undefined): string {
  if (!key) return ''
  if (key in collectionLabels[locale].samples) {
    return resolveCollectionLabel(locale, 'samples', key)
  }
  return resolveCollectionLabel(locale, 'sampleStates', key)
}

/** 999 → 99,9%; 6N → 99,9999%; ~999 → ~99,9%; значения с % возвращаются как есть */
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
