import type { CategoryId } from '../data'
import { allCategories, elements, isElementRadioactive } from '../data'

export interface CategoryCount {
  id: CategoryId
  color: string
  collected: number
  total: number
}

export interface CollectionStats {
  totalElements: number
  collectedCount: number
  radioactiveCollectedCount: number
  radioactiveTotalCount: number
  categoryCounts: CategoryCount[]
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

  return {
    totalElements: elements.length,
    collectedCount: collected.length,
    radioactiveCollectedCount: collected.filter((el) => isElementRadioactive(el.number)).length,
    radioactiveTotalCount: elements.filter((el) => isElementRadioactive(el.number)).length,
    categoryCounts,
  }
}
