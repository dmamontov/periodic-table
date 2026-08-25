import type { CategoryId } from '../types/element/category';
import type { HeatmapId } from '../types/heatmap';
import type { SectionId } from '../types/element/section';

/**
 * Configurable colors that carry meaning, not just UI chrome — element category
 * tints, heatmap/property accents, the collection's own accent, and detail-sidebar
 * section accents. General UI theme colors (backgrounds, text, borders) live in
 * src/style.css as light/dark CSS custom properties instead, since those need a
 * per-theme pair; the colors here are used as-is in both themes.
 */

/** Periodic-table cell background per element category. */
export const CATEGORY_COLORS: Record<CategoryId, string> = {
  alkali: '#d62839',
  'alkaline-earth': '#e76f2a',
  transition: '#7d8cc4',
  'post-transition': '#4f5bd5',
  metalloid: '#1f9d6b',
  nonmetal: '#5fa03a',
  halogen: '#d4a012',
  'noble-gas': '#d45d8d',
  lanthanides: '#3aafb9',
  actinides: '#007c91',
};

/** The collection's own accent — "you own this" badges, the collection filter dot, collection stats. */
export const COLLECTION_COLOR = '#c9a227';

/** Radioactive-status badge (element detail sidebar) — full vs. weakly radioactive. */
export const RADIOACTIVE_COLOR = '#d14a0f';
export const WEAK_RADIOACTIVE_COLOR = '#8a9aab';

/** Wishlist "upgrade available" badge — a sold sample beats what's already in the collection. */
export const WISHLIST_UPGRADE_COLOR = '#4a90a4';

/** Whether an earlier (history) sample is still physically kept — used by the history timeline and by historical spectrum cards alike. */
export const RETAINED_COLOR = '#16a34a';
export const NOT_RETAINED_COLOR = '#dc2626';

/** Subatomic particle color-coding — particle labels and the electron-shell diagram's default accent. */
export const PARTICLE_COLORS = {
  electron: '#5b8def',
  proton: '#e05a6f',
  neutron: '#5cad52',
};

/** Accent color per element-detail sidebar section (left border, section title). */
export const SECTION_COLORS: Record<SectionId, string> = {
  overview: '#f6511d',
  mining: '#a0622d',
  description: '#6f42c1',
  collection: COLLECTION_COLOR,
  properties: '#00a878',
  thermodynamic: '#3f84e5',
  atomic: '#ce2d4f',
  electromagnetic: '#258ea6',
  grid: '#ce2d4f',
  additional: '#e94f37',
  reactivity: '#53a548',
  nuclear: '#ce2d4f',
  nfpa: '#e76f2a',
  ghs: '#c0392b',
  prevalence: '#0e63a5',
  applications: '#5b4b8a',
};

/** Accent color per heatmap (property) — cell tint and legend scale. */
export const HEATMAP_ACCENT_COLORS: Record<HeatmapId, string> = {
  atomicMass: '#495057',
  atomicRadius: '#0077b6',
  covalentRadius: '#4361ee',
  electronegativity: '#7b2cbf',
  ionizationEnergy: '#e85d04',
  electronAffinity: '#2a9d8f',
  density: '#6d4c41',
  meltingPoint: '#dc2f02',
  boilingPoint: '#9d0208',
  decayMode: '#40916c',
  halfLife: '#52b788',
  lifetime: '#2d6a4f',
  earthAbundance: '#1b4332',
  meteoriteAbundance: '#2d6a4f',
  rarity: '#40916c',
};
