import { describe, expect, it } from 'vitest';
import LanguageSwitcher from '../../../src/components/layout/LanguageSwitcher.vue';
import { localeMessages } from '../../../src/locales';
import { mountComponent } from '../../helpers/mountComponent';

describe('LanguageSwitcher', () => {
  it('renders one button per locale option, labeled Рус/EN/中文', () => {
    const wrapper = mountComponent(LanguageSwitcher);
    const labels = wrapper.findAll('button').map((btn) => btn.text());
    expect(labels).toEqual(['Рус', 'EN', '中文']);
  });

  it('switches the active locale on click, updating the group aria-label to match', async () => {
    const wrapper = mountComponent(LanguageSwitcher);
    const buttons = wrapper.findAll('button');
    const zhButton = buttons[2]!;

    await zhButton.trigger('click');

    expect(zhButton.attributes('aria-pressed')).toBe('true');
    expect(buttons[0]!.attributes('aria-pressed')).toBe('false');
    expect(buttons[1]!.attributes('aria-pressed')).toBe('false');
    expect(wrapper.attributes('aria-label')).toBe(localeMessages.zh.language);
  });
});
