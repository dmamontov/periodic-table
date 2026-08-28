import { describe, expect, it } from 'vitest';
import { getCategoryColor, getElementCategory } from '../../../src/utils/element/category';
import { CATEGORY_COLORS } from '../../../src/theme/colors';

describe('getCategoryColor', () => {
  it('returns the color for a given category', () => {
    expect(getCategoryColor('nonmetal')).toBe(CATEGORY_COLORS.nonmetal);
    expect(getCategoryColor('actinides')).toBe(CATEGORY_COLORS.actinides);
  });
});

describe('getElementCategory', () => {
  it('classifies row 8 as lanthanides, regardless of number', () => {
    expect(getElementCategory(58, '', 8)).toBe('lanthanides');
  });

  it('classifies number 57 as lanthanides, regardless of row', () => {
    expect(getElementCategory(57, '', 1)).toBe('lanthanides');
  });

  it('classifies row 9 as actinides, regardless of number', () => {
    expect(getElementCategory(90, '', 9)).toBe('actinides');
  });

  it('classifies number 89 as actinides, regardless of row', () => {
    expect(getElementCategory(89, '', 1)).toBe('actinides');
  });

  it('classifies fixed nonmetal atomic numbers', () => {
    expect(getElementCategory(8, '', 2)).toBe('nonmetal');
  });

  it('classifies fixed metalloid atomic numbers', () => {
    expect(getElementCategory(14, '', 3)).toBe('metalloid');
  });

  it('classifies fixed post-transition atomic numbers', () => {
    expect(getElementCategory(82, '', 6)).toBe('post-transition');
  });

  it('classifies a "B" subgroup as transition', () => {
    expect(getElementCategory(26, 'VIII B', 4)).toBe('transition');
  });

  it('classifies "I A" as alkali', () => {
    expect(getElementCategory(11, 'I A', 3)).toBe('alkali');
  });

  it('classifies "II A" as alkaline-earth', () => {
    expect(getElementCategory(20, 'II A', 4)).toBe('alkaline-earth');
  });

  it('classifies "VII A" as halogen', () => {
    expect(getElementCategory(17, 'VII A', 3)).toBe('halogen');
  });

  it('classifies "VIII A" as noble-gas', () => {
    expect(getElementCategory(18, 'VIII A', 3)).toBe('noble-gas');
  });

  it('classifies the literal "lanthanides" oldGroup string', () => {
    expect(getElementCategory(1000, 'lanthanides', 1)).toBe('lanthanides');
  });

  it('classifies the literal "actinides" oldGroup string', () => {
    expect(getElementCategory(1001, 'actinides', 1)).toBe('actinides');
  });

  it('falls back to transition for anything unmatched', () => {
    expect(getElementCategory(1002, 'unknown', 1)).toBe('transition');
  });
});
