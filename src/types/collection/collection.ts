import type { LocalizedLabel } from '../../utils/localizedLabel';

export interface ElementCollectionDecayParent {
  symbol: string;
  /** Parent isotope's mass number, e.g. "226" */
  isotope: string;
  /** Parent's form in the same sample, e.g. "Powder" */
  sampleState?: string | null;
}

export interface SpectrumAnnotation {
  /** Line energy, keV */
  energy: number;
  /** Short label — the actual emitting isotope/line, not necessarily the sample's own element */
  label: string;
}

export interface ElementCollectionWeight {
  /** Sample weight, milligrams */
  mg: number;
  /** True if the weight is approximate (e.g. calculated from bulk density for a hypothetical 1×1×1 cm cube) */
  approx?: boolean | null;
}

export interface ElementCollectionPurity {
  /** Raw digit sequence, same convention as before as a number instead of a string: 999 → 99.9%, 9999 → 99.99%, 50 → 50% (fewer than 3 digits is already a literal percentage) */
  value: number;
  /** True if the purity is approximate rather than a manufacturer-specified figure */
  approx?: boolean | null;
}

/** A manufacture date known only as a range rather than a single point — each side its own independent variable-precision string ("YYYY", "YYYY-MM", or "YYYY-MM-DD"). Either side can be omitted if only the other end of the range is known (e.g. "still made as of 1997" with no known start). */
export interface ManufactureDateRange {
  from?: string;
  to?: string;
}

export interface ElementCollectionPhysical {
  /** State or form of the material (gas, beads, electrodes…); a key into sampleStateLabels */
  sampleState?: string | null;
  /** Ready-made description overriding sampleState (e.g. "Clock hands with self-luminous paint") */
  description?: LocalizedLabel | null;
  /** Specific allotrope/modification of the element, when the sample is one of several (e.g. "Red phosphorus", "Graphite") — free text, shown alongside sampleState rather than replacing it */
  allotrope?: LocalizedLabel | null;
  /** Vessel or packaging (ampoule, box…); empty — sample has no separate container */
  container?: string | null;
  purity?: ElementCollectionPurity | null;
  weight?: ElementCollectionWeight | null;
  /** When the sample itself was made/produced (not when it joined the collection — see acquiredDate for that). Variable precision, whatever is actually known: "YYYY", "YYYY-MM", or "YYYY-MM-DD" — or a ManufactureDateRange `{ from, to }` when only a range is known. */
  manufactureDate?: string | ManufactureDateRange | null;
  /** ISO YYYY-MM-DD — date this specific version (this object's own sampleState/description/etc.) became current. On a later replacement, archive this whole object into a new `history` entry and set a new acquiredDate here. */
  acquiredDate?: string | null;
}

export interface ElementCollectionRadioactive {
  /** Isotope mass number, e.g. "226" → ²²⁶Ra */
  isotope?: string | null;
  /** Primary / secondary — for radioactive samples in the collection */
  sourceType?: string | null;
  /** Ancestors continuously producing this element in situ, most distant first, e.g. [Pb-210, Bi-210] for Po-210 */
  decayParent?: ElementCollectionDecayParent[] | null;
}

export interface ElementCollectionSpectrum {
  /** γ-spectrum ID from data/spectra/, e.g. "th-90-wt20" */
  id: string;
  /** Download filename for the spectrum's XML */
  filename?: LocalizedLabel | null;
  /** Reference gamma/X-ray lines on the chart — each must be a documented line AND show a real signal in this spectrum */
  annotations?: SpectrumAnnotation[] | null;
  /** True if this measurement was taken inside a lead shield (background-suppressing enclosure) */
  leadShielded?: boolean | null;
  /** Natural-background spectrum ID from data/spectra/, overlaid on the chart. Assumes the same channel/calibration grid as this spectrum. */
  backgroundSpectrumId?: string | null;
  /** One-line justification for why this spectrum confirms the claimed isotope — a real, background-subtracted peak matched against reference nuclear data, not just copied from a table */
  note?: LocalizedLabel | null;
}

/** The physical/radioactive/spectrum trio shared by the live `ElementCollection` entry and every other "one sample" shape below it (history, alternates). */
export interface ElementCollectionSample {
  physical?: ElementCollectionPhysical | null;
  radioactive?: ElementCollectionRadioactive | null;
  spectrum?: ElementCollectionSpectrum | null;
}

/** A past version of this collection entry. Dated via its own `physical.acquiredDate`, same field as the live version. */
export interface ElementCollectionHistoryEntry extends ElementCollectionSample {
  /** Whether this earlier sample is still physically kept, not consumed/merged into the replacement. Omit if unknown. */
  retained?: boolean | null;
  /** Why this version was replaced — a key into reasonLabels. Omit if unknown. */
  reason?: string | null;
}

/**
 * Another physical sample of this element also owned, alongside the one shown as
 * current above — e.g. the same isotope turning up in a second, unrelated item.
 * Same shape as ElementCollectionHistoryEntry minus `reason`, since an alternate was
 * never "replaced" — it's just not the one chosen to display. Not surfaced anywhere
 * in the UI yet; recorded here so it isn't lost/forgotten.
 */
export interface ElementCollectionAlternate extends ElementCollectionSample {
  /** Whether this alternate sample is still physically kept. Omit if unknown. */
  retained?: boolean | null;
}

export interface ElementCollection extends ElementCollectionSample {
  /** Earlier versions of this collection entry before a physical replacement, oldest first. The live fields above always describe the *current* version. */
  history?: ElementCollectionHistoryEntry[] | null;
  /** Other owned samples of this element, not chosen as the current display one. Not shown anywhere in the UI yet. */
  alternates?: ElementCollectionAlternate[] | null;
}

/** Acquisition progress for a wishlist candidate. Omit — the default — for a plain "want", not yet acted on. */
export type WishlistStatus = 'ordered' | 'shipping';

/** `sampleState`/`description`/`container` reuse ElementCollectionPhysical's own fields — a wishlist candidate is described exactly like an owned sample, same dictionaries and precedence. */
export interface WishlistEntry extends Pick<ElementCollectionPhysical, 'sampleState' | 'description' | 'container'> {
  /** Isotope mass number(s) as sold, e.g. "147" or "242/243/244" for a mixed sample */
  isotope: string;
  /** Where to get it — omit if no listing is currently known. One link per sample; if a second seller sells a genuinely different sample, add another WishlistEntry instead. */
  link?: string | null;
  /**
   * Decay chain from an isotope physically co-located in the same product (per the
   * seller's own description) down to this sample's isotope, most distant ancestor
   * first — same shape as ElementCollectionDecayParent. Omit when no such in-situ
   * decay relationship is described by the seller.
   */
  decayParent?: ElementCollectionDecayParent[] | null;
  status?: WishlistStatus | null;
}
