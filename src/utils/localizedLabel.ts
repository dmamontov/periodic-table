import type { Locale } from '../locales/types'

/**
 * A label that's either the same text for every UI language (plain string —
 * the simplest option when you don't care about translating it), or spelled
 * out per locale.
 */
export type LocalizedLabel = string | Partial<Record<Locale, string>>

export function resolveLocalizedLabel(
  label: LocalizedLabel | null | undefined,
  locale: Locale,
): string {
  if (!label) return ''
  if (typeof label === 'string') return label
  return label[locale] ?? label.ru ?? label.en ?? label.zh ?? ''
}
