<script setup lang="ts">
defineProps<{
  active?: boolean
  ariaLabel?: string
}>()

defineEmits<{ click: [] }>()
</script>

<template>
  <button
    type="button"
    class="pill-switcher-btn"
    :class="{ 'pill-switcher-btn--active': active }"
    :aria-pressed="active"
    :aria-label="ariaLabel"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<style scoped>
.pill-switcher-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: var(--pill-switcher-min-width);
  height: var(--pill-switcher-height);
  padding: 0 var(--pill-switcher-padding-x);
  border: none;
  border-radius: 4px;
  background: transparent;
  color: var(--color-text-muted);
  cursor: pointer;
  transition: background-color 0.15s ease, color 0.15s ease;
}

.pill-switcher-btn:hover {
  color: var(--color-text);
}

.pill-switcher-btn--active {
  background: var(--color-bg-elevated);
  color: var(--color-text);
  box-shadow: 0 1px 2px var(--color-shadow);
}

@media (max-width: 900px) {
  .pill-switcher-btn {
    min-width: 32px;
    padding-inline: 6px;
  }
}
</style>
