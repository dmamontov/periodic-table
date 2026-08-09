<script setup lang="ts">
defineProps<{
  ariaLabel?: string
}>()

defineEmits<{ click: [] }>()
</script>

<template>
  <button type="button" class="close-button" :aria-label="ariaLabel" @click="$emit('click')">
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path
        d="M4 4l8 8M12 4l-8 8"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
      />
    </svg>
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
  transition: background-color 0.15s ease, color 0.15s ease;
}

.close-button:hover {
  background: var(--color-bg-elevated);
  color: var(--color-text);
}

.close-button svg {
  width: 15px;
  height: 15px;
}
</style>
