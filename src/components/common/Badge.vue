<script setup lang="ts">
defineProps<{
  color: string;
}>();
</script>

<template>
  <span class="badge" :style="{ backgroundColor: color }">
    <slot />
  </span>
</template>

<style scoped>
.badge {
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
  padding: 5px 10px;
  border-radius: 5px;
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  line-height: 1.2;
  white-space: nowrap;
}
</style>
