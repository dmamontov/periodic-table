import { describe, expect, it } from 'vitest';
import ElementSidebarGridSection from '../../../src/components/element/ElementSidebarGridSection.vue';
import type { DetailSection } from '../../../src/types/element/section';
import { mountComponent } from '../../helpers/mountComponent';

function section(items: DetailSection['items']): DetailSection {
  return { id: 'grid', title: 'Crystal lattice', color: '#fff', items };
}

describe('ElementSidebarGridSection', () => {
  it('renders up to the first 3 items in the grid layout, and no extra list when there are 3 or fewer', () => {
    const wrapper = mountComponent(ElementSidebarGridSection, {
      props: {
        section: section([
          { label: 'System', value: 'Cubic' },
          { label: 'a', value: '2.87 Å' },
          { label: 'Density', value: '7.87 g/cm³' },
        ]),
        imageUrl: null,
      },
    });

    const gridItems = wrapper.findAll('.element-sidebar__prop--grid');
    expect(gridItems).toHaveLength(3);
    expect(gridItems[0]!.find('.element-sidebar__prop-label').text()).toBe('System');
    expect(
      wrapper.findAll('.element-sidebar__props').filter((el) => !el.classes().includes('element-sidebar__props--grid')),
    ).toHaveLength(0);
  });

  it('renders items past the first 3 in a separate extra list', () => {
    const wrapper = mountComponent(ElementSidebarGridSection, {
      props: {
        section: section([
          { label: 'System', value: 'Cubic' },
          { label: 'a', value: '2.87 Å' },
          { label: 'Density', value: '7.87 g/cm³' },
          { label: 'Space group', value: 'Im-3m' },
        ]),
        imageUrl: null,
      },
    });

    expect(wrapper.findAll('.element-sidebar__prop--grid')).toHaveLength(3);
    const extraList = wrapper
      .findAll('.element-sidebar__props')
      .find((el) => !el.classes().includes('element-sidebar__props--grid'));
    expect(extraList).toBeDefined();
    expect(extraList!.find('.element-sidebar__prop-label').text()).toBe('Space group');
  });

  it('renders an image sourced from imageUrl, alt-labeled with the first item value, when given', () => {
    const wrapper = mountComponent(ElementSidebarGridSection, {
      props: { section: section([{ label: 'System', value: 'Cubic' }]), imageUrl: '/grid.png' },
    });

    const img = wrapper.find('.element-sidebar__grid-image');
    expect(img.attributes('src')).toBe('/grid.png');
    expect(img.attributes('alt')).toBe('Cubic');
  });

  it('omits the image when imageUrl is null', () => {
    const wrapper = mountComponent(ElementSidebarGridSection, {
      props: { section: section([{ label: 'System', value: 'Cubic' }]), imageUrl: null },
    });
    expect(wrapper.find('.element-sidebar__grid-image').exists()).toBe(false);
  });

  it('renders the image with an empty alt when given with no items to source it from', () => {
    const wrapper = mountComponent(ElementSidebarGridSection, {
      props: { section: section([]), imageUrl: '/grid.png' },
    });
    expect(wrapper.find('.element-sidebar__grid-image').attributes('alt')).toBe('');
  });

  it('renders HTML values via v-html and plain text otherwise, in both the grid layout and the extra list', () => {
    const wrapper = mountComponent(ElementSidebarGridSection, {
      props: {
        section: section([
          { label: 'Formula', value: '<sup>226</sup>Ra', html: true },
          { label: 'b', value: '2' },
          { label: 'c', value: '3' },
          { label: 'Extra formula', value: '<sup>210</sup>Po', html: true },
          { label: 'Extra plain', value: 'plain text' },
        ]),
        imageUrl: null,
      },
    });
    expect(wrapper.find('.element-sidebar__prop--grid .element-sidebar__prop-value sup').text()).toBe('226');
    const extraList = wrapper
      .findAll('.element-sidebar__props')
      .find((el) => !el.classes().includes('element-sidebar__props--grid'))!;
    expect(extraList.find('.element-sidebar__prop-value sup').text()).toBe('210');
  });

  it('marks empty items with the empty modifier class', () => {
    const wrapper = mountComponent(ElementSidebarGridSection, {
      props: { section: section([{ label: 'System', value: '—', empty: true }]), imageUrl: null },
    });
    expect(wrapper.find('.element-sidebar__prop--grid').classes()).toContain('element-sidebar__prop--empty');
  });
});
