import { describe, expect, it } from 'vitest';
import { toIntlLocale } from '../../src/utils/intlLocale';

describe('toIntlLocale', () => {
  it('maps zh to zh-CN', () => {
    expect(toIntlLocale('zh')).toBe('zh-CN');
  });

  it('leaves other locales unchanged', () => {
    expect(toIntlLocale('ru')).toBe('ru');
    expect(toIntlLocale('en')).toBe('en');
  });
});
