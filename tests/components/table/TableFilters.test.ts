import { describe, expect, it } from 'vitest';
import TableFilters from '../../../src/components/table/TableFilters.vue';
import CategoryFilter from '../../../src/components/table/CategoryFilter.vue';
import { mountComponent } from '../../helpers/mountComponent';

describe('TableFilters', () => {
  it('forwards its v-model to the underlying CategoryFilter', () => {
    // CategoryFilter has its own dedicated test file; shallow-mount here to avoid depending on its
    // internals (and its src/data import) for what is otherwise a pure pass-through wrapper.
    const wrapper = mountComponent(TableFilters, { props: { selectedCategory: 'alkali' }, shallow: true });

    const filter = wrapper.findComponent(CategoryFilter);
    expect(filter.props('modelValue')).toBe('alkali');

    filter.vm.$emit('update:modelValue', 'halogen');
    expect(wrapper.emitted('update:selectedCategory')).toEqual([['halogen']]);
  });

  it('defaults selectedCategory to "all" when not given', () => {
    const wrapper = mountComponent(TableFilters, { shallow: true });
    expect(wrapper.findComponent(CategoryFilter).props('modelValue')).toBe('all');
  });
});
