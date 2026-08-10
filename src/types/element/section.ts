import type { ElementSampleColorFinish } from './element'

export type SectionId =
  | 'overview'
  | 'mining'
  | 'description'
  | 'collection'
  | 'properties'
  | 'thermodynamic'
  | 'atomic'
  | 'electromagnetic'
  | 'grid'
  | 'additional'
  | 'reactivity'
  | 'nuclear'
  | 'nfpa'
  | 'ghs'
  | 'prevalence'
  | 'applications'

export interface DetailProp {
  label: string
  value: string
  html?: boolean
  href?: string | null
  imageUrl?: string | null
  colorHex?: string | null
  colorFinish?: ElementSampleColorFinish
  collectionSpectrumId?: string | null
  kind?: 'miniTable' | 'countryMap'
  mapCountries?: string[]
  empty?: boolean
}

export interface DetailSection {
  id: SectionId
  sectionKey?: string
  title: string
  color: string
  items: DetailProp[]
  gridStructureNum?: number | null
  miningCountries?: string[]
  miningNote?: string
}
