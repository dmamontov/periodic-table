import { afterEach, describe, expect, it } from 'vitest';
import ElementProductionMap from '../../../src/components/element/ElementProductionMap.vue';
import { mountComponent } from '../../helpers/mountComponent';

afterEach(() => {
  document.body.innerHTML = '';
});

describe('ElementProductionMap', () => {
  it('marks countries with production data active, with a share-scaled opacity and a labeled tooltip', () => {
    const wrapper = mountComponent(ElementProductionMap, {
      props: {
        countries: [{ country: 'us', share: '40' }],
        accentColor: '#ff0000',
      },
    });

    const activePaths = wrapper.findAll('path.element-production-map__country--active');
    expect(activePaths).toHaveLength(1);
    expect(activePaths[0]!.attributes('aria-label')).toContain('40%');
    expect((activePaths[0]!.element as unknown as SVGPathElement).style.fillOpacity).not.toBe('');
  });

  it('gives a country with no share full opacity and a plain name label', () => {
    const wrapper = mountComponent(ElementProductionMap, {
      props: {
        countries: [{ country: 'gb', share: null }],
        accentColor: '#ff0000',
      },
    });

    const active = wrapper.find('path.element-production-map__country--active');
    expect(active.attributes('aria-label')).not.toContain('%');
    expect((active.element as unknown as SVGPathElement).style.fillOpacity).toBe('1');
  });

  it('leaves countries with no production data inactive', () => {
    const wrapper = mountComponent(ElementProductionMap, {
      props: { countries: [{ country: 'us', share: '40' }], accentColor: '#ff0000' },
    });

    const activeCount = wrapper.findAll('path.element-production-map__country--active').length;
    const totalCount = wrapper.findAll('path').length;
    expect(activeCount).toBe(1);
    expect(totalCount).toBeGreaterThan(activeCount);
  });

  it('opens a tooltip with the country label on hover, and toggles it closed on click', async () => {
    const wrapper = mountComponent(ElementProductionMap, {
      props: { countries: [{ country: 'us', share: '40' }], accentColor: '#ff0000' },
    });

    const active = wrapper.find('path.element-production-map__country--active');
    await active.trigger('pointerenter', { pointerType: 'mouse' });
    expect(document.body.querySelector('.info-tooltip__bubble')?.textContent).toContain('40%');

    await active.trigger('click');
    expect(document.body.querySelector('.info-tooltip__bubble')).toBeNull();
  });

  it('does not open the tooltip on touch hover', async () => {
    const wrapper = mountComponent(ElementProductionMap, {
      props: { countries: [{ country: 'us', share: '40' }], accentColor: '#ff0000' },
    });

    const active = wrapper.find('path.element-production-map__country--active');
    await active.trigger('pointerenter', { pointerType: 'touch' });
    expect(document.body.querySelector('.info-tooltip__bubble')).toBeNull();
  });
});
