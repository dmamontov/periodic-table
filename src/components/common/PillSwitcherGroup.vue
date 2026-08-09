<script setup lang="ts">
defineProps<{
  ariaLabel?: string
}>()
</script>

<template>
  <div class="pill-switcher-group" role="group" :aria-label="ariaLabel">
    <slot />
  </div>
</template>

<style scoped>
.pill-switcher-group {
  display: inline-flex;
  gap: 2px;
  padding: 2px;
  border-radius: 6px;
  background: var(--color-bg-muted);
}
</style>
