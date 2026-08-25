<script setup lang="ts">
defineProps<{
  row: number;
  col?: number;
}>();
</script>

<template>
  <div class="empty-cell" :style="{ gridRow: row, gridColumn: col ?? 3 }" aria-hidden="true" />
</template>

<style scoped>
.empty-cell {
  width: var(--cell-size, 76px);
  height: var(--cell-size, 76px);
  margin-bottom: 6px;
  margin-left: -1px;
  flex-shrink: 0;
}
</style>
