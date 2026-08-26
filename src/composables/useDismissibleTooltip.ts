import { onBeforeUnmount, onMounted, readonly, ref, type Ref } from 'vue';

const VIEWPORT_MARGIN = 8;
// Mirrors the bubble's CSS `max-width` - a worst-case upper bound for clamping, not its actual rendered width (which varies with content and is unknown here).
const MAX_BUBBLE_WIDTH = 240;

/** Click/tap-to-open tooltip bubble anchored to `rootEl`, positioned below it and clamped to the viewport — works on touch devices, unlike the native `title` attribute. Dismissed on outside click, Escape, resize, or scroll. Centers on the anchor via `left` + the consumer's own `transform: translateX(-50%)`, so it stays centered regardless of the bubble's actual rendered width. Bind the returned `bubbleEl` to the bubble element via `:ref` so the clamp can use its real width instead of a worst-case guess. */
export function useDismissibleTooltip(rootEl: Ref<HTMLElement | null>) {
  const isOpen = ref(false);
  const style = ref({ top: '0px', left: '0px' });
  const bubbleEl = ref<HTMLElement | null>(null);

  function updatePosition() {
    const rect = rootEl.value?.getBoundingClientRect();
    if (!rect) return;

    // Falls back to the worst-case width only for the very first frame, before bubbleEl has laid out.
    const bubbleWidth = bubbleEl.value?.getBoundingClientRect().width ?? MAX_BUBBLE_WIDTH;
    const left = Math.max(
      VIEWPORT_MARGIN + bubbleWidth / 2,
      Math.min(rect.left + rect.width / 2, window.innerWidth - bubbleWidth / 2 - VIEWPORT_MARGIN),
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

  // Touch taps synthesize a ghost mouseenter+click pair afterward for compat; listening on mouseenter
  // there would open the tooltip only for the click's own toggle() to immediately close it again, so a
  // real hover-to-preview only makes sense for an actual mouse (pointerType stays 'touch'/'pen' otherwise).
  function onPointerEnter(event: PointerEvent) {
    if (event.pointerType === 'mouse') open();
  }

  function onPointerLeave(event: PointerEvent) {
    if (event.pointerType === 'mouse') close();
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

  return {
    isOpen: readonly(isOpen),
    style: readonly(style),
    bubbleEl,
    open,
    close,
    toggle,
    onKeydown,
    onPointerEnter,
    onPointerLeave,
  };
}
