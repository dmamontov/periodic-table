import { onBeforeUnmount, onMounted, readonly, ref, type Ref } from 'vue';

const VIEWPORT_MARGIN = 8;
// Mirrors the bubble's CSS `max-width` - a worst-case upper bound for clamping, not its actual rendered width (which varies with content and is unknown here).
const MAX_BUBBLE_WIDTH = 240;

/** Click/tap-to-open tooltip bubble anchored to `rootEl`, positioned below it and clamped to the viewport — works on touch devices, unlike the native `title` attribute. Dismissed on outside click, Escape, resize, or scroll. Centers on the anchor via `left` + the consumer's own `transform: translateX(-50%)`, so it stays centered regardless of the bubble's actual rendered width. */
export function useDismissibleTooltip(rootEl: Ref<HTMLElement | null>) {
  const isOpen = ref(false);
  const style = ref({ top: '0px', left: '0px' });

  function updatePosition() {
    const rect = rootEl.value?.getBoundingClientRect();
    if (!rect) return;

    const left = Math.max(
      VIEWPORT_MARGIN + MAX_BUBBLE_WIDTH / 2,
      Math.min(rect.left + rect.width / 2, window.innerWidth - MAX_BUBBLE_WIDTH / 2 - VIEWPORT_MARGIN),
    );
    style.value = { top: `${rect.bottom + 6}px`, left: `${left}px` };
  }

  function open() {
    isOpen.value = true;
    requestAnimationFrame(updatePosition);
  }

  function close() {
    isOpen.value = false;
  }

  function toggle() {
    if (isOpen.value) close();
    else open();
  }

  function onDocumentPointerDown(event: PointerEvent) {
    if (!isOpen.value) return;
    if (rootEl.value && !rootEl.value.contains(event.target as Node)) close();
  }

  function onKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') close();
  }

  function onViewportChange() {
    if (isOpen.value) updatePosition();
  }

  onMounted(() => {
    document.addEventListener('pointerdown', onDocumentPointerDown);
    window.addEventListener('resize', onViewportChange);
    window.addEventListener('scroll', onViewportChange, true);
  });

  onBeforeUnmount(() => {
    document.removeEventListener('pointerdown', onDocumentPointerDown);
    window.removeEventListener('resize', onViewportChange);
    window.removeEventListener('scroll', onViewportChange, true);
  });

  return { isOpen: readonly(isOpen), style: readonly(style), open, close, toggle, onKeydown };
}
