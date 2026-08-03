import {
  computed,
  inject,
  ref,
  watch,
  type App,
  type InjectionKey,
} from 'vue'
import { localeMessages } from './messages'
import type { LegendKey, Locale, LocaleMessages } from './types'

const STORAGE_KEY = 'periodic-table-locale'

export { localeMessages }

export const localeOptions: { value: Locale; label: string }[] = [
  { value: 'ru', label: 'Рус' },
  { value: 'en', label: 'EN' },
  { value: 'zh', label: '中文' },
]

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
}

type SidebarStringKey = {
  [K in keyof LocaleMessages['sidebar']]: LocaleMessages['sidebar'][K] extends string ? K : never
}[keyof LocaleMessages['sidebar']]

type LocaleContext = ReturnType<typeof createLocale>


const localeKey: InjectionKey<LocaleContext> = Symbol('locale')

function readStoredLocale(): Locale | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'ru' || stored === 'en' || stored === 'zh') return stored
  } catch {
    // localStorage may be unavailable (private mode, blocked storage)
  }
  return null
}

function persistLocale(value: Locale): void {
  try {
    localStorage.setItem(STORAGE_KEY, value)
  } catch {
    // ignore write failures
  }
}

function detectLocale(): Locale {
  const stored = readStoredLocale()
  if (stored) return stored

  const lang = navigator.language.toLowerCase()
  if (lang.startsWith('zh')) return 'zh'
  if (lang.startsWith('ru')) return 'ru'
  return 'en'
}

function createLocale() {
  const locale = ref<Locale>(detectLocale())
  const messages = computed(() => localeMessages[locale.value])

  watch(
    locale,
    (value) => {
      persistLocale(value)
      document.documentElement.lang = value === 'zh' ? 'zh-CN' : value
    },
    { immediate: true },
  )

  function setLocale(next: Locale) {
    locale.value = next
  }

  function tLegend(id: string) {
    const key = LEGEND_KEY_BY_ID[id]
    return key ? messages.value.legend[key] : id
  }

  function tCategories(key: keyof LocaleMessages['categories']) {
    return messages.value.categories[key]
  }

  function tSidebar(key: SidebarStringKey) {
    return messages.value.sidebar[key]
  }

  function tElement(number: number) {
    return messages.value.elements[String(number)] ?? ''
  }

  function formatMass(mass: string) {
    return locale.value === 'ru' ? mass : mass.replace(',', '.')
  }

  return { locale, messages, setLocale, tLegend, tCategories, tSidebar, tElement, formatMass }
}

export function installLocale(app: App) {
  const locale = createLocale()
  app.provide(localeKey, locale)
  return locale
}

export function useLocale() {
  const locale = inject(localeKey)
  if (!locale) throw new Error('useLocale must be used within locale provider')
  return locale
}
