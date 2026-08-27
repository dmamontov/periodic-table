import type { ElementCollection } from '../collection/collection';

/** Visual finish of the physical sample's swatch color (the rest render as metallic). */
export type ElementSampleColorFinish = 'metallic' | 'glossy' | 'subtle' | 'matte';

/**
 * On-disk shape in data/elements/elements.ts — the basic per-element facts elements.ts is built
 * from. No color field: the cell color is derived from category (see getCategoryColor), not stored
 * per element.
 */
export interface RawElement {
  number: number;
  symbol: string;
  mass: string;
  group: number | null;
  oldGroup: string;
  row: number;
  col: number;
  periodEnd: boolean;
}

export interface Element extends RawElement {
  color: string;
  category: string;
  inCollection: boolean;
  collection?: ElementCollection | null;
}
