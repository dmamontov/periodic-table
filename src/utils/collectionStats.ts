import type { CategoryId } from '../data'
import { allCategories, elements, isElementRadioactive } from '../data'

/** Elements past einsteinium (99) are too short-lived to ever hold a physical sample of. */
const COLLECTIBLE_MAX_NUMBER = 99

export interface CategoryCount {
  id: CategoryId
  color: string
  collected: number
  collectible: number
  total: number
}

export interface CollectionStats {
  totalElements: number
  collectibleElements: number
  collectedCount: number
  radioactiveCollectedCount: number
  radioactiveCollectibleCount: number
  radioactiveTotalCount: number
  categoryCounts: CategoryCount[]
}

function isCollectible(number: number): boolean {
  return number <= COLLECTIBLE_MAX_NUMBER
}

export function computeCollectionStats(): CollectionStats {
  const collected = elements.filter((el) => el.inCollection)
  const radioactive = elements.filter((el) => isElementRadioactive(el.number))

  const categoryCounts: CategoryCount[] = allCategories.map(({ id, color }) => {
    const inCategory = elements.filter((el) => el.category === id)
    return {
      id,
      color,
      collected: inCategory.filter((el) => el.inCollection).length,
      collectible: inCategory.filter((el) => isCollectible(el.number)).length,
      total: inCategory.length,
    }
  })

  return {
    totalElements: elements.length,
    collectibleElements: elements.filter((el) => isCollectible(el.number)).length,
    collectedCount: collected.length,
    radioactiveCollectedCount: collected.filter((el) => isElementRadioactive(el.number)).length,
    radioactiveCollectibleCount: radioactive.filter((el) => isCollectible(el.number)).length,
    radioactiveTotalCount: radioactive.length,
    categoryCounts,
  }
}
