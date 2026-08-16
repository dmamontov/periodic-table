import { elements } from '../../src/data/elements/elements.ts'
import type { RawElement } from '../../src/types/element/element.ts'

export type ElementRow = RawElement

export function loadElements(): ElementRow[] {
  return elements
}
