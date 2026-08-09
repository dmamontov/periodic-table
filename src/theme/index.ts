import {
  computed,
  inject,
  ref,
  watch,
  type App,
  type InjectionKey,
} from 'vue'
import { readStorage, writeStorage } from '../utils/storage'

export type ThemePreference = 'light' | 'dark' | 'auto'
export type ResolvedTheme = 'light' | 'dark'

const STORAGE_KEY = 'periodic-table-theme'

export const themeOptions: { value: ThemePreference }[] = [
  { value: 'light' },
  { value: 'dark' },
  { value: 'auto' },
]

type ThemeContext = ReturnType<typeof createTheme>

const themeKey: InjectionKey<ThemeContext> = Symbol('theme')

function isThemePreference(value: string): value is ThemePreference {
  return value === 'light' || value === 'dark' || value === 'auto'
}

function readStoredTheme(): ThemePreference | null {
  return readStorage(localStorage, STORAGE_KEY, isThemePreference)
}

function persistTheme(value: ThemePreference): void {
  writeStorage(localStorage, STORAGE_KEY, value)
}

function resolveTheme(preference: ThemePreference): ResolvedTheme {
  if (preference === 'auto') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }
  return preference
}

function detectThemePreference(): ThemePreference {
  return readStoredTheme() ?? 'auto'
}

function applyTheme(resolved: ResolvedTheme): void {
  document.documentElement.dataset.theme = resolved
  document.documentElement.style.colorScheme = resolved

  const meta = document.querySelector('meta[name="theme-color"]')
  if (meta) {
    meta.setAttribute('content', resolved === 'dark' ? '#1a1a1a' : '#ffffff')
  }
}

function createTheme() {
  const theme = ref<ThemePreference>(detectThemePreference())
  const resolvedTheme = computed(() => resolveTheme(theme.value))

  watch(
    resolvedTheme,
    (value) => {
      applyTheme(value)
    },
    { immediate: true },
  )

  watch(theme, (value) => {
    persistTheme(value)
  })

  if (typeof window !== 'undefined') {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      if (theme.value === 'auto') {
        applyTheme(resolveTheme('auto'))
      }
    })
  }

  function setTheme(next: ThemePreference) {
    theme.value = next
  }

  return { theme, resolvedTheme, setTheme }
}

export function installTheme(app: App) {
  const theme = createTheme()
  app.provide(themeKey, theme)
  return theme
}

export function useTheme() {
  const theme = inject(themeKey)
  if (!theme) throw new Error('useTheme must be used within theme provider')
  return theme
}
