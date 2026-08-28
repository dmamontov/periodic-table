import { describe, expect, it } from 'vitest';
import RadiationIcon from '../../../src/components/common/RadiationIcon.vue';
import { mountComponent } from '../../helpers/mountComponent';

describe('RadiationIcon', () => {
  it('renders the plain icon by default', () => {
    const wrapper = mountComponent(RadiationIcon);
    expect(wrapper.classes()).not.toContain('radiation-icon--light');
  });

  it('adds the light variant class when light is set', () => {
    const wrapper = mountComponent(RadiationIcon, { props: { light: true } });
    expect(wrapper.classes()).toContain('radiation-icon--light');
  });
});
