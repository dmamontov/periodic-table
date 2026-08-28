import { afterEach, describe, expect, it, vi } from 'vitest';
import AppFooter from '../../../src/components/layout/AppFooter.vue';
import { mountComponent } from '../../helpers/mountComponent';

afterEach(() => {
  vi.useRealTimers();
});

describe('AppFooter', () => {
  it('renders the mail/github links and the version string', () => {
    const wrapper = mountComponent(AppFooter);
    const links = wrapper.findAll('a');

    expect(links[0]!.attributes('href')).toBe('mailto:d@mamontov.tech');
    expect(links[1]!.attributes('href')).toBe('https://github.com/dmamontov/periodic-table');
    expect(links[1]!.attributes('target')).toBe('_blank');
    expect(wrapper.find('.app-footer__year').text()).toContain('test');
  });

  it('shows a single launch year while the current year has not moved past it', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-01-01'));

    const wrapper = mountComponent(AppFooter);
    expect(wrapper.find('.app-footer__year').text()).toContain('2026 ·');
  });

  it('shows a year range once the current year is past the launch year', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2027-01-01'));

    const wrapper = mountComponent(AppFooter);
    expect(wrapper.find('.app-footer__year').text()).toContain('2026–2027 ·');
  });
});
