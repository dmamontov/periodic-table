<script setup lang="ts">
defineProps<{
  title: string;
  accentColor?: string;
}>();

const collapsed = defineModel<boolean>('collapsed', { required: true });
</script>

<template>
  <section class="collapsible-section" :class="{ 'collapsible-section--collapsed': collapsed }">
    <div class="collapsible-section__header">
      <button
        type="button"
        class="collapsible-section__title"
        :style="{ borderColor: accentColor }"
        :aria-expanded="!collapsed"
        @click="collapsed = !collapsed"
      >
        <span>{{ title }}</span>
        <span class="collapsible-section__chevron" aria-hidden="true" />
      </button>
      <slot name="action" />
    </div>

    <div v-show="!collapsed" class="collapsible-section__body">
      <slot />
    </div>
  </section>
</template>

<style scoped>
.collapsible-section__header {
  display: flex;
  align-items: center;
  gap: 4px;
  /* Set by the parent via --collapsible-section-title-margin(-collapsed) — spacing needs differ per usage context. */
  margin: var(--collapsible-section-title-margin, 0 0 12px);
}

.collapsible-section--collapsed .collapsible-section__header {
  margin-bottom: var(--collapsible-section-title-margin-bottom-collapsed, 12px);
}

.collapsible-section__title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex: 1 1 auto;
  min-width: 0;
  padding: 0 0 0 12px;
  border: none;
  border-left: 4px solid;
  background: none;
  font-size: 14px;
  font-weight: 700;
  color: var(--color-text);
  line-height: 1.3;
  text-align: left;
  cursor: pointer;
  transition: color 0.15s ease;
}

.collapsible-section__title:hover {
  color: var(--color-text-secondary);
}

.collapsible-section__chevron {
  flex-shrink: 0;
  width: 7px;
  height: 7px;
  margin-right: 6px;
  border-right: 2px solid var(--color-text-secondary);
  border-bottom: 2px solid var(--color-text-secondary);
  transform: rotate(45deg);
  transition: transform 0.2s ease;
}

.collapsible-section--collapsed .collapsible-section__chevron {
  transform: rotate(-45deg);
}

.collapsible-section__body {
  overflow: visible;
}
</style>
