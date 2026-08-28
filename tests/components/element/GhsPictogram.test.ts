import { describe, expect, it } from 'vitest';
import GhsPictogram from '../../../src/components/element/GhsPictogram.vue';
import { mountComponent } from '../../helpers/mountComponent';

describe('GhsPictogram', () => {
  it('renders an image sourced from the pictogram id', () => {
    const wrapper = mountComponent(GhsPictogram, { props: { id: 'corrosive' } });
    const img = wrapper.find('img');

    expect(img.attributes('src')).toBeTruthy();
    expect(img.attributes('width')).toBe('72');
    expect(img.attributes('height')).toBe('72');
  });
});
