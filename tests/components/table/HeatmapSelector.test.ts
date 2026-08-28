import { describe, expect, it, vi } from 'vitest';
import HeatmapSelector from '../../../src/components/table/HeatmapSelector.vue';
import type { HeatmapId } from '../../../src/types/heatmap';
import { mountComponent } from '../../helpers/mountComponent';

// src/utils/heatmap.ts (imported by HeatmapSelector) eagerly precomputes datasets from `elements`/
// `storedElementDetails` at module load - mock '../../src/data' so that never touches the real collection.
vi.mock('../../../src/data', async () => {
  const { MOCK_ELEMENTS } = await import('../../helpers/elementFixtures');
  return {
    elements: MOCK_ELEMENTS,
    storedElementDetails: {},
    getElementDecayMode: () => undefined,
    getSymbolByNumber: (number: number) => MOCK_ELEMENTS.find((el) => el.number === number)?.symbol ?? null,
  };
});

describe('HeatmapSelector', () => {
  it('starts on "off" with no scale shown', () => {
    const wrapper = mountComponent(HeatmapSelector);
    expect((wrapper.find('select').element as HTMLSelectElement).value).toBe('');
    expect(wrapper.find('.heatmap-bar__scale').exists()).toBe(false);
  });

  it('lists every heatmap definition grouped under an optgroup, plus the off option', () => {
    const wrapper = mountComponent(HeatmapSelector);
    const optgroups = wrapper.findAll('optgroup');
    const options = wrapper.findAll('option');

    expect(optgroups.length).toBeGreaterThan(0);
    // +1 for the "off" option outside any optgroup
    expect(options.length).toBeGreaterThan(optgroups.length);
    expect(options[0]!.attributes('value')).toBe('');
  });

  it('shows a min/max scale once a heatmap is selected via v-model', async () => {
    const wrapper = mountComponent(HeatmapSelector, { props: { selectedHeatmap: 'atomicMass' } });
    await wrapper.vm.$nextTick();

    expect(wrapper.find('.heatmap-bar__scale').exists()).toBe(true);
    expect(wrapper.find('.heatmap-bar__bound').text().length).toBeGreaterThan(0);
  });

  it('updates the model when a real option is picked from the select', async () => {
    const wrapper = mountComponent(HeatmapSelector);
    const select = wrapper.find('select');
    const firstRealOption = wrapper.findAll('option')[1]!;

    await select.setValue(firstRealOption.attributes('value'));

    expect(wrapper.emitted('update:selectedHeatmap')).toEqual([[firstRealOption.attributes('value')]]);
  });

  it('resets the model to null when "off" is picked again', async () => {
    const wrapper = mountComponent(HeatmapSelector, { props: { selectedHeatmap: 'atomicMass' } });
    const select = wrapper.find('select');

    await select.setValue('');

    expect(wrapper.emitted('update:selectedHeatmap')).toEqual([[null]]);
  });

  it('shows no scale when selectedHeatmap is set to an id matching no known definition', async () => {
    const wrapper = mountComponent(HeatmapSelector, {
      props: { selectedHeatmap: 'unknownId' as unknown as HeatmapId },
    });
    await wrapper.vm.$nextTick();

    expect(wrapper.find('.heatmap-bar__scale').exists()).toBe(false);
  });

  it('marks the scale as inverted only for the rarity heatmap', async () => {
    const wrapper = mountComponent(HeatmapSelector, { props: { selectedHeatmap: 'rarity' } });
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.heatmap-bar__scale').classes()).toContain('heatmap-bar__scale--inverted');

    const wrapperOther = mountComponent(HeatmapSelector, { props: { selectedHeatmap: 'atomicMass' } });
    await wrapperOther.vm.$nextTick();
    expect(wrapperOther.find('.heatmap-bar__scale').classes()).not.toContain('heatmap-bar__scale--inverted');
  });
});
