<script setup lang="ts">
import { computed } from 'vue'
import { actinides, lanthanides, mainElements } from '../data'
import { useLocale } from '../locales'

const { selectedNumber } = defineProps<{
  selectedNumber: number
}>()

const { tSidebar } = useLocale()

const ariaLabel = computed(() => tSidebar('miniTableAria'))
</script>

<template>
  <div class="element-mini-table" role="img" :aria-label="ariaLabel">
    <div class="element-mini-table__main">
      <span
        v-for="element in mainElements"
        :key="element.number"
        class="element-mini-table__dot"
        :class="{ 'element-mini-table__dot--active': element.number === selectedNumber }"
        :style="{
          gridRow: element.row,
          gridColumn: element.col,
          '--dot-color': element.color,
        }"
      />
    </div>

    <div class="element-mini-table__f-block">
      <div class="element-mini-table__f-row">
        <span
          v-for="element in lanthanides"
          :key="element.number"
          class="element-mini-table__dot"
          :class="{ 'element-mini-table__dot--active': element.number === selectedNumber }"
          :style="{
            gridColumn: element.col - 3,
            '--dot-color': element.color,
          }"
        />
      </div>
      <div class="element-mini-table__f-row">
        <span
          v-for="element in actinides"
          :key="element.number"
          class="element-mini-table__dot"
          :class="{ 'element-mini-table__dot--active': element.number === selectedNumber }"
          :style="{
            gridColumn: element.col - 3,
            '--dot-color': element.color,
          }"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.element-mini-table {
  --mini-dot: 12px;
  --mini-gap: 5px;
  width: fit-content;
  max-width: 100%;
  padding: 8px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.element-mini-table__main {
  display: grid;
  grid-template-columns: repeat(18, var(--mini-dot));
  grid-template-rows: repeat(7, var(--mini-dot));
  gap: var(--mini-gap);
}

.element-mini-table__f-block {
  margin-top: calc(var(--mini-gap) * 2);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.element-mini-table__f-row {
  display: grid;
  grid-template-columns: repeat(15, var(--mini-dot));
  gap: var(--mini-gap);
}

.element-mini-table__f-row + .element-mini-table__f-row {
  margin-top: var(--mini-gap);
}

.element-mini-table__dot {
  width: calc(var(--mini-dot) * 0.62);
  height: calc(var(--mini-dot) * 0.62);
  border-radius: 50%;
  background: var(--color-border);
  place-self: center;
}

.element-mini-table__dot--active {
  width: var(--mini-dot);
  height: var(--mini-dot);
  background: var(--dot-color, var(--color-text));
}
</style>
