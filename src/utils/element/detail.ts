import type { ElementDetail, ProductionCountryEntry } from '../../types/element/detail';
import type { DecayModeKey } from '../../locales/types';
import type { GhsPictogramId } from '../../types/element/ghs';
import type { RadiacodeIsotopeRef } from '../../types/collection/spectrum';
import { storedElementDetails } from '../../data';
import { getSymbolByNumber } from './lookup';

export function getElementDetail(number: number): ElementDetail | null {
  const symbol = getSymbolByNumber(number);
  if (!symbol) return null;
  const raw = storedElementDetails[symbol];
  if (!raw) return null;
  return {
    ...raw,
    number,
    symbol,
    name: raw.overview?.englishName ?? '',
  };
}

export function getElementDecayMode(number: number): DecayModeKey | undefined {
  const symbol = getSymbolByNumber(number);
  return symbol ? storedElementDetails[symbol]?.isotopes?.decay : undefined;
}

export function getElementGhsPictograms(number: number): GhsPictogramId[] {
  const symbol = getSymbolByNumber(number);
  if (!symbol) return [];
  return storedElementDetails[symbol]?.ghs ?? [];
}

export function getElementProductionCountries(number: number): ProductionCountryEntry[] {
  const symbol = getSymbolByNumber(number);
  if (!symbol) return [];
  return storedElementDetails[symbol]?.productionCountries ?? [];
}

export function getElementRadiacodeIsotope(number: number): RadiacodeIsotopeRef | null {
  const symbol = getSymbolByNumber(number);
  if (!symbol) return null;
  return storedElementDetails[symbol]?.radiacodeIsotope ?? null;
}
