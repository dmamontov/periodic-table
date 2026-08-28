import { describe, expect, it } from 'vitest';
import AppHeader from '../../../src/components/layout/AppHeader.vue';
import ElementSearch from '../../../src/components/layout/ElementSearch.vue';
import LanguageSwitcher from '../../../src/components/layout/LanguageSwitcher.vue';
import MainMenu from '../../../src/components/layout/MainMenu.vue';
import OrnamentDivider from '../../../src/components/layout/OrnamentDivider.vue';
import ThemeSwitcher from '../../../src/components/layout/ThemeSwitcher.vue';
import { localeMessages } from '../../../src/locales';
import { mountComponent } from '../../helpers/mountComponent';

describe('AppHeader', () => {
  it('renders the localized site heading and composes its control components', () => {
    // Child components each have their own dedicated test file (MainMenu, ThemeSwitcher, LanguageSwitcher,
    // ElementSearch); shallow-mounting here keeps this test scoped to AppHeader's own composition/heading logic.
    const wrapper = mountComponent(AppHeader, { shallow: true });

    expect(wrapper.find('.app-header__title-line--primary').text()).toBe(localeMessages.en.siteHeading.line1);
    expect(wrapper.find('.app-header__title-line--secondary').text()).toBe(localeMessages.en.siteHeading.line2);

    expect(wrapper.findComponent(MainMenu).exists()).toBe(true);
    expect(wrapper.findComponent(ThemeSwitcher).exists()).toBe(true);
    expect(wrapper.findComponent(LanguageSwitcher).exists()).toBe(true);
    expect(wrapper.findComponent(ElementSearch).exists()).toBe(true);
    expect(wrapper.findComponent(OrnamentDivider).exists()).toBe(true);
  });
});
