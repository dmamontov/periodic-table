import type { LegendKey, Locale, LocaleMessages } from '../locales/types';

export function isLocale(value: string): value is Locale {
  return value === 'ru' || value === 'en' || value === 'zh';
}

export function detectLocale(storedValue: Locale | null, navigatorLanguage: string): Locale {
  if (storedValue) return storedValue;

  const lang = navigatorLanguage.toLowerCase();
  if (lang.startsWith('zh')) return 'zh';
  if (lang.startsWith('ru')) return 'ru';
  return 'en';
}

export function formatMass(locale: Locale, mass: string): string {
  return locale === 'ru' ? mass : mass.replace(',', '.');
}

const LEGEND_KEY_BY_ID: Record<string, LegendKey> = {
  alkali: 'alkali',
  'alkaline-earth': 'alkalineEarth',
  transition: 'transition',
  'post-transition': 'postTransition',
  metalloid: 'metalloid',
  nonmetal: 'nonmetal',
  halogen: 'halogen',
  'noble-gas': 'nobleGas',
  lanthanides: 'lanthanides',
  actinides: 'actinides',
};

export function resolveLegendLabel(messages: LocaleMessages, id: string): string {
  const key = LEGEND_KEY_BY_ID[id];
  return key ? messages.legend[key] : id;
}

export function resolveElementName(messages: LocaleMessages, symbol: string | null): string {
  return (symbol && messages.elements[symbol]) ?? '';
}
