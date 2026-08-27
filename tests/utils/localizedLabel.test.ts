import { describe, expect, it } from 'vitest';
import { resolveLocalizedLabel } from '../../src/utils/localizedLabel';

describe('resolveLocalizedLabel', () => {
  it('returns a plain string as-is regardless of locale', () => {
    expect(resolveLocalizedLabel('Radium', 'en')).toBe('Radium');
    expect(resolveLocalizedLabel('Radium', 'zh')).toBe('Radium');
  });

  it('picks the requested locale from an object label', () => {
    expect(resolveLocalizedLabel({ ru: 'Радий', en: 'Radium', zh: '镭' }, 'zh')).toBe('镭');
  });

  it('falls back to ru, then en, then zh when the requested locale is missing', () => {
    expect(resolveLocalizedLabel({ en: 'Radium' }, 'ru')).toBe('Radium');
    expect(resolveLocalizedLabel({ zh: '镭' }, 'ru')).toBe('镭');
    expect(resolveLocalizedLabel({ ru: 'Радий' }, 'zh')).toBe('Радий');
  });

  it('returns empty string for null/undefined/empty label', () => {
    expect(resolveLocalizedLabel(null, 'ru')).toBe('');
    expect(resolveLocalizedLabel(undefined, 'ru')).toBe('');
    expect(resolveLocalizedLabel('', 'ru')).toBe('');
    expect(resolveLocalizedLabel({}, 'ru')).toBe('');
  });
});
