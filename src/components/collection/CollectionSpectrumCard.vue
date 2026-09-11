<script setup lang="ts">
import { useLocale } from '../../locales';
import type { LocalizedLabel } from '../../utils/localizedLabel';
import type { SpectrumAnnotation } from '../../types/collection/collection';
import ElementSpectrumHeading from './ElementSpectrumHeading.vue';
import CollectionGammaSpectrum from './CollectionGammaSpectrum.vue';

export interface CollectionSpectrumItem {
  symbol: string;
  routeSymbol: string;
  color: string;
  spectrumId: string;
  originHtml?: string;
  sampleLabel?: string;
  annotations?: SpectrumAnnotation[] | null;
  leadShielded?: boolean | null;
  backgroundSpectrumId?: string | null;
  note?: LocalizedLabel | null;
  isCurrent?: boolean;
  isPast?: boolean;
  isAlternate?: boolean;
  retained?: boolean | null;
}

const props = defineProps<{
  item: CollectionSpectrumItem;
  /** The full spectra list, for the zoom modal's prev/next paging. */
  siblings: CollectionSpectrumItem[];
  siblingIndex: number;
}>();

const emit = defineEmits<{ open: [symbol: string] }>();

const { messages } = useLocale();
</script>

<template>
  <div class="collection-spectrum-card">
    <button type="button" class="collection-spectrum-card__header" @click="emit('open', item.routeSymbol)">
      <ElementSpectrumHeading
        :symbol="item.symbol"
        :name="messages.elements[item.symbol] ?? ''"
        :accent="item.color"
        :origin-html="item.originHtml"
        :sample-label="item.sampleLabel"
        :is-current="item.isCurrent"
        :is-past="item.isPast"
        :retained="item.retained"
        :is-alternate="item.isAlternate"
        compact
      />
    </button>
    <CollectionGammaSpectrum
      :spectrum-id="item.spectrumId"
      :accent-color="item.color"
      :element-symbol="item.symbol"
      :element-name="messages.elements[item.symbol]"
      :origin-html="item.originHtml"
      :sample-label="item.sampleLabel"
      :annotations="item.annotations"
      :lead-shielded="item.leadShielded"
      :background-spectrum-id="item.backgroundSpectrumId"
      :note="item.note"
      :siblings="props.siblings"
      :sibling-index="siblingIndex"
    />
  </div>
</template>

<style scoped>
.collection-spectrum-card {
  padding: 11px 0;
  border-bottom: 1px solid var(--color-border-light);
}

.collection-spectrum-card__header {
  display: block;
  width: 100%;
  margin: 0 0 8px;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
  text-align: left;
}

.collection-spectrum-card__header :deep(.element-spectrum-heading__name) {
  transition: color 0.15s ease;
}

.collection-spectrum-card__header:hover :deep(.element-spectrum-heading__name) {
  color: var(--color-text);
}
</style>
