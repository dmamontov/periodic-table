import { describe, expect, it, vi } from 'vitest';
import CategoryFilter from '../../../src/components/table/CategoryFilter.vue';
import { mountComponent } from '../../helpers/mountComponent';

// Importing the real '../../src/data' would eagerly evaluate src/data/collection.ts (the personal
// collection) even though CategoryFilter only reads allCategories - mock it out with static category data.
vi.mock('../../../src/data', () => ({
  allCategories: [
    { id: 'alkali', color: '#ff0000' },
    { id: 'alkaline-earth', color: '#ff8800' },
    { id: 'transition', color: '#ffcc00' },
    { id: 'post-transition', color: '#88cc00' },
    { id: 'metalloid', color: '#00cc88' },
    { id: 'nonmetal', color: '#00ccff' },
    { id: 'halogen', color: '#0088ff' },
    { id: 'noble-gas', color: '#8800ff' },
    { id: 'lanthanides', color: '#cc00ff' },
    { id: 'actinides', color: '#ff00cc' },
  ],
}));

describe('CategoryFilter', () => {
  it('renders an "all" item, a collection item, and one item per real category, all inactive except "all"', () => {
    const wrapper = mountComponent(CategoryFilter, { props: { modelValue: 'all' } });
    const items = wrapper.findAll('.category-filter__item');

    // all + collection + 10 real categories
    expect(items).toHaveLength(12);
    expect(items[0]!.classes()).toContain('category-filter__item--active');
    expect(items.slice(1).every((item) => !item.classes().includes('category-filter__item--active'))).toBe(true);
  });

  it('selects a category on click and toggles back to "all" on a second click', async () => {
    const wrapper = mountComponent(CategoryFilter, { props: { modelValue: 'all' } });
    const items = wrapper.findAll('.category-filter__item');
    const alkali = items[2]!;

    await alkali.trigger('click');
    expect(wrapper.emitted('update:modelValue')).toEqual([['alkali']]);

    await wrapper.setProps({ modelValue: 'alkali' });
    await alkali.trigger('click');
    expect(wrapper.emitted('update:modelValue')).toEqual([['alkali'], ['all']]);
  });

  it('toggles the collection filter independently of category selection', async () => {
    const wrapper = mountComponent(CategoryFilter, { props: { modelValue: 'all' } });
    const collectionItem = wrapper.findAll('.category-filter__item')[1]!;

    await collectionItem.trigger('click');
    expect(wrapper.emitted('update:modelValue')).toEqual([['collection']]);

    await wrapper.setProps({ modelValue: 'collection' });
    await collectionItem.trigger('click');
    expect(wrapper.emitted('update:modelValue')).toEqual([['collection'], ['all']]);
  });

  it('clicking "all" resets the selection directly, without toggling', async () => {
    const wrapper = mountComponent(CategoryFilter, { props: { modelValue: 'alkali' } });
    const allItem = wrapper.findAll('.category-filter__item')[0]!;

    await allItem.trigger('click');
    expect(wrapper.emitted('update:modelValue')).toEqual([['all']]);
  });
});
