import type { ElementCollection } from '../collection/collection'

/** Visual finish of the physical sample's swatch color (the rest render as metallic). */
export type ElementSampleColorFinish = 'metallic' | 'glossy' | 'subtle' | 'matte'

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
