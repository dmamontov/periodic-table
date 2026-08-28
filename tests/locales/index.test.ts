import { afterEach, describe, expect, it, vi } from 'vitest';
import { nextTick } from 'vue';
import { withSetup } from '../helpers/withSetup';

// getSymbolByNumber (via tElement) and collectionName (via the collectionName computed) both come from
// src/utils/element/lookup / src/data/collection, which eagerly loads the real personal collection -
// mocked out here so this file never touches it. The ru/en/zh translation dictionaries are static,
// non-personal data and are used for real throughout.
vi.mock('../../src/utils/element/lookup', () => ({
  getSymbolByNumber: (number: number) => (number === 1 ? 'H' : number === 999 ? 'Xx' : null),
}));

vi.mock('../../src/data/collection', () => ({
  collectionName: { ru: 'Моя коллекция', en: 'My collection', zh: '我的收藏' },
}));

const { installLocale, useLocale, localeMessages } = await import('../../src/locales');

function setNavigatorLanguage(language: string) {
  Object.defineProperty(navigator, 'language', { value: language, configurable: true });
}

afterEach(() => {
  localStorage.clear();
  document.documentElement.lang = '';
});

describe('installLocale/useLocale', () => {
  it('detects zh from navigator.language when nothing is stored', () => {
    setNavigatorLanguage('zh-CN');
    const [locale, app] = withSetup(() => useLocale(), [installLocale]);
    expect(locale.locale.value).toBe('zh');
    expect(document.documentElement.lang).toBe('zh-CN');
    app.unmount();
  });

  it('detects ru from navigator.language', () => {
    setNavigatorLanguage('ru-RU');
    const [locale, app] = withSetup(() => useLocale(), [installLocale]);
    expect(locale.locale.value).toBe('ru');
    expect(document.documentElement.lang).toBe('ru');
    app.unmount();
  });

  it('falls back to en for any other navigator.language', () => {
    setNavigatorLanguage('fr-FR');
    const [locale, app] = withSetup(() => useLocale(), [installLocale]);
    expect(locale.locale.value).toBe('en');
    expect(document.documentElement.lang).toBe('en');
    app.unmount();
  });

  it('prefers a stored locale over navigator.language', () => {
    setNavigatorLanguage('fr-FR');
    localStorage.setItem('periodic-table-locale', 'zh');
    const [locale, app] = withSetup(() => useLocale(), [installLocale]);
    expect(locale.locale.value).toBe('zh');
    app.unmount();
  });

  it('ignores an invalid stored locale value', () => {
    setNavigatorLanguage('ru-RU');
    localStorage.setItem('periodic-table-locale', 'xx');
    const [locale, app] = withSetup(() => useLocale(), [installLocale]);
    expect(locale.locale.value).toBe('ru');
    app.unmount();
  });

  it('setLocale updates the ref, persists it, and updates document.lang (zh and non-zh)', async () => {
    setNavigatorLanguage('en-US');
    const [locale, app] = withSetup(() => useLocale(), [installLocale]);

    locale.setLocale('zh');
    expect(locale.locale.value).toBe('zh');
    await nextTick();
    expect(localStorage.getItem('periodic-table-locale')).toBe('zh');
    expect(document.documentElement.lang).toBe('zh-CN');

    locale.setLocale('ru');
    await nextTick();
    expect(localStorage.getItem('periodic-table-locale')).toBe('ru');
    expect(document.documentElement.lang).toBe('ru');

    app.unmount();
  });

  it('tLegend resolves a known category id and falls back to the raw id otherwise', () => {
    setNavigatorLanguage('en-US');
    const [locale, app] = withSetup(() => useLocale(), [installLocale]);

    expect(locale.tLegend('nonmetal')).toBe(localeMessages.en.legend.nonmetal);
    expect(locale.tLegend('unknown-category')).toBe('unknown-category');

    app.unmount();
  });

  it('tCategories and tSidebar read from the current locale messages', () => {
    setNavigatorLanguage('en-US');
    const [locale, app] = withSetup(() => useLocale(), [installLocale]);

    expect(locale.tSidebar('close')).toBe(localeMessages.en.sidebar.close);

    app.unmount();
  });

  it('tElement resolves a translated symbol, falls back to empty for an untranslated one, and for an unknown number', () => {
    setNavigatorLanguage('en-US');
    const [locale, app] = withSetup(() => useLocale(), [installLocale]);

    expect(locale.tElement(1)).toBe(localeMessages.en.elements.H);
    expect(locale.tElement(999)).toBe(''); // symbol resolves to 'Xx', untranslated
    expect(locale.tElement(-1)).toBe(''); // no matching symbol at all

    app.unmount();
  });

  it('formatMass keeps the comma in ru and replaces it with a dot elsewhere', () => {
    setNavigatorLanguage('ru-RU');
    const [locale, app] = withSetup(() => useLocale(), [installLocale]);
    expect(locale.formatMass('1,008')).toBe('1,008');

    locale.setLocale('en');
    expect(locale.formatMass('1,008')).toBe('1.008');

    app.unmount();
  });

  it('resolves collectionName from the configured LocalizedLabel', () => {
    setNavigatorLanguage('en-US');
    const [locale, app] = withSetup(() => useLocale(), [installLocale]);
    expect(locale.collectionName.value).toBe('My collection');
    app.unmount();
  });

  it('useLocale throws when used outside a locale provider', () => {
    expect(() => withSetup(() => useLocale())).toThrow('useLocale must be used within locale provider');
  });
});
