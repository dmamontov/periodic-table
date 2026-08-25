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

export interface ElementCollectionWeight {
  /** Sample weight, milligrams */
  mg: number
  /** True if the weight is approximate (e.g. calculated from bulk density for a hypothetical 1×1×1 cm cube) */
  approx?: boolean | null
}

export interface ElementCollectionPhysical {
  /** State or form of the material (gas, beads, electrodes…); a key into sampleStateLabels */
  sampleState?: string | null
  /** Ready-made description overriding sampleState (e.g. "Clock hands with self-luminous paint") */
  description?: LocalizedLabel | null
  /** Specific allotrope/modification of the element, when the sample is one of several (e.g. "Red phosphorus", "Graphite") — free text, shown alongside sampleState rather than replacing it */
  allotrope?: LocalizedLabel | null
  /** Vessel or packaging (ampoule, box…); empty — sample has no separate container */
  container?: string | null
  purity?: string | null
  weight?: ElementCollectionWeight | null
  /** ISO YYYY-MM-DD — date this specific version (this object's own sampleState/description/etc.) became current. On a later replacement, archive this whole object into a new `history` entry and set a new acquiredDate here. */
  acquiredDate?: string | null
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
  /** True if this measurement was taken inside a lead shield (background-suppressing enclosure) */
  leadShielded?: boolean | null
  /** Natural-background spectrum ID from data/spectra/, overlaid on the chart. Assumes the same channel/calibration grid as this spectrum. */
  backgroundSpectrumId?: string | null
  /** One-line justification for why this spectrum confirms the claimed isotope — a real, background-subtracted peak matched against reference nuclear data, not just copied from a table */
  note?: LocalizedLabel | null
}

/** A past version of this collection entry — same shape as ElementCollection minus its own `history`. Dated via its own `physical.acquiredDate`, same field as the live version. */
export interface ElementCollectionHistoryEntry {
  physical?: ElementCollectionPhysical | null
  radioactive?: ElementCollectionRadioactive | null
  spectrum?: ElementCollectionSpectrum | null
  /** Whether this earlier sample is still physically kept, not consumed/merged into the replacement. Omit if unknown. */
  retained?: boolean | null
  /** Why this version was replaced — a key into reasonLabels. Omit if unknown. */
  reason?: string | null
}

export interface ElementCollection {
  physical?: ElementCollectionPhysical | null
  /** Present only for radioactive samples in the collection */
  radioactive?: ElementCollectionRadioactive | null
  spectrum?: ElementCollectionSpectrum | null
  /** Earlier versions of this collection entry before a physical replacement, oldest first. The live fields above always describe the *current* version. */
  history?: ElementCollectionHistoryEntry[] | null
}

export interface WishlistLink {
  /** Plain-text label for the link, e.g. "Luciteria" — a seller/brand name, not localized */
  label: string
  url: string
}

export interface WishlistEntry {
  /** Isotope mass number(s) as sold, e.g. "147" or "242/243/244" for a mixed sample */
  isotope: string
  /** Where to get it — an array since a future entry may list more than one seller */
  links: WishlistLink[]
  /**
   * Decay chain from an isotope physically co-located in the same product (per the
   * seller's own description) down to this sample's isotope, most distant ancestor
   * first — same shape as ElementCollectionDecayParent. Omit when no such in-situ
   * decay relationship is described by the seller.
   */
  decayParent?: ElementCollectionDecayParent[] | null
  /** True when this replaces/upgrades an existing myElements sample rather than adding a brand-new element */
  upgrade?: boolean
}
