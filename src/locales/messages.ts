import ru from './lang/ru'
import en from './lang/en'
import zh from './lang/zh'
import type { Locale, LocaleMessages } from './types'

export const localeMessages: Record<Locale, LocaleMessages> = { ru, en, zh }
