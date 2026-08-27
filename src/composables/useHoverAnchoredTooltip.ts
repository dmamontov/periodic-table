import { ref } from 'vue';
import { useDismissibleTooltip } from './useDismissibleTooltip';

/** A useDismissibleTooltip re-anchored to whichever of several elements was hovered/tapped right before each show() call. */
export function useHoverAnchoredTooltip() {
  const hoveredEl = ref<HTMLElement | null>(null);
  const tooltip = useDismissibleTooltip(hoveredEl);
  const text = ref('');

  function show(event: Event, label: string | undefined) {
    if (!label) return;
    hoveredEl.value = event.currentTarget as HTMLElement;
    text.value = label;
    tooltip.open();
  }

  // Touch taps synthesize a ghost mouseenter+click pair afterward for compat - only a real mouse should
  // open the tooltip on hover, or the click's own toggle() would immediately close what the ghost mouseenter just opened.
  function showOnMouseHover(event: PointerEvent, label: string | undefined) {
    if (event.pointerType === 'mouse') show(event, label);
  }

  function hideOnMouseHover(event: PointerEvent) {
    if (event.pointerType === 'mouse') tooltip.close();
  }

  function toggle(event: Event, label: string | undefined) {
    if (!label) return;
    if (tooltip.isOpen.value && hoveredEl.value === event.currentTarget) {
      tooltip.close();
      return;
    }
    show(event, label);
  }

  return { tooltip, text, showOnMouseHover, hideOnMouseHover, toggle };
}
