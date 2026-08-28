import type { Element } from '../../types/element/element';
import { elements } from '../../data';

export function getElementRouteSymbol(symbol: string): string {
  return symbol.toLowerCase();
}

const elementBySymbol = new Map(elements.map((el) => [el.symbol.toLowerCase(), el]));

export function getElementBySymbol(symbol: string): Element | null {
  return elementBySymbol.get(symbol.toLowerCase()) ?? null;
}

const elementMetaByNumber = new Map(elements.map((el) => [el.number, el]));

export function getSymbolByNumber(number: number): string | null {
  return elementMetaByNumber.get(number)?.symbol ?? null;
}

const RADIOACTIVE_ELEMENT_NUMBERS = new Set<number>([
  43,
  61,
  ...Array.from({ length: 118 - 84 + 1 }, (_, i) => 84 + i),
]);

const WEAKLY_RADIOACTIVE_ELEMENT_NUMBERS = new Set<number>([75, 78, 83]);

export function isElementWeaklyRadioactive(number: number): boolean {
  return WEAKLY_RADIOACTIVE_ELEMENT_NUMBERS.has(number);
}

export function isElementRadioactive(number: number): boolean {
  return RADIOACTIVE_ELEMENT_NUMBERS.has(number) || WEAKLY_RADIOACTIVE_ELEMENT_NUMBERS.has(number);
}
