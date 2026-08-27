import { describe, expect, it } from 'vitest';
import { cyclicIndex } from '../../src/utils/cyclicIndex';

describe('cyclicIndex', () => {
  it('steps forward within range', () => {
    expect(cyclicIndex(0, 1, 5)).toBe(1);
  });

  it('wraps forward past the end', () => {
    expect(cyclicIndex(4, 1, 5)).toBe(0);
  });

  it('wraps backward past the start', () => {
    expect(cyclicIndex(0, -1, 5)).toBe(4);
  });

  it('handles deltas larger than count', () => {
    expect(cyclicIndex(0, 7, 5)).toBe(2);
  });

  it('does not fully normalize a delta more negative than -count', () => {
    expect(cyclicIndex(0, -7, 5)).toBe(-2);
  });

  it('is a no-op with zero delta', () => {
    expect(cyclicIndex(3, 0, 5)).toBe(3);
  });
});
