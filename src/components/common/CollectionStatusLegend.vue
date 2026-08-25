<script setup lang="ts">
import { useLocale } from '../../locales';
import { CURRENT_COLOR, RETAINED_COLOR, NOT_RETAINED_COLOR } from '../../theme/colors';

const { tSidebar } = useLocale();
</script>

<template>
  <div class="collection-status-legend">
    <span class="collection-status-legend__item">
      <span class="collection-status-legend__dot" :style="{ backgroundColor: CURRENT_COLOR }" />
      {{ tSidebar('collectionHistoryCurrent') }}
    </span>
    <span class="collection-status-legend__item">
      <span class="collection-status-legend__dot" :style="{ backgroundColor: RETAINED_COLOR }" />
      {{ tSidebar('collectionHistoryRetained') }}
    </span>
    <span class="collection-status-legend__item">
      <span class="collection-status-legend__dot" :style="{ backgroundColor: NOT_RETAINED_COLOR }" />
      {{ tSidebar('collectionHistoryNotRetained') }}
    </span>
  </div>
</template>

<style scoped>
.collection-status-legend {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 6px 14px;
}

.collection-status-legend__item {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  font-weight: 600;
  color: var(--color-text-muted);
}

.collection-status-legend__dot {
  flex-shrink: 0;
  width: 8px;
  height: 8px;
  border-radius: 50%;
}
</style>
