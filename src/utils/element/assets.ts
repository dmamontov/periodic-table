import { storedElementDetails } from '../../data';
import { getSymbolByNumber } from './lookup';

const imageModules = import.meta.glob('../../assets/element-images/*.jpg', {
  eager: true,
  import: 'default',
});

const spectrumModules = import.meta.glob('../../assets/element-spectra/*.webp', {
  eager: true,
  import: 'default',
});

const gridStructureModules = import.meta.glob('../../assets/grid-structures/*.gif', {
  eager: true,
  import: 'default',
});

const elementImages = new Map<number, string>();
for (const [path, url] of Object.entries(imageModules)) {
  const match = /(\d+)\.jpg$/.exec(path);
  /* v8 ignore next -- every file under src/assets/element-images/ is digit-named (verified via
     `ls src/assets/element-images | grep -vE "^[0-9]+\.jpg$"` returning nothing), so this guard's
     false side can't be exercised by any real glob result; kept as a defensive check against a
     future non-numeric file landing in that folder. */
  if (match?.[1]) elementImages.set(Number(match[1]), String(url));
}

const elementSpectra = new Map<number, string>();
for (const [path, url] of Object.entries(spectrumModules)) {
  const match = /(\d+)\.webp$/.exec(path);
  // Same guaranteed-digit-filename invariant as elementImages above, verified for element-spectra/.
  /* v8 ignore next */
  if (match?.[1]) elementSpectra.set(Number(match[1]), String(url));
}

const gridStructureImages = new Map<number, string>();
for (const [path, url] of Object.entries(gridStructureModules)) {
  const match = /(\d+)\.gif$/.exec(path);
  // Same guaranteed-digit-filename invariant as elementImages above, verified for grid-structures/.
  /* v8 ignore next */
  if (match?.[1]) gridStructureImages.set(Number(match[1]), String(url));
}

export function hasElementImage(number: number): boolean {
  const symbol = getSymbolByNumber(number);
  return symbol ? storedElementDetails[symbol]?.overview?.hasImage === true : false;
}

export function getElementImageUrl(number: number): string | null {
  if (!hasElementImage(number)) return null;
  return elementImages.get(number) ?? null;
}

export function hasElementSpectrum(number: number): boolean {
  const symbol = getSymbolByNumber(number);
  return symbol ? storedElementDetails[symbol]?.overview?.hasSpectre === true : false;
}

export function getElementSpectrumUrl(number: number): string | null {
  if (!hasElementSpectrum(number)) return null;
  return elementSpectra.get(number) ?? null;
}

export function parseGridStructureNum(value: string | null | undefined): number | null {
  if (!value) return null;
  const trimmed = value.trim();
  if (!/^\d+$/.test(trimmed)) return null;
  const num = Number(trimmed);
  return num >= 1 && num <= 12 ? num : null;
}

export function getPrimaryGridStructureNum(structureCode: string | null | undefined): number | null {
  if (!structureCode) return null;
  const first = structureCode.split('|')[0]?.trim();
  return parseGridStructureNum(first);
}

export function getGridStructureImageUrlByNum(num: number | null | undefined): string | null {
  if (num === null || num === undefined) return null;
  return gridStructureImages.get(num) ?? null;
}

export function getGridStructureImageUrl(structureCode: string | null | undefined): string | null {
  return getGridStructureImageUrlByNum(getPrimaryGridStructureNum(structureCode));
}
