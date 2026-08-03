import type { LocalizedLabel } from '../utils/localizedLabel'

export interface ElementCollectionDecayParent {
  /** Символ родительского элемента, напр. "Ra" */
  symbol: string
  /** Массовое число изотопа родителя, напр. "226" */
  isotope: string
  /** Форма родителя в том же образце, напр. «Порошок» */
  sampleState?: string | null
}

export interface ElementCollection {
  /** Состояние или форма материала внутри (газ, бисер, электроды…); ключ из sampleStateLabels */
  sampleState?: string | null
  /**
   * Готовое описание образца, если его не свести к обычному sampleState
   * (напр. «Стрелки часов со светосоставом»). Перекрывает sampleState.
   */
  description?: LocalizedLabel | null
  /** Ёмкость или оформление (ампула, коробка…); пусто — образец без отдельного контейнера */
  container?: string | null
  /** Массовое число изотопа, напр. "226" → ²²⁶Ra */
  isotope?: string | null
  purity?: string | null
  /**
   * Родитель в цепочке распада: элемент не хранится отдельно, а постоянно
   * образуется в образце (напр. ²²²Rn от ²²⁶Ra в запаянной ампуле).
   */
  decayParent?: ElementCollectionDecayParent | null
  /** Первичный / Вторичный — для радиоактивных образцов в коллекции */
  sourceType?: string | null
  /** ID γ-спектра из data/spectra/, напр. "th-90-wt20" */
  spectrum?: string | null
  /** Имя файла для скачивания XML со спектром */
  spectrumFilename?: LocalizedLabel | null
}

export interface Element {
  number: number
  symbol: string
  name: string
  mass: string
  group: number | null
  oldGroup: string
  color: string
  category: string
  row: number
  col: number
  periodEnd: boolean
  inCollection: boolean
  collection?: ElementCollection | null
}

export interface LegendItem {
  id: string
  color: string
}
