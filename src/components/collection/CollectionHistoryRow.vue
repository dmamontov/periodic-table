<script setup lang="ts">
import { useTemplateRef } from 'vue';
import ElementCollectionHistoryModal from '../element/ElementCollectionHistoryModal.vue';
import type { Element } from '../../types/element/element';
import { useLocale } from '../../locales';
import { useDismissibleTooltip } from '../../composables/useDismissibleTooltip';
import { WISHLIST_UPGRADE_COLOR } from '../../theme/colors';
import AppIcon from '../common/AppIcon.vue';
import ElementSpectrumHeading from './ElementSpectrumHeading.vue';

defineProps<{
  element: Element;
  name: string;
  color: string;
  markerColor: string;
  /** Whether the version this row replaced was retired specifically for a better sample - same concept and icon as the wishlist's upgrade flag. */
  upgrade: boolean;
}>();

const { messages } = useLocale();

const upgradeIconEl = useTemplateRef<HTMLElement>('upgradeIconEl');
const upgradeTooltip = useDismissibleTooltip(upgradeIconEl);
</script>

<template>
  <ElementCollectionHistoryModal
    :element="element"
    :element-name="name"
    :display-symbol="element.symbol"
    :accent-color="color"
  >
    <template #trigger="{ open }">
      <button type="button" class="collection-history-row" @click="open">
        <span class="collection-history-row__marker" :style="{ backgroundColor: markerColor }" />
        <ElementSpectrumHeading
          :symbol="element.symbol"
          :name="name"
          :accent="color"
          compact
          class="collection-history-row__heading"
        />
        <span
          v-if="upgrade"
          ref="upgradeIconEl"
          class="collection-history-row__upgrade-icon"
          :style="{ color: WISHLIST_UPGRADE_COLOR }"
          @pointerenter="upgradeTooltip.onPointerEnter"
          @pointerleave="upgradeTooltip.onPointerLeave"
          @click.stop="upgradeTooltip.toggle"
        >
          <AppIcon name="trend-up" />
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
      </button>
    </template>
  </ElementCollectionHistoryModal>
</template>

<style scoped>
.collection-history-row {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px 10px;
  width: 100%;
  padding: 0 0 18px;
  border: none;
  background: none;
  cursor: pointer;
  text-align: left;
}

.collection-history-row::before {
  content: '';
  position: absolute;
  left: 4px;
  top: 13px;
  bottom: 0;
  width: 1px;
  background: var(--color-border);
}

.collection-history-row:last-child::before {
  display: none;
}

.collection-history-row__marker {
  position: relative;
  z-index: 1;
  flex-shrink: 0;
  width: 9px;
  height: 9px;
  border-radius: 50%;
}

.collection-history-row__heading {
  flex: 1 1 auto;
  min-width: 0;
}

.collection-history-row :deep(.element-spectrum-heading__name) {
  transition: color 0.15s ease;
}

.collection-history-row:hover :deep(.element-spectrum-heading__name) {
  color: var(--color-text);
}

.collection-history-row__upgrade-icon {
  display: inline-flex;
  flex-shrink: 0;
  width: 16px;
  height: 16px;
  cursor: pointer;
}

.collection-history-row__upgrade-icon :deep(svg) {
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
