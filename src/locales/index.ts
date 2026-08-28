import { computed, inject, ref, watch, type App, type InjectionKey } from 'vue';
import { collectionName as collectionNameConfig } from '../data/collection';
import { getSymbolByNumber } from '../utils/element/lookup';
import { resolveLocalizedLabel } from '../utils/localizedLabel';
import { readStorage, writeStorage } from '../utils/storage';
import {
  detectLocale,
  formatMass as formatMassFor,
  isLocale,
  resolveElementName,
  resolveLegendLabel,
} from '../utils/locale';
import ru from './lang/ru';
import en from './lang/en';
import zh from './lang/zh';
import type { Locale, LocaleMessages } from './types';

const STORAGE_KEY = 'periodic-table-locale';

export const localeMessages: Record<Locale, LocaleMessages> = { ru, en, zh };

export const localeOptions: { value: Locale; label: string }[] = [
  { value: 'ru', label: 'Рус' },
  { value: 'en', label: 'EN' },
  { value: 'zh', label: '中文' },
];

type SidebarStringKey = {
  [K in keyof LocaleMessages['sidebar']]: LocaleMessages['sidebar'][K] extends string ? K : never;
}[keyof LocaleMessages['sidebar']];

type LocaleContext = ReturnType<typeof createLocale>;

const localeKey: InjectionKey<LocaleContext> = Symbol('locale');

function readStoredLocale(): Locale | null {
  return readStorage(localStorage, STORAGE_KEY, isLocale);
}

function persistLocale(value: Locale): void {
  writeStorage(localStorage, STORAGE_KEY, value);
}

function createLocale() {
  const locale = ref<Locale>(detectLocale(readStoredLocale(), navigator.language));
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
    return resolveLegendLabel(messages.value, id);
  }

  function tCategories(key: keyof LocaleMessages['categories']) {
    return messages.value.categories[key];
  }

  function tSidebar(key: SidebarStringKey) {
    return messages.value.sidebar[key];
  }

  function tElement(number: number) {
    return resolveElementName(messages.value, getSymbolByNumber(number));
  }

  function formatMass(mass: string) {
    return formatMassFor(locale.value, mass);
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
  // Explicit null default suppresses Vue's own "injection not found" warning - the check right
  // below already throws a clearer, purpose-specific error for the same condition.
  const locale = inject(localeKey, null);
  if (!locale) throw new Error('useLocale must be used within locale provider');
  return locale;
}
