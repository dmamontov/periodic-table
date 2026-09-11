<script setup lang="ts">
import { computed } from 'vue';
import { useLocale } from '../../locales';
import { CURRENT_COLOR, RETAINED_COLOR, NOT_RETAINED_COLOR, ALTERNATE_COLOR } from '../../theme/colors';

const props = withDefaults(
  defineProps<{
    symbol: string;
    name: string;
    accent: string;
    originHtml?: string;
    sampleLabel?: string;
    /** True for the live (current) sample's spectrum - draws the status dot in the collection accent color. */
    isCurrent?: boolean;
    /** True for a spectrum from a past (history) sample rather than the current one. */
    isPast?: boolean;
    /** Whether the sample is still physically kept - drives the dot color/tooltip for any non-current sample (isPast or isAlternate alike). */
    retained?: boolean | null;
    /** True for a spectrum from an `alternates` sample - a second sample owned alongside the current one, never "replaced" so it's neither current nor past. */
    isAlternate?: boolean;
    compact?: boolean;
  }>(),
  { compact: false },
);

const { tSidebar } = useLocale();

// The dot is purely about physical status (kept / not kept / current) - it applies the same way to
// an archived sample and an alternate one, so it never needs to know which of those two this is.
const retainedColor = computed(() => (props.retained === false ? NOT_RETAINED_COLOR : RETAINED_COLOR));
const retainedLabel = computed(() =>
  props.retained === false ? tSidebar('collectionHistoryNotRetained') : tSidebar('collectionHistoryRetained'),
);
</script>

<template>
  <div class="element-spectrum-heading" :class="{ 'element-spectrum-heading--compact': compact }">
    <!-- Its own row, `align-items: center`, so the dot/badge center against the symbol+name line itself rather than against the whole (possibly multi-line) heading. -->
    <div class="element-spectrum-heading__row">
      <span
        v-if="isCurrent"
        class="element-spectrum-heading__retained-dot"
        :style="{ backgroundColor: CURRENT_COLOR }"
        :title="tSidebar('collectionHistoryCurrent')"
      />
      <span
        v-else-if="isPast || isAlternate"
        class="element-spectrum-heading__retained-dot"
        :style="{ backgroundColor: retainedColor }"
        :title="retainedLabel"
      />

      <span class="element-spectrum-heading__symbol" :style="{ color: accent }">{{ symbol }}</span>
      <span class="element-spectrum-heading__name">{{ name }}</span>

      <!-- The badge is purely about category (archive vs. alternate) - the dot above already covers current/kept/not-kept, so this only needs to fire for the two non-default kinds, and never alongside the current dot. -->
      <span
        v-if="!isCurrent && isAlternate"
        class="element-spectrum-heading__badge"
        :style="{ color: ALTERNATE_COLOR, backgroundColor: `${ALTERNATE_COLOR}22` }"
      >
        {{ tSidebar('collectionHistoryAlternate') }}
      </span>
      <span
        v-else-if="!isCurrent && isPast"
        class="element-spectrum-heading__badge"
        :style="{ color: retainedColor, backgroundColor: `${retainedColor}22` }"
      >
        {{ tSidebar('collectionHistoryArchive') }}
      </span>
    </div>

    <span v-if="originHtml" class="element-spectrum-heading__origin" v-html="originHtml" />
    <span v-if="sampleLabel" class="element-spectrum-heading__sample">{{ sampleLabel }}</span>
  </div>
</template>

<style scoped>
.element-spectrum-heading {
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
}

.element-spectrum-heading__row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px 10px;
  min-width: 0;
}

.element-spectrum-heading__retained-dot {
  flex-shrink: 0;
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.element-spectrum-heading__badge {
  flex-shrink: 0;
  padding: 2px 8px;
  border-radius: 999px;
  font-size: 10px;
  font-weight: 700;
  line-height: 1.4;
  text-transform: lowercase;
  white-space: nowrap;
}

.element-spectrum-heading__symbol {
  font-size: 20px;
  font-weight: 700;
  line-height: 1;
}

.element-spectrum-heading__name {
  font-size: 15px;
  font-weight: 700;
  line-height: 1;
  color: var(--color-text);
}

.element-spectrum-heading__origin {
  font-size: 12px;
  font-weight: 600;
  color: var(--color-text-tertiary);
}

.element-spectrum-heading__sample {
  font-size: 11px;
  font-weight: 400;
  color: var(--color-text-tertiary);
}

.element-spectrum-heading--compact {
  gap: 3px;
}

.element-spectrum-heading--compact .element-spectrum-heading__row {
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
