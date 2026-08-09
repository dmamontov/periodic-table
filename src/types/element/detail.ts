export interface OverviewCommon {
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

export interface PropertiesCommon {
  elementMasse?: string | null
  elementDensity?: string | null
  elementMeltingPoint?: string | null
  elementBoilingPoint?: string | null
  elValence?: string | null
  elementGroup?: string | null
  elementBlock?: string | null
  aggregationState?: AggregationState | null
}

export interface ThermoPro {
  fusionHeat?: string | null
  specificHeat?: string | null
  thermalExpansion?: string | null
  vaporizationHeat?: string | null
}

export interface AtomicCommon {
  oxidationState?: string | null
  ionCharge?: string | null
  ionizationPotential?: string | null
  atomicRadius?: string | null
  covalentRadius?: string | null
  vanDerWaalsRadius?: string | null
}

export type MagneticType = 'none' | 'diamagnetic' | 'paramagnetic' | 'antiferromagnetic' | 'ferromagnetic'

export interface ElectromagneticCommon {
  es_electro?: string | null
  es_etype?: string | null
  es_mtype?: MagneticType | null
  es_omvospr?: string | null
  es_umvospr?: string | null
  es_mmvospr?: string | null
  es_udel?: string | null
  es_temp?: string | null
}

export interface GridPro {
  gridStructureNum?: string | null
  gridParams?: string | null
  ratio?: string | null
  debyeTemperature?: string | null
  space1?: string | null
  space2?: string | null
}

export interface AdditionalPro {
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

export interface ReactivityCommon {
  electronegativity?: string | null
  atomElectronEnergy?: string | null
}

export interface NucleusPro {
  halfLife?: string | null
  lifetime?: string | null
  neutronCrossSection?: string | null
  nfpaCube?: string | null
}

export interface PrevalenceCommon {
  prevalence1?: string | null
  prevalence2?: string | null
  prevalence3?: string | null
  prevalence4?: string | null
  prevalence5?: string | null
  prevalence6?: string | null
}

export interface ElementDetail {
  number: number
  symbol: string
  name: string
  OverviewCommon?: OverviewCommon
  PropertiesCommon?: PropertiesCommon
  ThermoPro?: ThermoPro
  AtomicCommon?: AtomicCommon
  ElectromagneticCommon?: ElectromagneticCommon
  GridPro?: GridPro
  AdditionalPro?: AdditionalPro
  ReactivityCommon?: ReactivityCommon
  NucleusPro?: NucleusPro
  PrevalenceCommon?: PrevalenceCommon
}

/** On-disk shape: number/symbol/name live in elements/elements.json or OverviewCommon. */
export type StoredElementDetail = Omit<ElementDetail, 'number' | 'symbol' | 'name'>
