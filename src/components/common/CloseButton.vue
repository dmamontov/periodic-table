<script setup lang="ts">
import AppIcon from './AppIcon.vue';

defineProps<{
  ariaLabel?: string;
}>();

defineEmits<{ click: [] }>();
</script>

<template>
  <button type="button" class="close-button" :aria-label="ariaLabel" @click="$emit('click')">
    <AppIcon name="close" />
  </button>
</template>

<style scoped>
.close-button {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 50%;
  background: var(--color-bg-muted);
  color: var(--color-text-muted);
  cursor: pointer;
  transition:
    background-color 0.15s ease,
    color 0.15s ease;
}

.close-button:hover {
  background: var(--color-bg-elevated);
  color: var(--color-text);
}

.close-button :deep(svg) {
  width: 15px;
  height: 15px;
}
</style>
