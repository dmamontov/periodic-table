<script setup lang="ts">
import { computed, useTemplateRef } from 'vue';
import { useLocale } from '../../locales';
import { useDismissibleTooltip } from '../../composables/useDismissibleTooltip';
import { COLLECTION_COLOR, WISHLIST_UPGRADE_COLOR } from '../../theme/colors';
import type { WishlistStatus } from '../../types/collection/collection';
import ElementSpectrumHeading from './ElementSpectrumHeading.vue';

const STATUS_COLORS: Record<'want' | WishlistStatus, string> = {
  want: 'var(--color-text-muted)',
  ordered: '#3f84e5',
  shipping: '#16a34a',
};

const props = defineProps<{
  symbol: string;
  name: string;
  color: string;
  originHtml: string;
  /** What this specific sample/listing is, e.g. "Acrylic cube" - already resolved to the current locale. */
  description: string;
  link?: string | null;
  status?: WishlistStatus | null;
  /** Whether this candidate would replace an existing myElements sample rather than fill a gap. */
  upgrade?: boolean;
}>();

const emit = defineEmits<{ open: [] }>();
const { messages } = useLocale();

const resolvedStatus = computed<'want' | WishlistStatus>(() => props.status ?? 'want');
const statusColor = computed(() => STATUS_COLORS[resolvedStatus.value]);
const statusLabel = computed(() => {
  if (resolvedStatus.value === 'ordered') return messages.value.collectionPanel.wishlistStatusOrdered;
  if (resolvedStatus.value === 'shipping') return messages.value.collectionPanel.wishlistStatusShipping;
  return messages.value.collectionPanel.wishlistStatusWant;
});

const statusIconEl = useTemplateRef<HTMLElement>('statusIconEl');
const statusTooltip = useDismissibleTooltip(statusIconEl);

const upgradeIconEl = useTemplateRef<HTMLElement>('upgradeIconEl');
const upgradeTooltip = useDismissibleTooltip(upgradeIconEl);
</script>

<template>
  <div class="collection-wishlist-row">
    <div class="collection-wishlist-row__main">
      <button type="button" class="collection-wishlist-row__element" @click="emit('open')">
        <ElementSpectrumHeading :symbol="symbol" :name="name" :accent="color" :origin-html="originHtml" compact />
      </button>
      <a
        v-if="link"
        class="collection-wishlist-row__sample collection-wishlist-row__sample--link"
        :href="link"
        target="_blank"
        rel="noopener noreferrer"
        >{{ description }} ↗</a
      >
      <span v-else class="collection-wishlist-row__sample">{{ description }}</span>
    </div>

    <div class="collection-wishlist-row__icons">
      <span
        v-if="upgrade"
        ref="upgradeIconEl"
        class="collection-wishlist-row__icon"
        :style="{ color: WISHLIST_UPGRADE_COLOR }"
        @pointerenter="upgradeTooltip.onPointerEnter"
        @pointerleave="upgradeTooltip.onPointerLeave"
        @click.stop="upgradeTooltip.toggle"
      >
        <svg viewBox="0 0 256 256" fill="currentColor" aria-hidden="true">
          <path
            d="M240,56v64a8,8,0,0,1-16,0V75.31l-82.34,82.35a8,8,0,0,1-11.32,0L96,123.31,29.66,189.66a8,8,0,0,1-11.32-11.32l72-72a8,8,0,0,1,11.32,0L136,140.69,212.69,64H168a8,8,0,0,1,0-16h64A8,8,0,0,1,240,56Z"
          />
        </svg>
        <Teleport to="body">
          <Transition name="info-tooltip-fade">
            <div
              v-if="upgradeTooltip.isOpen.value"
              :ref="upgradeTooltip.bubbleEl"
              class="info-tooltip__bubble"
              :style="upgradeTooltip.style.value"
              role="tooltip"
            >
              {{ messages.collectionPanel.wishlistUpgradeBadge }}
            </div>
          </Transition>
        </Teleport>
      </span>

      <span
        ref="statusIconEl"
        class="collection-wishlist-row__icon"
        :style="{ color: statusColor }"
        @pointerenter="statusTooltip.onPointerEnter"
        @pointerleave="statusTooltip.onPointerLeave"
        @click.stop="statusTooltip.toggle"
      >
        <svg v-if="resolvedStatus === 'want'" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true">
          <path
            d="M239.18,97.26A16.38,16.38,0,0,0,224.92,86l-59-4.76L143.14,26.15a16.36,16.36,0,0,0-30.27,0L90.11,81.23,31.08,86a16.46,16.46,0,0,0-9.37,28.86l45,38.83L53,211.75a16.38,16.38,0,0,0,24.5,17.82L128,198.49l50.53,31.08A16.4,16.4,0,0,0,203,211.75l-13.76-58.07,45-38.83A16.43,16.43,0,0,0,239.18,97.26Zm-15.34,5.47-48.7,42a8,8,0,0,0-2.56,7.91l14.88,62.8a.37.37,0,0,1-.17.48c-.18.14-.23.11-.38,0l-54.72-33.65a8,8,0,0,0-8.38,0L69.09,215.94c-.15.09-.19.12-.38,0a.37.37,0,0,1-.17-.48l14.88-62.8a8,8,0,0,0-2.56-7.91l-48.7-42c-.12-.1-.23-.19-.13-.5s.18-.27.33-.29l63.92-5.16A8,8,0,0,0,103,91.86l24.62-59.61c.08-.17.11-.25.35-.25s.27.08.35.25L153,91.86a8,8,0,0,0,6.75,4.92l63.92,5.16c.15,0,.24,0,.33.29S224,102.63,223.84,102.73Z"
          />
        </svg>
        <svg v-else-if="resolvedStatus === 'ordered'" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true">
          <path
            d="M223.68,66.15,135.68,18a15.88,15.88,0,0,0-15.36,0l-88,48.17a16,16,0,0,0-8.32,14v95.64a16,16,0,0,0,8.32,14l88,48.17a15.88,15.88,0,0,0,15.36,0l88-48.17a16,16,0,0,0,8.32-14V80.18A16,16,0,0,0,223.68,66.15ZM128,32l80.34,44-29.77,16.3-80.35-44ZM128,120,47.66,76l33.9-18.56,80.34,44ZM40,90l80,43.78v85.79L40,175.82Zm176,85.78h0l-80,43.79V133.82l32-17.51V152a8,8,0,0,0,16,0V107.55L216,90v85.77Z"
          />
        </svg>
        <svg v-else viewBox="0 0 256 256" fill="currentColor" aria-hidden="true">
          <path
            d="M255.42,117l-14-35A15.93,15.93,0,0,0,226.58,72H192V64a8,8,0,0,0-8-8H32A16,16,0,0,0,16,72V184a16,16,0,0,0,16,16H49a32,32,0,0,0,62,0h50a32,32,0,0,0,62,0h17a16,16,0,0,0,16-16V120A7.94,7.94,0,0,0,255.42,117ZM192,88h34.58l9.6,24H192ZM32,72H176v64H32ZM80,208a16,16,0,1,1,16-16A16,16,0,0,1,80,208Zm81-24H111a32,32,0,0,0-62,0H32V152H176v12.31A32.11,32.11,0,0,0,161,184Zm31,24a16,16,0,1,1,16-16A16,16,0,0,1,192,208Zm48-24H223a32.06,32.06,0,0,0-31-24V128h48Z"
          />
        </svg>
        <Teleport to="body">
          <Transition name="info-tooltip-fade">
            <div
              v-if="statusTooltip.isOpen.value"
              :ref="statusTooltip.bubbleEl"
              class="info-tooltip__bubble"
              :style="statusTooltip.style.value"
              role="tooltip"
            >
              {{ statusLabel }}
            </div>
          </Transition>
        </Teleport>
      </span>
    </div>
  </div>
</template>

<style scoped>
.collection-wishlist-row {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 0;
  border-bottom: 1px solid var(--color-border-light);
}

.collection-wishlist-row__main {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.collection-wishlist-row__element {
  display: block;
  width: 100%;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
  text-align: left;
  min-width: 0;
}

.collection-wishlist-row__element :deep(.element-spectrum-heading__name) {
  transition: color 0.15s ease;
}

.collection-wishlist-row__element:hover :deep(.element-spectrum-heading__name) {
  color: var(--color-text);
}

.collection-wishlist-row__sample {
  font-size: 11px;
  font-weight: 400;
  color: var(--color-text-tertiary);
}

.collection-wishlist-row__sample--link {
  color: v-bind(COLLECTION_COLOR);
  text-decoration: none;
}

.collection-wishlist-row__sample--link:hover {
  text-decoration: underline;
}

.collection-wishlist-row__icons {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  gap: 8px;
}

.collection-wishlist-row__icon {
  display: inline-flex;
  flex-shrink: 0;
  width: 16px;
  height: 16px;
  cursor: pointer;
}

.collection-wishlist-row__icon svg {
  width: 100%;
  height: 100%;
}

.info-tooltip__bubble {
  position: fixed;
  z-index: 320;
  max-width: 240px;
  /* `left` is the anchor's center, computed in useDismissibleTooltip - shift back by half of this bubble's own (variable) width so it stays centered regardless of how short/long its text is. */
  transform: translateX(-50%);
  padding: 8px 10px;
  border-radius: 6px;
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  box-shadow: 0 4px 16px var(--color-shadow-md);
  color: var(--color-text);
  font-size: 11px;
  font-weight: 500;
  line-height: 1.4;
}

.info-tooltip-fade-enter-active,
.info-tooltip-fade-leave-active {
  transition: opacity 0.12s ease;
}

.info-tooltip-fade-enter-from,
.info-tooltip-fade-leave-to {
  opacity: 0;
}
</style>
