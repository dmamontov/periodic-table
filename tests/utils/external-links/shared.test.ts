import { describe, expect, it } from 'vitest';
import { firstNonEmpty } from '../../../src/utils/external-links/shared';

describe('firstNonEmpty', () => {
  it('returns the first truthy value', () => {
    expect(firstNonEmpty(null, undefined, '', 'second', 'third')).toBe('second');
  });

  it('returns an empty string when every value is null, undefined, or empty', () => {
    expect(firstNonEmpty(null, undefined, '')).toBe('');
  });

  it('returns an empty string when called with no arguments', () => {
    expect(firstNonEmpty()).toBe('');
  });
});
