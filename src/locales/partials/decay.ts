import type { Locale } from '../types'

export type DecayModeKey =
  | 'stable'
  | 'alpha'
  | 'betaMinus'
  | 'betaPlus'
  | 'electronCapture'
  | 'spontaneousFission'
  | 'alphaBeta'
  | 'isomeric'

export const decayLabels: Record<Locale, Record<DecayModeKey, string>> = {
  ru: {
    stable: 'Стабилен',
    alpha: 'α-распад',
    betaMinus: 'β⁻-распад',
    betaPlus: 'β⁺-распад',
    electronCapture: 'Захват электрона',
    spontaneousFission: 'Спонтанное деление',
    alphaBeta: 'α- и β-распад',
    isomeric: 'Изомерный переход',
  },
  en: {
    stable: 'Stable',
    alpha: 'Alpha decay',
    betaMinus: 'Beta⁻ decay',
    betaPlus: 'Beta⁺ decay',
    electronCapture: 'Electron capture',
    spontaneousFission: 'Spontaneous fission',
    alphaBeta: 'Alpha and beta decay',
    isomeric: 'Isomeric transition',
  },
  zh: {
    stable: '稳定',
    alpha: 'α衰变',
    betaMinus: 'β⁻衰变',
    betaPlus: 'β⁺衰变',
    electronCapture: '电子俘获',
    spontaneousFission: '自发裂变',
    alphaBeta: 'α和β衰变',
    isomeric: '同质异能跃迁',
  },
}
