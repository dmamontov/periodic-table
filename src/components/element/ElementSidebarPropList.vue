<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import { useLocale } from '../../locales'
import type { Element } from '../../types/element/element'
import type { DetailSection } from '../../types/element/section'
import type { OxidationStateRows } from '../../utils/element/detailSections'
import CollectionGammaSpectrum from '../collection/CollectionGammaSpectrum.vue'
import ElementMiniTable from '../table/ElementMiniTable.vue'

const ElementProductionMap = defineAsyncComponent(() => import('./ElementProductionMap.vue'))

defineProps<{
  section: DetailSection
  element: Element
  displaySymbol: string
  elementName: string
  spectrumOriginHtml: string
  oxidationStates: OxidationStateRows | null
}>()

const { tSidebar } = useLocale()
</script>

<template>
  <ul class="element-sidebar__props">
    <template v-for="(item, idx) in section.items" :key="`${section.sectionKey ?? section.id}-${idx}`">
      <li
        v-if="item.kind === 'miniTable'"
        class="element-sidebar__prop element-sidebar__prop--mini-table"
      >
        <ElementMiniTable :selected-number="element.number" />
      </li>
      <li
        v-else-if="item.kind === 'countryMap'"
        class="element-sidebar__prop element-sidebar__prop--country-map"
      >
        <ElementProductionMap :countries="(item.mapCountries ?? []).map((c) => ({ country: c }))" :accent-color="section.color" />
      </li>
      <li
        v-else
        class="element-sidebar__prop"
        :class="{
          'element-sidebar__prop--empty': item.empty,
          'element-sidebar__prop--text': !item.label,
        }"
      >
        <span v-if="item.label" class="element-sidebar__prop-label">{{ item.label }}</span>
        <img
          v-if="item.imageUrl"
          :src="item.imageUrl"
          :alt="item.label"
          class="element-sidebar__spectrum-image"
        />
        <CollectionGammaSpectrum
          v-else-if="item.collectionSpectrumId"
          :spectrum-id="item.collectionSpectrumId"
          :accent-color="element.color"
          :element-symbol="displaySymbol"
          :element-name="elementName"
          :origin-html="spectrumOriginHtml"
          :annotations="element.collection?.spectrum?.annotations"
          :lead-shielded="element.collection?.spectrum?.leadShielded"
          :background-spectrum-id="element.collection?.spectrum?.backgroundSpectrumId"
          class="element-sidebar__collection-spectrum"
        />
        <div
          v-else-if="item.colorHex"
          class="element-sidebar__color-swatch"
          :class="`element-sidebar__color-swatch--${item.colorFinish ?? 'metallic'}`"
          :style="{ backgroundColor: item.colorHex }"
        />
        <span
          v-else-if="item.html"
          class="element-sidebar__prop-value"
          v-html="item.value"
        />
        <a
          v-else-if="item.href"
          :href="item.href"
          class="element-sidebar__prop-value element-sidebar__prop-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ item.value }}
        </a>
        <span v-else class="element-sidebar__prop-value">{{ item.value }}</span>
      </li>
    </template>

    <li v-if="section.id === 'atomic' && oxidationStates" class="element-sidebar__prop">
      <span class="element-sidebar__prop-label">{{ tSidebar('oxidationStates') }}</span>
      <div class="element-sidebar__oxidation">
        <ul class="element-sidebar__oxidation-row element-sidebar__oxidation-row--negative">
          <li
            v-for="(cell, oi) in oxidationStates.negative"
            :key="`n-${oi}`"
            class="element-sidebar__oxidation-item"
            :class="`element-sidebar__oxidation-item--${cell.variant}`"
          >
            {{ cell.label === '-' ? '−' : cell.label }}
          </li>
        </ul>
        <ul class="element-sidebar__oxidation-row element-sidebar__oxidation-row--positive">
          <li
            v-for="(cell, oi) in oxidationStates.positive"
            :key="`p-${oi}`"
            class="element-sidebar__oxidation-item"
            :class="`element-sidebar__oxidation-item--${cell.variant}`"
          >
            {{ cell.label === '-' ? '−' : cell.label }}
          </li>
        </ul>
      </div>
    </li>
  </ul>
</template>

<style scoped>
.element-sidebar__props {
  margin: 0;
  padding: 0;
  list-style: none;
}

.element-sidebar__prop {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px 16px;
  padding: 11px 0;
  border-bottom: 1px solid var(--color-border-light);
  font-size: 13px;
}

.element-sidebar__prop--empty {
  opacity: 0.45;
}

.element-sidebar__prop--text {
  display: block;
}

.element-sidebar__prop--text .element-sidebar__prop-value {
  display: block;
  text-align: left;
  font-weight: 400;
  line-height: 1.45;
}

.element-sidebar__prop-label {
  color: var(--color-text-secondary);
  font-weight: 400;
}

.element-sidebar__prop-value {
  color: var(--color-text);
  font-weight: 700;
  text-align: right;
  word-break: break-word;
}

.element-sidebar__prop-link {
  color: var(--color-link);
  text-decoration: none;
}

.element-sidebar__prop-link:hover {
  text-decoration: underline;
}

.element-sidebar__prop-value sup {
  font-size: 0.72em;
  line-height: 0;
  vertical-align: super;
}

.element-sidebar__prop-value sub {
  font-size: 0.72em;
  line-height: 0;
  vertical-align: sub;
}

.element-sidebar__prop-value sup.collection-isotope-mass {
  font-size: 0.62em;
  font-weight: 700;
}

.element-sidebar__prop-value :is(sup, sub) small {
  font-size: inherit;
}

.element-sidebar__prop:has(.element-sidebar__oxidation),
.element-sidebar__prop:has(.element-sidebar__spectrum-image),
.element-sidebar__prop:has(.element-sidebar__collection-spectrum),
.element-sidebar__prop:has(.element-sidebar__color-swatch),
.element-sidebar__prop--mini-table,
.element-sidebar__prop--country-map {
  grid-template-columns: 1fr;
}

.element-sidebar__prop--mini-table {
  justify-items: stretch;
}

.element-sidebar__prop--mini-table .element-mini-table {
  max-width: 320px;
  margin: 0 auto;
}

.element-sidebar__prop--country-map {
  justify-items: stretch;
}

.element-sidebar__prop--country-map .element-production-map {
  max-width: 320px;
  margin: 0 auto;
}

.element-sidebar__spectrum-image {
  display: block;
  width: 100%;
  margin-top: 6px;
  border-radius: 4px;
}

.element-sidebar__color-swatch {
  position: relative;
  display: block;
  width: 100%;
  height: 26px;
  margin-top: 6px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  overflow: hidden;
}

.element-sidebar__color-swatch::before,
.element-sidebar__color-swatch::after {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
}

/* Polished metal: cylinder + top highlight, no diagonal streak */
.element-sidebar__color-swatch--metallic {
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.8),
    inset 0 -1px 0 rgba(0, 0, 0, 0.45),
    inset 1px 0 1px rgba(255, 255, 255, 0.15),
    inset -1px 0 1px rgba(0, 0, 0, 0.18);
}

.element-sidebar__color-swatch--metallic::before {
  background:
    radial-gradient(
      ellipse 110% 70% at 50% -35%,
      rgba(255, 255, 255, 0.75) 0%,
      rgba(255, 255, 255, 0.28) 38%,
      transparent 68%
    );
}

.element-sidebar__color-swatch--metallic::after {
  background:
    linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.22) 0%,
      rgba(255, 255, 255, 0.04) 22%,
      rgba(0, 0, 0, 0.04) 58%,
      rgba(0, 0, 0, 0.28) 100%
    ),
    linear-gradient(
      90deg,
      rgba(0, 0, 0, 0.22) 0%,
      rgba(255, 255, 255, 0.1) 14%,
      rgba(255, 255, 255, 0.18) 50%,
      rgba(255, 255, 255, 0.06) 86%,
      rgba(0, 0, 0, 0.22) 100%
    );
}

/* Glossy (sulfur, bromine, iodine): soft convex sheen */
.element-sidebar__color-swatch--glossy {
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.55),
    inset 0 -2px 4px rgba(0, 0, 0, 0.2);
}

.element-sidebar__color-swatch--glossy::before {
  background: radial-gradient(
    ellipse 100% 80% at 50% 0%,
    rgba(255, 255, 255, 0.45) 0%,
    transparent 65%
  );
}

.element-sidebar__color-swatch--glossy::after {
  background: linear-gradient(
    180deg,
    transparent 40%,
    rgba(0, 0, 0, 0.15) 100%
  );
}

/* Gases: subtle top glint */
.element-sidebar__color-swatch--subtle {
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.7);
}

.element-sidebar__color-swatch--subtle::before {
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.35) 0%,
    transparent 45%
  );
}

.element-sidebar__color-swatch--subtle::after {
  display: none;
}

/* Matte surface */
.element-sidebar__color-swatch--matte {
  box-shadow: inset 0 -1px 3px rgba(0, 0, 0, 0.22);
}

.element-sidebar__color-swatch--matte::before {
  display: none;
}

.element-sidebar__color-swatch--matte::after {
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.05) 0%,
    transparent 35%,
    rgba(0, 0, 0, 0.2) 100%
  );
}

.element-sidebar__oxidation {
  margin-top: 6px;
}

.element-sidebar__oxidation-row {
  display: flex;
  flex-wrap: wrap;
  margin: 0;
  padding: 0;
  list-style: none;
}

.element-sidebar__oxidation-row--positive {
  margin-top: 0;
}

.element-sidebar__oxidation-item {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 27px;
  height: 27px;
  margin: 0 5px 5px 0;
  border-radius: 50%;
  font-size: 13px;
  font-weight: 700;
  line-height: 1;
}

.element-sidebar__oxidation-item--empty {
  background: var(--color-bg-muted);
  color: var(--color-text-muted);
}

.element-sidebar__oxidation-item--zero {
  background: #e6f3f6;
  color: #4a8a9b;
}

.element-sidebar__oxidation-item--negative {
  background: #e8f0fc;
  color: #3d6fc4;
}

.element-sidebar__oxidation-item--positive {
  background: #fcebee;
  color: #c43d52;
}

@media (max-width: 900px) and (orientation: portrait) {
  .element-sidebar__prop--mini-table .element-mini-table {
    max-width: none;
  }

  .element-sidebar__prop--country-map .element-production-map {
    max-width: none;
  }
}
</style>
