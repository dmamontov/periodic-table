import { describe, expect, it } from 'vitest';
import ElementSidebarNfpaSection from '../../../src/components/element/ElementSidebarNfpaSection.vue';
import type { NfpaDisplay } from '../../../src/utils/element/formatters';
import { localeMessages } from '../../../src/locales';
import { mountComponent } from '../../helpers/mountComponent';

function nfpaView(overrides: Partial<NfpaDisplay> = {}): NfpaDisplay {
  return {
    red: '3',
    blue: '2',
    yellow: '1',
    white: '',
    whiteDiamond: '',
    whiteDiamondParts: [],
    redLabel: 'Fire: 3',
    blueLabel: 'Health: 2',
    yellowLabel: 'Reactivity: 1',
    whiteLabel: '----',
    whiteStrike: false,
    ...overrides,
  };
}

describe('ElementSidebarNfpaSection', () => {
  it('renders the four fire/health/reactivity/special rows with their labels', () => {
    const wrapper = mountComponent(ElementSidebarNfpaSection, {
      props: { nfpaView: nfpaView(), hasDiamond: false },
    });

    expect(wrapper.text()).toContain(localeMessages.en.sidebar.nfpaFire);
    expect(wrapper.text()).toContain('Fire: 3');
    expect(wrapper.text()).toContain(localeMessages.en.sidebar.nfpaHealth);
    expect(wrapper.text()).toContain('Health: 2');
  });

  it('marks a row empty (dashed) with the empty modifier class', () => {
    const wrapper = mountComponent(ElementSidebarNfpaSection, {
      props: { nfpaView: nfpaView(), hasDiamond: false },
    });

    const whiteRow = wrapper.find('.element-sidebar__prop--nfpa-white');
    expect(whiteRow.classes()).toContain('element-sidebar__prop--empty');
    const redRow = wrapper.find('.element-sidebar__prop--nfpa-red');
    expect(redRow.classes()).not.toContain('element-sidebar__prop--empty');
  });

  it('omits the diamond when hasDiamond is false', () => {
    const wrapper = mountComponent(ElementSidebarNfpaSection, {
      props: { nfpaView: nfpaView(), hasDiamond: false },
    });
    expect(wrapper.find('.element-sidebar__diamond').exists()).toBe(false);
  });

  it('renders the diamond with red/blue/yellow numbers and text white-diamond parts', () => {
    const wrapper = mountComponent(ElementSidebarNfpaSection, {
      props: {
        nfpaView: nfpaView({ whiteDiamondParts: [{ type: 'text', value: 'OX' }] }),
        hasDiamond: true,
      },
    });

    expect(wrapper.find('.element-sidebar__diamond-item--red').text()).toBe('3');
    expect(wrapper.find('.element-sidebar__diamond-item--yellow').text()).toBe('1');
    expect(wrapper.find('.element-sidebar__diamond-item--blue').text()).toBe('2');
    expect(wrapper.find('.element-sidebar__diamond-white-inner').text()).toBe('OX');
    expect(wrapper.find('.element-sidebar__diamond-rad').exists()).toBe(false);
  });

  it('renders a radiation icon for a "rad" white-diamond part', () => {
    const wrapper = mountComponent(ElementSidebarNfpaSection, {
      props: {
        nfpaView: nfpaView({ whiteDiamondParts: [{ type: 'rad', value: 'RAD' }] }),
        hasDiamond: true,
      },
    });
    expect(wrapper.find('.element-sidebar__diamond-rad').exists()).toBe(true);
  });

  it('strikes through the "W" text part when whiteStrike is true', () => {
    const wrapper = mountComponent(ElementSidebarNfpaSection, {
      props: {
        nfpaView: nfpaView({ whiteDiamondParts: [{ type: 'text', value: 'W' }], whiteStrike: true }),
        hasDiamond: true,
      },
    });
    expect(wrapper.find('.element-sidebar__diamond-w-strike').text()).toBe('W');
  });

  it('does not strike a non-"W" part even when whiteStrike is true', () => {
    const wrapper = mountComponent(ElementSidebarNfpaSection, {
      props: {
        nfpaView: nfpaView({ whiteDiamondParts: [{ type: 'text', value: 'OX' }], whiteStrike: true }),
        hasDiamond: true,
      },
    });
    expect(wrapper.find('.element-sidebar__diamond-w-strike').exists()).toBe(false);
  });
});
