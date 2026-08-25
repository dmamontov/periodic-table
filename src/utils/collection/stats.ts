import type { CategoryId } from '../../types/element/category';
import { allCategories, elements, isElementRadioactive } from '../../data';

/** Elements past einsteinium (99) are too short-lived to ever hold a physical sample of. */
const COLLECTIBLE_MAX_NUMBER = 99;

export interface ElementCounts {
  collected: number;
  collectible: number;
  total: number;
}

export interface CategoryCount extends ElementCounts {
  id: CategoryId;
  color: string;
}

export interface CollectionStats {
  elementCounts: ElementCounts;
  radioactiveCounts: ElementCounts;
  categoryCounts: CategoryCount[];
}

function isCollectible(number: number): boolean {
  return number <= COLLECTIBLE_MAX_NUMBER;
}

export function computeCollectionStats(): CollectionStats {
  const collected = elements.filter((el) => el.inCollection);
  const radioactiveElements = elements.filter((el) => isElementRadioactive(el.number));

  const categoryCounts: CategoryCount[] = allCategories.map(({ id, color }) => {
    const inCategory = elements.filter((el) => el.category === id);
    return {
      id,
      color,
      collected: inCategory.filter((el) => el.inCollection).length,
      collectible: inCategory.filter((el) => isCollectible(el.number)).length,
      total: inCategory.length,
    };
  });

  return {
    elementCounts: {
      collected: collected.length,
      collectible: elements.filter((el) => isCollectible(el.number)).length,
      total: elements.length,
    },
    radioactiveCounts: {
      collected: collected.filter((el) => isElementRadioactive(el.number)).length,
      collectible: radioactiveElements.filter((el) => isCollectible(el.number)).length,
      total: radioactiveElements.length,
    },
    categoryCounts,
  };
}
