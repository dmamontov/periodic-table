<script setup lang="ts">
import type { GhsDisplayItem } from '../../types/element/ghs'
import GhsPictogram from './GhsPictogram.vue'

defineProps<{
  items: GhsDisplayItem[]
}>()
</script>

<template>
  <div class="element-sidebar__ghs-grid">
    <div v-for="item in items" :key="item.id" class="element-sidebar__ghs-item">
      <GhsPictogram :id="item.id" />
      <span class="element-sidebar__ghs-label">{{ item.label }}</span>
    </div>
  </div>
</template>

<style scoped>
.element-sidebar__ghs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(96px, 1fr));
  gap: 12px 16px;
}

.element-sidebar__ghs-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  min-width: 0;
  width: 100%;
  text-align: center;
}

.element-sidebar__ghs-label {
  width: 100%;
  max-width: 100%;
  font-size: 12px;
  line-height: 1.35;
  color: var(--color-text-secondary);
  overflow-wrap: anywhere;
  word-break: break-word;
  hyphens: auto;
}

@media (max-width: 900px) {
  .element-sidebar__ghs-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 14px 10px;
  }
}
</style>
