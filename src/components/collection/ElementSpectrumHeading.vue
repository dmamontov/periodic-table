<script setup lang="ts">
withDefaults(
  defineProps<{
    symbol: string;
    name: string;
    accent: string;
    originHtml?: string;
    compact?: boolean;
  }>(),
  { compact: false },
);
</script>

<template>
  <div class="element-spectrum-heading" :class="{ 'element-spectrum-heading--compact': compact }">
    <span class="element-spectrum-heading__symbol" :style="{ color: accent }">{{ symbol }}</span>
    <span class="element-spectrum-heading__name">{{ name }}</span>
    <span v-if="originHtml" class="element-spectrum-heading__origin" v-html="originHtml" />
  </div>
</template>

<style scoped>
.element-spectrum-heading {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 6px 10px;
  min-width: 0;
}

.element-spectrum-heading__symbol {
  font-size: 20px;
  font-weight: 700;
}

.element-spectrum-heading__name {
  font-size: 15px;
  font-weight: 700;
  color: var(--color-text);
}

.element-spectrum-heading__origin {
  flex-basis: 100%;
  font-size: 12px;
  font-weight: 600;
  color: var(--color-text-tertiary);
}

.element-spectrum-heading--compact {
  gap: 3px 7px;
}

.element-spectrum-heading--compact .element-spectrum-heading__symbol {
  font-size: 13px;
}

.element-spectrum-heading--compact .element-spectrum-heading__name {
  font-size: 13px;
  color: var(--color-text-secondary);
}

.element-spectrum-heading--compact .element-spectrum-heading__origin {
  font-size: 11px;
}
</style>
