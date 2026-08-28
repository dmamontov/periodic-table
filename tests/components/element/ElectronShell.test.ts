import { describe, expect, it } from 'vitest';
import ElectronShell from '../../../src/components/element/ElectronShell.vue';
import { mountComponent } from '../../helpers/mountComponent';

describe('ElectronShell', () => {
  it('renders nothing for a missing shell', () => {
    const wrapper = mountComponent(ElectronShell, { props: { shell: null } });
    expect(wrapper.find('.electron-shell').exists()).toBe(false);
  });

  it('renders one orbit per shell segment and one electron dot per shell count', () => {
    const wrapper = mountComponent(ElectronShell, { props: { shell: '2-8-1' } });

    const orbits = wrapper.findAll('.electron-shell__orbit');
    expect(orbits).toHaveLength(8);

    expect(orbits[0]!.findAll('.electron-shell__atom')).toHaveLength(2);
    expect(orbits[1]!.findAll('.electron-shell__atom')).toHaveLength(8);
    expect(orbits[2]!.findAll('.electron-shell__atom')).toHaveLength(1);
    expect(orbits[3]!.findAll('.electron-shell__atom')).toHaveLength(0);
  });

  it('parses only the leading digits of each shell segment', () => {
    const wrapper = mountComponent(ElectronShell, { props: { shell: '2*-abc' } });
    const orbits = wrapper.findAll('.electron-shell__orbit');
    expect(orbits[0]!.findAll('.electron-shell__atom')).toHaveLength(2);
    expect(orbits[1]!.findAll('.electron-shell__atom')).toHaveLength(0);
  });

  it('uses the given accent color for the electron dots, falling back to the default particle color', () => {
    const wrapper = mountComponent(ElectronShell, { props: { shell: '2', accentColor: '#ff0000' } });
    const atom = wrapper.find('.electron-shell__atom');
    expect((atom.element as HTMLElement).style.backgroundColor).toBe('rgb(255, 0, 0)');
  });
});
