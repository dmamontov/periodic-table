<script setup lang="ts">
import { useLocale } from '../../locales';
import { RETAINED_COLOR, NOT_RETAINED_COLOR } from '../../theme/colors';

withDefaults(
  defineProps<{
    symbol: string;
    name: string;
    accent: string;
    originHtml?: string;
    sampleLabel?: string;
    /** True for a spectrum from a past (history) sample rather than the current one. */
    isPast?: boolean;
    /** Only meaningful when isPast - whether that earlier physical sample is still kept. */
    retained?: boolean | null;
    compact?: boolean;
  }>(),
  { compact: false },
);

const { tSidebar } = useLocale();
</script>

<template>
  <div class="element-spectrum-heading" :class="{ 'element-spectrum-heading--compact': compact }">
    <span
      v-if="isPast"
      class="element-spectrum-heading__retained-dot"
      :style="{ backgroundColor: retained ? RETAINED_COLOR : NOT_RETAINED_COLOR }"
      :title="retained ? tSidebar('collectionHistoryRetained') : tSidebar('collectionHistoryNotRetained')"
    />
    <span class="element-spectrum-heading__symbol" :style="{ color: accent }">{{ symbol }}</span>
    <span class="element-spectrum-heading__name">{{ name }}</span>
    <span v-if="originHtml" class="element-spectrum-heading__origin" v-html="originHtml" />
    <span v-if="sampleLabel" class="element-spectrum-heading__sample">{{ sampleLabel }}</span>
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

.element-spectrum-heading__retained-dot {
  flex-shrink: 0;
  width: 8px;
  height: 8px;
  border-radius: 50%;
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

.element-spectrum-heading__sample {
  flex-basis: 100%;
  font-size: 11px;
  font-weight: 400;
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

.element-spectrum-heading--compact .element-spectrum-heading__sample {
  font-size: 10px;
}
</style>
