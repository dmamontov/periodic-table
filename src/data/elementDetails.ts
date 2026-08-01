import raw from './details.json'
import type { ElementDetail } from '../types/elementDetail'

/** On-disk shape: number/symbol/name live in elements.json or OverviewCommon. */
export type StoredElementDetail = Omit<ElementDetail, 'number' | 'symbol' | 'name'>

export const storedElementDetails = raw as Record<string, StoredElementDetail>
