import { computed, inject, ref, watch, type App, type InjectionKey } from 'vue';
import { readStorage, writeStorage } from '../utils/storage';
import { applyTheme, detectThemePreference, isThemePreference, resolveTheme } from '../utils/theme';
import type { ThemePreference } from '../utils/theme';

export type { ThemePreference, ResolvedTheme } from '../utils/theme';

const STORAGE_KEY = 'periodic-table-theme';

export const themeOptions: { value: ThemePreference }[] = [{ value: 'light' }, { value: 'dark' }, { value: 'auto' }];

type ThemeContext = ReturnType<typeof createTheme>;

const themeKey: InjectionKey<ThemeContext> = Symbol('theme');

function readStoredTheme(): ThemePreference | null {
  return readStorage(localStorage, STORAGE_KEY, isThemePreference);
}

function persistTheme(value: ThemePreference): void {
  writeStorage(localStorage, STORAGE_KEY, value);
}

function createTheme() {
  const theme = ref<ThemePreference>(detectThemePreference(readStoredTheme()));
  const resolvedTheme = computed(() => resolveTheme(theme.value));

  watch(
    resolvedTheme,
    (value) => {
      applyTheme(value);
    },
    { immediate: true },
  );

  watch(theme, (value) => {
    persistTheme(value);
  });

  // No SSR entry point in this app - createTheme() only ever runs in a real browser (or jsdom in tests).
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (theme.value === 'auto') {
      applyTheme(resolveTheme('auto'));
    }
  });

  function setTheme(next: ThemePreference) {
    theme.value = next;
  }

  return { theme, resolvedTheme, setTheme };
}

export function installTheme(app: App) {
  const theme = createTheme();
  app.provide(themeKey, theme);
  return theme;
}

export function useTheme() {
  const theme = inject(themeKey);
  if (!theme) throw new Error('useTheme must be used within theme provider');
  return theme;
}
