import { computed, type Ref } from 'vue';
import type { Element } from '../types/element/element';
import { getElementDetail } from '../utils/element/detail';

export function useElementDetail(element: Ref<Element | null>) {
  const detail = computed(() => {
    if (!element.value) return null;
    return getElementDetail(element.value.number);
  });

  const error = computed(() => Boolean(element.value) && !detail.value);

  return { detail, error };
}
