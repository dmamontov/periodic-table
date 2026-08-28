import type { Element } from '../types/element/element';
import type { StoredElementDetail } from '../types/element/detail';
import type { CategoryId } from '../types/element/category';
import type { LocalizedLabel } from '../utils/localizedLabel';
import { CATEGORY_COLORS } from '../theme/colors';
import { getCategoryColor, getElementCategory } from '../utils/element/category';
import { elements as rawElements } from './elements/elements';
import { elementDetails as rawDetails } from './elements/details';
import { myElements } from './collection';

export const storedElementDetails: Record<string, StoredElementDetail> = rawDetails;

export const allCategories: { id: CategoryId; color: string }[] = [
  { id: 'alkali', color: CATEGORY_COLORS.alkali },
  { id: 'alkaline-earth', color: CATEGORY_COLORS['alkaline-earth'] },
  { id: 'transition', color: CATEGORY_COLORS.transition },
  { id: 'post-transition', color: CATEGORY_COLORS['post-transition'] },
  { id: 'metalloid', color: CATEGORY_COLORS.metalloid },
  { id: 'nonmetal', color: CATEGORY_COLORS.nonmetal },
  { id: 'halogen', color: CATEGORY_COLORS.halogen },
  { id: 'noble-gas', color: CATEGORY_COLORS['noble-gas'] },
  { id: 'lanthanides', color: CATEGORY_COLORS.lanthanides },
  { id: 'actinides', color: CATEGORY_COLORS.actinides },
];

export const elements: Element[] = rawElements.map((el) => {
  const category = getElementCategory(el.number, el.oldGroup, el.row);
  const collection = myElements[el.symbol] ?? null;
  return {
    ...el,
    category,
    color: getCategoryColor(category),
    inCollection: collection !== null,
    collection,
  };
});

/** spectrumId → download filename, assembled from collection.ts */
export const collectionSpectrumFilenames: Record<string, LocalizedLabel> = Object.fromEntries(
  Object.values(myElements)
    .filter((entry) => entry.spectrum?.filename)
    .map((entry) => [entry.spectrum!.id, entry.spectrum!.filename!]),
);

export const mainElements = elements.filter((el) => el.row <= 7);
export const fBlockElements = elements.filter((el) => el.row >= 8);
export const lanthanides = fBlockElements.filter((el) => el.row === 8);
export const actinides = fBlockElements.filter((el) => el.row === 9);
