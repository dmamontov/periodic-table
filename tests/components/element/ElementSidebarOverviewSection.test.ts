import { describe, expect, it } from 'vitest';
import ElementSidebarOverviewSection from '../../../src/components/element/ElementSidebarOverviewSection.vue';
import ElectronShell from '../../../src/components/element/ElectronShell.vue';
import { localeMessages } from '../../../src/locales';
import { mountComponent } from '../../helpers/mountComponent';

describe('ElementSidebarOverviewSection', () => {
  it('forwards shell/accent to ElectronShell and shows electron/proton/neutron values', () => {
    const wrapper = mountComponent(ElementSidebarOverviewSection, {
      props: { shell: '2-8-1', accentColor: '#ff0000', electrons: '11', protons: '11', neutrons: '12' },
    });

    const shell = wrapper.findComponent(ElectronShell);
    expect(shell.props('shell')).toBe('2-8-1');
    expect(shell.props('accentColor')).toBe('#ff0000');

    const particles = wrapper.findAll('.element-sidebar__particle');
    expect(particles[0]!.find('.element-sidebar__particle-label').text()).toBe(localeMessages.en.sidebar.electrons);
    expect(particles[0]!.find('.element-sidebar__particle-value').text()).toBe('11');
    expect(particles[1]!.find('.element-sidebar__particle-value').text()).toBe('11');
    expect(particles[2]!.find('.element-sidebar__particle-value').text()).toBe('12');
  });

  it('shows an empty placeholder for missing particle counts', () => {
    const wrapper = mountComponent(ElementSidebarOverviewSection, {
      props: { shell: null, accentColor: '#ff0000', electrons: null, protons: undefined, neutrons: null },
    });

    const values = wrapper.findAll('.element-sidebar__particle-value');
    expect(values.every((v) => v.text() === '—')).toBe(true);
  });
});
