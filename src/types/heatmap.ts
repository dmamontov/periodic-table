import type { LocaleMessages } from '../locales/types'

export type HeatmapId =
  | 'electronegativity'
  | 'atomicRadius'
  | 'ionizationEnergy'
  | 'electronAffinity'
  | 'density'
  | 'meltingPoint'
  | 'boilingPoint'
  | 'atomicMass'
  | 'covalentRadius'
  | 'halfLife'
  | 'lifetime'
  | 'decayMode'
  | 'earthAbundance'
  | 'meteoriteAbundance'
  | 'rarity'

export type HeatmapGroupId = 'atomic' | 'trends' | 'physical' | 'nuclear' | 'other'

export interface HeatmapDefinition {
  id: HeatmapId
  group: HeatmapGroupId
  labelKey: keyof LocaleMessages['heatmap']['maps']
  unitKey?: keyof LocaleMessages['sidebar']['units']
  accent: string
  scale?: 'linear' | 'log'
  /** Lower raw value → higher cell brightness (e.g. rarity). */
  invertIntensity?: boolean
}

export interface HeatmapDataset {
  values: Map<number, number | null>
  min: number
  max: number
  withData: number
}
