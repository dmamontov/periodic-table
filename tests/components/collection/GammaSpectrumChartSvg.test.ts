import { describe, expect, it } from 'vitest';
import GammaSpectrumChartSvg from '../../../src/components/collection/GammaSpectrumChartSvg.vue';
import type { GammaSpectrumChartData } from '../../../src/types/collection/spectrum';
import { mountComponent } from '../../helpers/mountComponent';

function chart(overrides: Partial<GammaSpectrumChartData> = {}): GammaSpectrumChartData {
  return {
    width: 400,
    height: 200,
    baseY: 180,
    pad: { left: 30, right: 10, top: 10, bottom: 20 },
    plotW: 360,
    plotH: 170,
    displayMaxEnergy: 1000,
    areaPath: 'M0 180 L400 180 Z',
    linePath: 'M0 180 L400 180',
    backgroundLinePath: null,
    backgroundAreaPath: null,
    xTicks: [{ energy: 500, x: 200, label: '500' }],
    yTicks: [{ value: 10, y: 90, label: '10' }],
    markers: [],
    ...overrides,
  };
}

const BASE_PROPS = {
  spectrumId: 'ra-88-spd',
  accent: '#ff6666',
  sampleLabel: 'Ampoule',
  durationLabel: '3600 s',
  cpsLabel: '1.2 cps',
};

describe('GammaSpectrumChartSvg', () => {
  it('sets the viewBox from the chart dimensions and the aria-label from sampleLabel', () => {
    const wrapper = mountComponent(GammaSpectrumChartSvg, { props: { chart: chart(), ...BASE_PROPS } });
    const svg = wrapper.find('svg');
    expect(svg.attributes('viewBox')).toBe('0 0 400 200');
    expect(svg.attributes('aria-label')).toBe('Ampoule');
  });

  it('renders one y-tick line/label and one x-tick label per chart entry', () => {
    const wrapper = mountComponent(GammaSpectrumChartSvg, {
      props: {
        chart: chart({
          xTicks: [
            { energy: 300, x: 100, label: '300' },
            { energy: 600, x: 250, label: '600' },
          ],
          yTicks: [{ value: 5, y: 150, label: '5' }],
        }),
        ...BASE_PROPS,
      },
    });
    expect(wrapper.findAll('.gamma-spectrum-svg__ytick')).toHaveLength(1);
    expect(wrapper.findAll('.gamma-spectrum-svg__grid')).toHaveLength(1);
    expect(wrapper.findAll('.gamma-spectrum-svg__tick')).toHaveLength(2);
  });

  it('renders the main line/area but omits the background trace when absent', () => {
    const wrapper = mountComponent(GammaSpectrumChartSvg, { props: { chart: chart(), ...BASE_PROPS } });
    expect(wrapper.find('.gamma-spectrum-svg__line').exists()).toBe(true);
    expect(wrapper.find('.gamma-spectrum-svg__background-line').exists()).toBe(false);
    expect(wrapper.find('.gamma-spectrum-svg__background-area').exists()).toBe(false);
  });

  it('renders the background trace when the chart data has one', () => {
    const wrapper = mountComponent(GammaSpectrumChartSvg, {
      props: {
        chart: chart({ backgroundLinePath: 'M0 180 L400 170', backgroundAreaPath: 'M0 180 L400 170 Z' }),
        ...BASE_PROPS,
      },
    });
    expect(wrapper.find('.gamma-spectrum-svg__background-line').exists()).toBe(true);
    expect(wrapper.find('.gamma-spectrum-svg__background-area').exists()).toBe(true);
  });

  it('renders one marker line/label pair per marker', () => {
    const wrapper = mountComponent(GammaSpectrumChartSvg, {
      props: {
        chart: chart({ markers: [{ x: 120, label: 'Ra-226' }] }),
        ...BASE_PROPS,
      },
    });
    expect(wrapper.find('.gamma-spectrum-svg__marker-line').exists()).toBe(true);
    expect(wrapper.find('.gamma-spectrum-svg__marker-label').text()).toBe('Ra-226');
  });

  it('shows the duration and cps readouts', () => {
    const wrapper = mountComponent(GammaSpectrumChartSvg, { props: { chart: chart(), ...BASE_PROPS } });
    const readouts = wrapper.findAll('.gamma-spectrum-svg__readout');
    expect(readouts[0]!.text()).toBe('3600 s');
    expect(readouts[1]!.text()).toBe('1.2 cps');
  });
});
