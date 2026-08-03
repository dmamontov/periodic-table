import type { CategoryId } from '../data'
import { allCategories, elements, isElementRadioactive } from '../data'
import { collectionLabels } from '../locales/partials/collection'

const KNOWN_STATE_KEYS = new Set(Object.keys(collectionLabels.ru.sampleStates))

export interface CategoryCount {
  id: CategoryId
  color: string
  collected: number
  total: number
}

export interface StateCount {
  key: string
  count: number
}

export interface CollectionStats {
  totalElements: number
  collectedCount: number
  radioactiveCollectedCount: number
  spectraCount: number
  categoryCounts: CategoryCount[]
  stateCounts: StateCount[]
}

export function computeCollectionStats(): CollectionStats {
  const collected = elements.filter((el) => el.inCollection)

  const categoryCounts: CategoryCount[] = allCategories.map(({ id, color }) => {
    const inCategory = elements.filter((el) => el.category === id)
    return {
      id,
      color,
      collected: inCategory.filter((el) => el.inCollection).length,
      total: inCategory.length,
    }
  })

  const stateTally = new Map<string, number>()
  for (const el of collected) {
    const key = el.collection?.sampleState
    if (!key || !KNOWN_STATE_KEYS.has(key)) continue
    stateTally.set(key, (stateTally.get(key) ?? 0) + 1)
  }
  const stateCounts: StateCount[] = [...stateTally.entries()]
    .map(([key, count]) => ({ key, count }))
    .sort((a, b) => b.count - a.count)

  return {
    totalElements: elements.length,
    collectedCount: collected.length,
    radioactiveCollectedCount: collected.filter((el) => isElementRadioactive(el.number)).length,
    spectraCount: collected.filter((el) => el.collection?.spectrum).length,
    categoryCounts,
    stateCounts,
  }
}
