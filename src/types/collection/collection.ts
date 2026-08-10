import type { LocalizedLabel } from '../../utils/localizedLabel'

export interface ElementCollectionDecayParent {
  /** Parent element's symbol, e.g. "Ra" */
  symbol: string
  /** Parent isotope's mass number, e.g. "226" */
  isotope: string
  /** Parent's form in the same sample, e.g. "Powder" */
  sampleState?: string | null
}

export interface SpectrumAnnotation {
  /** Line energy, keV */
  energy: number
  /** Short label — the actual emitting isotope/line, not necessarily the sample's own element */
  label: string
}

export interface ElementCollectionPhysical {
  /** State or form of the material (gas, beads, electrodes…); a key into sampleStateLabels */
  sampleState?: string | null
  /** Ready-made description overriding sampleState (e.g. "Clock hands with self-luminous paint") */
  description?: LocalizedLabel | null
  /** Vessel or packaging (ampoule, box…); empty — sample has no separate container */
  container?: string | null
  purity?: string | null
  /** Sample weight, grams; a leading "~" marks it approximate (e.g. calculated from bulk density for a hypothetical 1×1×1 cm cube) */
  weight?: string | null
}

export interface ElementCollectionRadioactive {
  /** Isotope mass number, e.g. "226" → ²²⁶Ra */
  isotope?: string | null
  /** Primary / secondary — for radioactive samples in the collection */
  sourceType?: string | null
  /** Ancestors continuously producing this element in situ, most distant first, e.g. [Pb-210, Bi-210] for Po-210 */
  decayParent?: ElementCollectionDecayParent[] | null
}

export interface ElementCollectionSpectrum {
  /** γ-spectrum ID from data/spectra/, e.g. "th-90-wt20" */
  id: string
  /** Download filename for the spectrum's XML */
  filename?: LocalizedLabel | null
  /** Reference gamma/X-ray lines on the chart — each must be a documented line AND show a real signal in this spectrum */
  annotations?: SpectrumAnnotation[] | null
}

export interface ElementCollection {
  physical?: ElementCollectionPhysical | null
  /** Present only for radioactive samples in the collection */
  radioactive?: ElementCollectionRadioactive | null
  spectrum?: ElementCollectionSpectrum | null
}
