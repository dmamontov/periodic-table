import type { DecayModeKey } from '../../locales/types'
import type { GhsPictogramId } from './ghs'
import type { RadiacodeIsotopeRef } from '../collection/spectrum'

export interface Overview {
  latinName?: string | null
  englishName?: string | null
  elementOpenedYear?: string | null
  casNumber?: string | null
  elementOpener?: string | null
  countryOpener?: string | null
  elementShell?: string | null
  elementE?: string | null
  elementP?: string | null
  elementN?: string | null
  hasImage?: boolean
  hasSpectre?: boolean
  elementConfiguration?: string | null
  elementPrice?: string | null
  elementRadioactivity?: boolean
}

export type AggregationState = 'gas' | 'solid' | 'liquid' | 'unknown'

export interface Properties {
  elementMasse?: string | null
  elementDensity?: string | null
  elementMeltingPoint?: string | null
  elementBoilingPoint?: string | null
  elValence?: string | null
  elementGroup?: string | null
  elementBlock?: string | null
  aggregationState?: AggregationState | null
}

export interface Thermo {
  fusionHeat?: string | null
  specificHeat?: string | null
  thermalExpansion?: string | null
  vaporizationHeat?: string | null
}

export interface Atomic {
  oxidationState?: string | null
  ionCharge?: string | null
  ionizationPotential?: string | null
  atomicRadius?: string | null
  covalentRadius?: string | null
  vanDerWaalsRadius?: string | null
}

export type MagneticType = 'none' | 'diamagnetic' | 'paramagnetic' | 'antiferromagnetic' | 'ferromagnetic'

export interface Electromagnetic {
  es_electro?: string | null
  es_etype?: string | null
  es_mtype?: MagneticType | null
  es_omvospr?: string | null
  es_umvospr?: string | null
  es_mmvospr?: string | null
  es_udel?: string | null
  es_temp?: string | null
}

export interface Grid {
  gridStructureNum?: string | null
  gridParams?: string | null
  ratio?: string | null
  debyeTemperature?: string | null
  space1?: string | null
  space2?: string | null
}

export interface Additional {
  elementColor?: string | null
  numberCID?: string | null
  numberRTEC?: string | null
  brinellHardness?: string | null
  mohsHardness?: string | null
  vickersHardness?: string | null
  bulkModulus?: string | null
  youngModulus?: string | null
  liquidDensity?: string | null
  molarValue?: string | null
  poissonRatio?: string | null
  shearModulus?: string | null
  soundSpeed?: string | null
  refractiveIndex?: string | null
  thermalConductivity?: string | null
}

export interface Reactivity {
  electronegativity?: string | null
  atomElectronEnergy?: string | null
}

export interface Nucleus {
  halfLife?: string | null
  lifetime?: string | null
  neutronCrossSection?: string | null
  nfpaCube?: string | null
}

export interface Prevalence {
  prevalence1?: string | null
  prevalence2?: string | null
  prevalence3?: string | null
  prevalence4?: string | null
  prevalence5?: string | null
  prevalence6?: string | null
}

export interface ElementIsotopeEntry {
  mass: number
  abundance?: string | null
}

export interface ElementIsotopeRecord {
  decay: DecayModeKey
  isotopes: ElementIsotopeEntry[]
}

export interface ElementDetail {
  number: number
  symbol: string
  name: string
  overview?: Overview
  properties?: Properties
  thermo?: Thermo
  atomic?: Atomic
  electromagnetic?: Electromagnetic
  grid?: Grid
  additional?: Additional
  reactivity?: Reactivity
  nucleus?: Nucleus
  prevalence?: Prevalence
  /** Index into ELEMENT_SAMPLE_COLORS (utils/element/formatters.ts) */
  colorIndex?: number
  ghs?: GhsPictogramId[]
  radiacodeIsotope?: RadiacodeIsotopeRef
  isotopes?: ElementIsotopeRecord
  /** Direct thoisoi.ru video link (RU only — EN/ZH always fall back to a YouTube search) */
  youtube?: string
  /** Lowercase ISO 3166-1 alpha-2 codes — see the "mining" section in CLAUDE.md */
  productionCountries?: string[]
}

/** On-disk shape: number/symbol come from elements/elements.ts, name from overview.englishName. */
export type StoredElementDetail = Omit<ElementDetail, 'number' | 'symbol' | 'name'>
