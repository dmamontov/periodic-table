export type Locale = 'ru' | 'en' | 'zh'

export type LegendKey =
  | 'alkali'
  | 'alkalineEarth'
  | 'transition'
  | 'postTransition'
  | 'metalloid'
  | 'nonmetal'
  | 'halogen'
  | 'nobleGas'
  | 'lanthanides'
  | 'actinides'

export interface LocaleMessages {
  title: string
  siteHeading: {
    line1: string
    line2: string
  }
  language: string
  theme: string
  themeLight: string
  themeDark: string
  themeAuto: string
  categories: {
    all: string
  }
  heatmap: {
    title: string
    off: string
    noData: string
    stable: string
    maps: {
      electronegativity: string
      atomicRadius: string
      ionizationEnergy: string
      electronAffinity: string
      density: string
      meltingPoint: string
      boilingPoint: string
      atomicMass: string
      covalentRadius: string
      halfLife: string
      lifetime: string
      decayMode: string
      earthAbundance: string
      meteoriteAbundance: string
      rarity: string
    }
    groups: {
      atomic: string
      trends: string
      physical: string
      nuclear: string
      other: string
    }
    rarityLegend: {
      rare: string
      common: string
    }
    durationUnits: {
      billionYears: string
      years: string
      days: string
      hours: string
      minutes: string
      seconds: string
    }
  }
  collection: {
    mamontov: string
    sampleStates: Record<string, string>
    containers: Record<string, string>
    sourceTypes: Record<string, string>
    samples: Record<string, string>
    spectrumFiles: Record<string, string>
    spectrumMinutes: string
  }
  sidebar: {
    close: string
    wikipedia: string
    youtube: string
    massUnit: string
    loading: string
    error: string
    yes: string
    no: string
    weakRadioactiveYes: string
    electrons: string
    protons: string
    neutrons: string
    blockSuffix: string
    sections: {
      overview: string
      description: string
      collection: string
      properties: string
      thermodynamic: string
      atomic: string
      electromagnetic: string
      grid: string
      gridNumbered: string
      additional: string
      reactivity: string
      nuclear: string
      nfpa: string
      ghs: string
      prevalence: string
      applications: string
    }
    props: {
      latinName: string
      englishName: string
      discoveryYear: string
      discoveryOpener: string
      discoveryCountry: string
      casNumber: string
      electronShell: string
      atomicNumber: string
      atomicMass: string
      density: string
      meltingPoint: string
      boilingPoint: string
      valence: string
      period: string
      group: string
      block: string
      emissionSpectrum: string
      aggregationState: string
      fusionHeat: string
      specificHeat: string
      thermalExpansion: string
      vaporizationHeat: string
      electronConfig: string
      ionCharge: string
      ionizationPotential: string
      atomicRadius: string
      covalentRadius: string
      vanDerWaalsRadius: string
      electroConductivity: string
      electricType: string
      magneticType: string
      volumeMagneticSusceptibility: string
      massMagneticSusceptibility: string
      molarMagneticSusceptibility: string
      resistivity: string
      superconductivityTemp: string
      gridStructure: string
      gridParams: string
      gridRatio: string
      debyeTemp: string
      spaceGroup: string
      spaceGroupNumber: string
      cid: string
      rtec: string
      brinellHardness: string
      mohsHardness: string
      vickersHardness: string
      bulkModulus: string
      youngModulus: string
      liquidDensity: string
      molarVolume: string
      poissonRatio: string
      shearModulus: string
      soundSpeed: string
      refractiveIndex: string
      thermalConductivity: string
      electronegativity: string
      electronAffinity: string
      radioactive: string
      mainIsotopes: string
      decayType: string
      halfLife: string
      lifetime: string
      neutronCrossSection: string
      color: string
      collectionSampleState: string
      collectionContainer: string
      collectionIsotope: string
      collectionSourceType: string
      collectionDecayParent: string
      collectionPurity: string
      collectionSpectrum: string
      spectrum: string
    }
    units: {
      gPerMol: string
      gPerCm3: string
      celsius: string
      fahrenheit: string
      kelvin: string
      kjPerMol: string
      jPerKgK: string
      eV: string
      pm: string
      cm3PerMol: string
      mPerS: string
      wPerMK: string
    }
    aggregationState: Record<'0' | '1' | '2' | '3', string>
    magneticType: Record<'0' | '1' | '2' | '3', string>
    blocks: Record<'s' | 'p' | 'd' | 'f', string>
    gridStructures: {
      hexagonal: string
      hcp: string
      bcc: string
      fcc: string
      rhombohedral: string
      simpleHexagonal: string
      cubic: string
      diamondCubic: string
      orthorhombic: string
      tetragonal: string
      doubleHcp: string
      monoclinic: string
    }
    countries: Record<string, string>
    prevalence: {
      universe: string
      sun: string
      ocean: string
      human: string
      crust: string
      meteorites: string
    }
    oxidationStates: string
    nfpaFire: string
    nfpaHealth: string
    nfpaReactivity: string
    nfpaSpecial: string
    nfpaDiamond: string
    radioactiveBadge: string
    weakRadioactiveBadge: string
    collectionBadge: string
    collectionSpectrumDownload: string
    miniTableAria: string
  }
  openers: Record<string, string>
  nfpa: {
    nfpa1: Record<string, string>
    nfpa2: Record<string, string>
    nfpa3: Record<string, string>
    nfpa4: Record<string, string>
  }
  ghs: Record<
    | 'explosive'
    | 'flammable'
    | 'oxidizer'
    | 'compressedGas'
    | 'corrosive'
    | 'acuteToxicity'
    | 'irritant'
    | 'healthHazard'
    | 'environment',
    string
  >
  legend: Record<LegendKey, string>
  elements: Record<string, string>
  seo: {
    description: string
    elementDescription: string
  }
}
