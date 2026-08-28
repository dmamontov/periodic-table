import type { CategoryId } from '../../types/element/category';
import { CATEGORY_COLORS } from '../../theme/colors';

export function getCategoryColor(category: CategoryId): string {
  return CATEGORY_COLORS[category];
}

const metalloidNumbers = new Set([5, 14, 32, 33, 51, 52]);
const nonmetalNumbers = new Set([1, 6, 7, 8, 15, 16, 34]);
const postTransitionNumbers = new Set([13, 31, 49, 50, 81, 82, 83, 84, 113, 114, 115, 116]);

export function getElementCategory(number: number, oldGroup: string, row: number): CategoryId {
  if (row === 8 || number === 57) return 'lanthanides';
  if (row === 9 || number === 89) return 'actinides';
  if (nonmetalNumbers.has(number)) return 'nonmetal';
  if (metalloidNumbers.has(number)) return 'metalloid';
  if (postTransitionNumbers.has(number)) return 'post-transition';

  const [roman, subgroup] = oldGroup.split(' ');

  if (subgroup === 'B') return 'transition';
  if (roman === 'I' && subgroup === 'A') return 'alkali';
  if (roman === 'II' && subgroup === 'A') return 'alkaline-earth';
  if (roman === 'VII' && subgroup === 'A') return 'halogen';
  if (roman === 'VIII' && subgroup === 'A') return 'noble-gas';
  if (oldGroup === 'lanthanides') return 'lanthanides';
  if (oldGroup === 'actinides') return 'actinides';

  return 'transition';
}
