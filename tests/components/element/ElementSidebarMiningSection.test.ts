import { describe, expect, it } from 'vitest';
import ElementSidebarMiningSection from '../../../src/components/element/ElementSidebarMiningSection.vue';
import { mountComponent } from '../../helpers/mountComponent';

describe('ElementSidebarMiningSection', () => {
  it('renders the map and note without the --only modifier when countries are given', async () => {
    // ElementProductionMap is a defineAsyncComponent - shallow mount avoids resolving vue-svg-map's
    // ~1.2MB world data package here, since it has its own dedicated test file.
    const wrapper = mountComponent(ElementSidebarMiningSection, {
      props: { countries: [{ country: 'us', share: '40' }], note: 'Mined worldwide.' },
      shallow: true,
    });
    await wrapper.vm.$nextTick();

    expect(wrapper.find('.element-sidebar__mining-note').text()).toBe('Mined worldwide.');
    expect(wrapper.find('.element-sidebar__mining-note').classes()).not.toContain('element-sidebar__mining-note--only');
  });

  it('omits the map and applies the --only modifier when there are no countries', () => {
    const wrapper = mountComponent(ElementSidebarMiningSection, {
      props: { countries: [], note: 'No current production.' },
      shallow: true,
    });

    expect(wrapper.findComponent({ name: 'ElementProductionMap' }).exists()).toBe(false);
    expect(wrapper.find('.element-sidebar__mining-note').classes()).toContain('element-sidebar__mining-note--only');
  });
});
