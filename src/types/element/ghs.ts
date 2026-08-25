export type GhsPictogramId =
  | 'explosive'
  | 'flammable'
  | 'oxidizer'
  | 'compressedGas'
  | 'corrosive'
  | 'acuteToxicity'
  | 'irritant'
  | 'healthHazard'
  | 'environment';

export interface GhsDisplayItem {
  id: GhsPictogramId;
  label: string;
}
