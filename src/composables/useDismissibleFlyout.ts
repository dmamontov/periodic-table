import { nextTick, onBeforeUnmount, onMounted, readonly, ref, type Ref } from 'vue'

const VIEWPORT_MARGIN = 12

export interface UseDismissibleFlyoutOptions {
  /** Called once the flyout is open and its position has been calculated (e.g. to focus an input). */
  onOpen?: () => void
  /** Called once the flyout is closed (e.g. to reset query state). */
  onClose?: () => void
}

/**
 * Open/close + viewport-clamped positioning for a flyout anchored to `rootEl`, dismissed on outside click or window resize.
 * `rootEl` is a parameter (not created here) because a `ref="x"` template binding only resolves when `x` is created
 * directly in the consuming component itself — via a plain `const x = ref(...)` or `useTemplateRef('x')` — not when
 * it's a value destructured from a composable's return, which the SFC compiler can't confidently bind at runtime.
 */
export function useDismissibleFlyout(
  rootEl: Ref<HTMLElement | null>,
  options: UseDismissibleFlyoutOptions = {},
) {
  const isOpen = ref(false)
  const flyoutStyle = ref({ top: '0px', left: '0px', width: '280px' })

  /** Spans the whole header controls row: from the main menu button's left edge to the search button's right edge. */
  function updateFlyoutPosition() {
    const controlsRect = rootEl.value?.parentElement?.getBoundingClientRect()
    if (!controlsRect) return

    const width = Math.min(controlsRect.width, window.innerWidth - VIEWPORT_MARGIN * 2)
    const maxLeft = window.innerWidth - VIEWPORT_MARGIN - width
    const left = Math.min(Math.max(controlsRect.left, VIEWPORT_MARGIN), Math.max(maxLeft, VIEWPORT_MARGIN))

    flyoutStyle.value = {
      top: `${controlsRect.bottom + 6}px`,
      left: `${left}px`,
      width: `${width}px`,
    }
  }

  function open() {
    isOpen.value = true
    void nextTick(() => {
      updateFlyoutPosition()
      options.onOpen?.()
    })
  }

  function close() {
    isOpen.value = false
    options.onClose?.()
  }

  function toggle() {
    if (isOpen.value) close()
    else open()
  }

  function onDocumentPointerDown(event: PointerEvent) {
    if (!isOpen.value) return
    if (rootEl.value && !rootEl.value.contains(event.target as Node)) close()
  }

  function onWindowResize() {
    if (isOpen.value) updateFlyoutPosition()
  }

  onMounted(() => {
    document.addEventListener('pointerdown', onDocumentPointerDown)
    window.addEventListener('resize', onWindowResize)
  })

  onBeforeUnmount(() => {
    document.removeEventListener('pointerdown', onDocumentPointerDown)
    window.removeEventListener('resize', onWindowResize)
  })

  return { isOpen: readonly(isOpen), flyoutStyle: readonly(flyoutStyle), open, close, toggle }
}
