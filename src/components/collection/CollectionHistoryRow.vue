<script setup lang="ts">
import ElementCollectionHistoryModal from '../element/ElementCollectionHistoryModal.vue';
import Badge from '../common/Badge.vue';
import type { Element } from '../../types/element/element';
import ElementSpectrumHeading from './ElementSpectrumHeading.vue';

defineProps<{
  element: Element;
  name: string;
  color: string;
  date: string;
  badgeColor: string;
  badgeLabel: string;
}>();
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
        <span class="collection-history-row__marker" :style="{ backgroundColor: color }" />
        <span class="collection-history-row__date">{{ date }}</span>
        <ElementSpectrumHeading
          :symbol="element.symbol"
          :name="name"
          :accent="color"
          compact
          class="collection-history-row__heading"
        />
        <Badge :color="badgeColor" class="collection-history-row__badge">{{ badgeLabel }}</Badge>
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

.collection-history-row__date {
  flex-shrink: 0;
  font-size: 11px;
  font-weight: 700;
  color: var(--color-text-muted);
  white-space: nowrap;
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

.collection-history-row__badge {
  flex-shrink: 0;
}
</style>
