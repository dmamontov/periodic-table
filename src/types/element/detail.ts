import type { DecayModeKey } from '../../locales/types'
import type { GhsPictogramId } from './ghs'
import type { RadiacodeIsotopeRef } from '../collection/spectrum'

export interface Overview {
  latinName?: string | null
  englishName?: string | null
  discoveryYear?: string | null
  casNumber?: string | null
  discoverer?: string | null
  discoveryCountry?: string | null
  electronShellConfig?: string | null
  electronCount?: string | null
  protonCount?: string | null
  neutronCount?: string | null
  hasImage?: boolean
  hasSpectre?: boolean
  electronConfiguration?: string | null
}

export type AggregationState = 'gas' | 'solid' | 'liquid' | 'unknown'

export interface Properties {
  atomicMass?: string | null
  density?: string | null
  meltingPoint?: string | null
  boilingPoint?: string | null
  valence?: string | null
  group?: string | null
  block?: string | null
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
  electricalConductivity?: string | null
  electricalType?: string | null
  magneticType?: MagneticType | null
  volumeMagneticSusceptibility?: string | null
  massMagneticSusceptibility?: string | null
  molarMagneticSusceptibility?: string | null
  electricalResistivity?: string | null
  superconductingTemperature?: string | null
}

export interface Grid {
  structureCode?: string | null
  gridParams?: string | null
  axialRatio?: string | null
  debyeTemperature?: string | null
  spaceGroup?: string | null
  spaceGroupNumber?: string | null
}

export interface Additional {
  pubchemCid?: string | null
  rtecsNumber?: string | null
  brinellHardness?: string | null
  mohsHardness?: string | null
  vickersHardness?: string | null
  bulkModulus?: string | null
  youngModulus?: string | null
  liquidDensity?: string | null
  molarVolume?: string | null
  poissonRatio?: string | null
  shearModulus?: string | null
  soundSpeed?: string | null
  refractiveIndex?: string | null
  thermalConductivity?: string | null
}

export interface Reactivity {
  electronegativity?: string | null
  electronAffinity?: string | null
}

export interface Nucleus {
  halfLife?: string | null
  lifetime?: string | null
  neutronCrossSection?: string | null
  nfpaCube?: string | null
}

export interface Prevalence {
  universe?: string | null
  sun?: string | null
  ocean?: string | null
  humanBody?: string | null
  crust?: string | null
  meteorites?: string | null
}

export interface ElementIsotopeEntry {
  mass: number
  abundance?: string | null
}

export interface ProductionCountryEntry {
  /** Lowercase ISO 3166-1 alpha-2 code */
  country: string
  /** Share of world production/mining, percent — omit if unknown or not applicable */
  share?: string | null
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
  /** See the "mining" section in CLAUDE.md */
  productionCountries?: ProductionCountryEntry[]
}

/** On-disk shape: number/symbol come from elements/elements.ts, name from overview.englishName. */
export type StoredElementDetail = Omit<ElementDetail, 'number' | 'symbol' | 'name'>
