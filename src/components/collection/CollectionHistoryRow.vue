<script setup lang="ts">
import { computed, useTemplateRef } from 'vue';
import ElementCollectionHistoryModal from '../element/ElementCollectionHistoryModal.vue';
import type { Element } from '../../types/element/element';
import { useLocale } from '../../locales';
import { useDismissibleTooltip } from '../../composables/useDismissibleTooltip';
import ElementSpectrumHeading from './ElementSpectrumHeading.vue';

const props = defineProps<{
  element: Element;
  name: string;
  color: string;
  markerColor: string;
  /** Whether this row is the first-ever acquisition of this element, or a later replacement of its sample. */
  type: 'new' | 'replacement';
}>();

const { messages } = useLocale();

const typeLabel = computed(() =>
  props.type === 'new'
    ? messages.value.collectionPanel.historyNewBadge
    : messages.value.collectionPanel.historyReplacedBadge,
);

const typeIconEl = useTemplateRef<HTMLElement>('typeIconEl');
const typeTooltip = useDismissibleTooltip(typeIconEl);
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
          ref="typeIconEl"
          class="collection-history-row__type-icon"
          @pointerenter="typeTooltip.onPointerEnter"
          @pointerleave="typeTooltip.onPointerLeave"
          @click.stop="typeTooltip.toggle"
        >
          <svg v-if="type === 'new'" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true">
            <path
              d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"
            />
          </svg>
          <svg v-else viewBox="0 0 256 256" fill="currentColor" aria-hidden="true">
            <path
              d="M224,48V96a8,8,0,0,1-8,8H168a8,8,0,0,1,0-16h28.69L182.06,73.37a79.56,79.56,0,0,0-56.13-23.43h-.45A79.52,79.52,0,0,0,69.59,72.71,8,8,0,0,1,58.41,61.27a96,96,0,0,1,135,.79L208,76.69V48a8,8,0,0,1,16,0ZM186.41,183.29a80,80,0,0,1-112.47-.66L59.31,168H88a8,8,0,0,0,0-16H40a8,8,0,0,0-8,8v48a8,8,0,0,0,16,0V179.31l14.63,14.63A95.43,95.43,0,0,0,130,222.06h.53a95.36,95.36,0,0,0,67.07-27.33,8,8,0,0,0-11.18-11.44Z"
            />
          </svg>
          <Teleport to="body">
            <Transition name="info-tooltip-fade">
              <div
                v-if="typeTooltip.isOpen.value"
                :ref="typeTooltip.bubbleEl"
                class="info-tooltip__bubble"
                :style="typeTooltip.style.value"
                role="tooltip"
              >
                {{ typeLabel }}
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

.collection-history-row__type-icon {
  display: inline-flex;
  flex-shrink: 0;
  width: 16px;
  height: 16px;
  color: var(--color-text-muted);
  cursor: pointer;
}

.collection-history-row__type-icon svg {
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
