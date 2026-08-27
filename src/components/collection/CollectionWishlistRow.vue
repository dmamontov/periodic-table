<script setup lang="ts">
import { computed, useTemplateRef } from 'vue';
import { useLocale } from '../../locales';
import { useDismissibleTooltip } from '../../composables/useDismissibleTooltip';
import { COLLECTION_COLOR, WISHLIST_UPGRADE_COLOR } from '../../theme/colors';
import type { WishlistStatus } from '../../types/collection/collection';
import AppIcon from '../common/AppIcon.vue';
import TooltipBubble from '../common/TooltipBubble.vue';
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
        <AppIcon name="trend-up" />
        <TooltipBubble :tooltip="upgradeTooltip">{{ messages.collectionPanel.wishlistUpgradeBadge }}</TooltipBubble>
      </span>

      <span
        ref="statusIconEl"
        class="collection-wishlist-row__icon"
        :style="{ color: statusColor }"
        @pointerenter="statusTooltip.onPointerEnter"
        @pointerleave="statusTooltip.onPointerLeave"
        @click.stop="statusTooltip.toggle"
      >
        <AppIcon v-if="resolvedStatus === 'want'" name="star" />
        <AppIcon v-else-if="resolvedStatus === 'ordered'" name="package" />
        <AppIcon v-else name="truck" />
        <TooltipBubble :tooltip="statusTooltip">{{ statusLabel }}</TooltipBubble>
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

.collection-wishlist-row__icon :deep(svg) {
  width: 100%;
  height: 100%;
}
</style>
