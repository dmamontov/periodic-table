import { computed, inject, ref, watch, type App, type InjectionKey } from 'vue';
import { collectionName as collectionNameConfig } from '../data/collection';
import { getSymbolByNumber } from '../data';
import { resolveLocalizedLabel } from '../utils/localizedLabel';
import { readStorage, writeStorage } from '../utils/storage';
import ru from './lang/ru';
import en from './lang/en';
import zh from './lang/zh';
import type { LegendKey, Locale, LocaleMessages } from './types';

const STORAGE_KEY = 'periodic-table-locale';

export const localeMessages: Record<Locale, LocaleMessages> = { ru, en, zh };

export const localeOptions: { value: Locale; label: string }[] = [
  { value: 'ru', label: 'Рус' },
  { value: 'en', label: 'EN' },
  { value: 'zh', label: '中文' },
];

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

type SidebarStringKey = {
  [K in keyof LocaleMessages['sidebar']]: LocaleMessages['sidebar'][K] extends string ? K : never;
}[keyof LocaleMessages['sidebar']];

type LocaleContext = ReturnType<typeof createLocale>;

const localeKey: InjectionKey<LocaleContext> = Symbol('locale');

function isLocale(value: string): value is Locale {
  return value === 'ru' || value === 'en' || value === 'zh';
}

function readStoredLocale(): Locale | null {
  return readStorage(localStorage, STORAGE_KEY, isLocale);
}

function persistLocale(value: Locale): void {
  writeStorage(localStorage, STORAGE_KEY, value);
}

function detectLocale(): Locale {
  const stored = readStoredLocale();
  if (stored) return stored;

  const lang = navigator.language.toLowerCase();
  if (lang.startsWith('zh')) return 'zh';
  if (lang.startsWith('ru')) return 'ru';
  return 'en';
}

function createLocale() {
  const locale = ref<Locale>(detectLocale());
  const messages = computed(() => localeMessages[locale.value]);

  watch(
    locale,
    (value) => {
      persistLocale(value);
      document.documentElement.lang = value === 'zh' ? 'zh-CN' : value;
    },
    { immediate: true },
  );

  function setLocale(next: Locale) {
    locale.value = next;
  }

  function tLegend(id: string) {
    const key = LEGEND_KEY_BY_ID[id];
    return key ? messages.value.legend[key] : id;
  }

  function tCategories(key: keyof LocaleMessages['categories']) {
    return messages.value.categories[key];
  }

  function tSidebar(key: SidebarStringKey) {
    return messages.value.sidebar[key];
  }

  function tElement(number: number) {
    const symbol = getSymbolByNumber(number);
    return (symbol && messages.value.elements[symbol]) ?? '';
  }

  function formatMass(mass: string) {
    return locale.value === 'ru' ? mass : mass.replace(',', '.');
  }

  const collectionName = computed(() => resolveLocalizedLabel(collectionNameConfig, locale.value));

  return {
    locale,
    messages,
    setLocale,
    tLegend,
    tCategories,
    tSidebar,
    tElement,
    formatMass,
    collectionName,
  };
}

export function installLocale(app: App) {
  const locale = createLocale();
  app.provide(localeKey, locale);
  return locale;
}

export function useLocale() {
  const locale = inject(localeKey);
  if (!locale) throw new Error('useLocale must be used within locale provider');
  return locale;
}
