import type { LocalizedLabel } from '../utils/localizedLabel'

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

export interface ElementCollection {
  /** State or form of the material (gas, beads, electrodes…); a key into sampleStateLabels */
  sampleState?: string | null
  /**
   * Ready-made description of the sample when it doesn't reduce to a plain
   * sampleState (e.g. "Clock hands with self-luminous paint"). Overrides sampleState.
   */
  description?: LocalizedLabel | null
  /** Vessel or packaging (ampoule, box…); empty — sample has no separate container */
  container?: string | null
  /** Isotope mass number, e.g. "226" → ²²⁶Ra */
  isotope?: string | null
  purity?: string | null
  /**
   * Ancestors in the decay chain: the element isn't stored on its own, but is
   * continuously produced inside the sample (e.g. ²²²Rn from ²²⁶Ra in a sealed ampoule).
   * List from the most distant ancestor to the immediate parent, e.g.
   * [²¹⁰Pb, ²¹⁰Bi] for ²¹⁰Po produced by Pb-210 → Bi-210 → Po-210.
   */
  decayParent?: ElementCollectionDecayParent[] | null
  /** Primary / secondary — for radioactive samples in the collection */
  sourceType?: string | null
  /** γ-spectrum ID from data/spectra/, e.g. "th-90-wt20" */
  spectrum?: string | null
  /** Download filename for the spectrum's XML */
  spectrumFilename?: LocalizedLabel | null
  /**
   * Reference gamma/X-ray lines marked on the spectrum chart. Each one should
   * be a documented emission line for the labeled isotope AND show a real,
   * background-subtracted signal in this specific spectrum — not just a
   * textbook value pasted in blind.
   */
  spectrumAnnotations?: SpectrumAnnotation[] | null
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
