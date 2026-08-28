import { describe, expect, it } from 'vitest';
import ElementSidebarGhsSection from '../../../src/components/element/ElementSidebarGhsSection.vue';
import GhsPictogram from '../../../src/components/element/GhsPictogram.vue';
import { mountComponent } from '../../helpers/mountComponent';

describe('ElementSidebarGhsSection', () => {
  it('renders one pictogram + label per item', () => {
    const wrapper = mountComponent(ElementSidebarGhsSection, {
      props: {
        items: [
          { id: 'corrosive', label: 'Corrosive' },
          { id: 'flammable', label: 'Flammable' },
        ],
      },
    });

    const items = wrapper.findAll('.element-sidebar__ghs-item');
    expect(items).toHaveLength(2);
    expect(wrapper.findAllComponents(GhsPictogram)).toHaveLength(2);
    expect(items[0]!.find('.element-sidebar__ghs-label').text()).toBe('Corrosive');
    expect(items[1]!.find('.element-sidebar__ghs-label').text()).toBe('Flammable');
  });

  it('renders nothing when items is empty', () => {
    const wrapper = mountComponent(ElementSidebarGhsSection, { props: { items: [] } });
    expect(wrapper.findAll('.element-sidebar__ghs-item')).toHaveLength(0);
  });
});
