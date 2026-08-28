import { describe, expect, it, vi } from 'vitest';
import { ref } from 'vue';
import type { Element } from '../../src/types/element/element';
import type { ElementDetail } from '../../src/types/element/detail';

vi.mock('../../src/utils/element/detail', () => ({
  getElementDetail: vi.fn((number: number) => (number === 1 ? ({ symbol: 'H' } as ElementDetail) : null)),
}));

const { useElementDetail } = await import('../../src/composables/useElementDetail');

const HYDROGEN = { number: 1, symbol: 'H' } as Element;
const UNKNOWN = { number: 999, symbol: 'Xx' } as Element;

describe('useElementDetail', () => {
  it('returns null detail and no error when element is null', () => {
    const element = ref<Element | null>(null);
    const { detail, error } = useElementDetail(element);
    expect(detail.value).toBeNull();
    expect(error.value).toBe(false);
  });

  it('returns the resolved detail when the element is known', () => {
    const element = ref<Element | null>(HYDROGEN);
    const { detail, error } = useElementDetail(element);
    expect(detail.value).toEqual({ symbol: 'H' });
    expect(error.value).toBe(false);
  });

  it('flags an error when the element is set but has no detail', () => {
    const element = ref<Element | null>(UNKNOWN);
    const { detail, error } = useElementDetail(element);
    expect(detail.value).toBeNull();
    expect(error.value).toBe(true);
  });
});
