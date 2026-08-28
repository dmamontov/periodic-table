import { afterEach, describe, expect, it } from 'vitest';
import { ref } from 'vue';
import { mount } from '@vue/test-utils';
import TooltipBubble from '../../../src/components/common/TooltipBubble.vue';
import { useDismissibleTooltip } from '../../../src/composables/useDismissibleTooltip';
import { withSetup } from '../../helpers/withSetup';

afterEach(() => {
  document.body.innerHTML = '';
});

describe('TooltipBubble', () => {
  it('renders nothing on body while the tooltip is closed', () => {
    const [tooltip] = withSetup(() => useDismissibleTooltip(ref(null)));
    mount(TooltipBubble, { props: { tooltip } });

    expect(document.body.querySelector('.info-tooltip__bubble')).toBeNull();
  });

  it('renders the bubble with the anchor position and slot content once open, and binds bubbleEl', () => {
    const [tooltip] = withSetup(() => useDismissibleTooltip(ref(null)));
    tooltip.open();

    mount(TooltipBubble, { props: { tooltip }, slots: { default: 'Iron' } });

    const bubble = document.body.querySelector<HTMLElement>('.info-tooltip__bubble');
    expect(bubble).not.toBeNull();
    expect(bubble?.getAttribute('role')).toBe('tooltip');
    expect(bubble?.textContent).toBe('Iron');
    expect(bubble?.style.top).toBe(tooltip.style.value.top);
    expect(tooltip.bubbleEl.value).toBe(bubble);
  });
});
