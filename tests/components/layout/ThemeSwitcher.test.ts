import { describe, expect, it } from 'vitest';
import ThemeSwitcher from '../../../src/components/layout/ThemeSwitcher.vue';
import { localeMessages } from '../../../src/locales';
import { mountComponent } from '../../helpers/mountComponent';

describe('ThemeSwitcher', () => {
  it('renders light/dark/auto buttons, each with an icon and its own aria-label', () => {
    const wrapper = mountComponent(ThemeSwitcher);
    const buttons = wrapper.findAll('button');

    expect(buttons).toHaveLength(3);
    expect(buttons[0]!.attributes('aria-label')).toBe(localeMessages.en.themeLight);
    expect(buttons[1]!.attributes('aria-label')).toBe(localeMessages.en.themeDark);
    expect(buttons[2]!.attributes('aria-label')).toBe(localeMessages.en.themeAuto);
    expect(buttons.every((btn) => btn.find('svg').exists())).toBe(true);
  });

  it('marks the matching theme as active and switches on click', async () => {
    const wrapper = mountComponent(ThemeSwitcher);
    const buttons = wrapper.findAll('button');

    await buttons[1]!.trigger('click');

    expect(buttons[1]!.attributes('aria-pressed')).toBe('true');
    expect(buttons[0]!.attributes('aria-pressed')).toBe('false');
    expect(buttons[2]!.attributes('aria-pressed')).toBe('false');
    expect(document.documentElement.dataset.theme).toBe('dark');
  });
});
