import { describe, expect, it } from 'vitest';
import { computeCollectionStats } from '../../../src/utils/collection/stats';
import { allCategories, elements, isElementRadioactive, isElementWeaklyRadioactive } from '../../../src/data';

const COLLECTIBLE_MAX_NUMBER = 99;

function isStrictlyRadioactive(number: number): boolean {
  return isElementRadioactive(number) && !isElementWeaklyRadioactive(number);
}

describe('computeCollectionStats', () => {
  it('computes overall element counts matching the real data', () => {
    const stats = computeCollectionStats();

    expect(stats.elementCounts.total).toBe(elements.length);
    expect(stats.elementCounts.collected).toBe(elements.filter((el) => el.inCollection).length);
    expect(stats.elementCounts.collectible).toBe(elements.filter((el) => el.number <= COLLECTIBLE_MAX_NUMBER).length);
  });

  it('computes radioactive element counts matching the real data, excluding weakly radioactive elements', () => {
    const stats = computeCollectionStats();
    const radioactive = elements.filter((el) => isStrictlyRadioactive(el.number));

    expect(stats.radioactiveCounts.total).toBe(radioactive.length);
    expect(stats.radioactiveCounts.collected).toBe(
      elements.filter((el) => el.inCollection && isStrictlyRadioactive(el.number)).length,
    );
    expect(stats.radioactiveCounts.collectible).toBe(
      radioactive.filter((el) => el.number <= COLLECTIBLE_MAX_NUMBER).length,
    );

    const collectedWeaklyRadioactive = elements.filter(
      (el) => el.inCollection && isElementWeaklyRadioactive(el.number),
    );
    expect(collectedWeaklyRadioactive.length).toBeGreaterThan(0);
    expect(stats.radioactiveCounts.collected).toBeLessThan(
      elements.filter((el) => el.inCollection && isElementRadioactive(el.number)).length,
    );
  });

  it('computes per-category counts matching the real data, one entry per category', () => {
    const stats = computeCollectionStats();

    expect(stats.categoryCounts).toHaveLength(allCategories.length);
    for (const { id, color } of allCategories) {
      const entry = stats.categoryCounts.find((c) => c.id === id);
      expect(entry).toBeDefined();
      expect(entry!.color).toBe(color);

      const inCategory = elements.filter((el) => el.category === id);
      expect(entry!.total).toBe(inCategory.length);
      expect(entry!.collected).toBe(inCategory.filter((el) => el.inCollection).length);
      expect(entry!.collectible).toBe(inCategory.filter((el) => el.number <= COLLECTIBLE_MAX_NUMBER).length);
    }
  });
});
