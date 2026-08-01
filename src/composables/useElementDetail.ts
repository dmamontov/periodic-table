import { computed, type Ref } from 'vue'
import type { Element } from '../types/element'
import { getElementDetail } from '../data'

export function useElementDetail(element: Ref<Element | null>) {
  const detail = computed(() => {
    if (!element.value) return null
    return getElementDetail(element.value.number)
  })

  const error = computed(() => {
    if (!element.value) return null
    return detail.value ? null : 'Not found'
  })

  return { detail, error }
}
