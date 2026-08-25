<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
import { SECTION_COLORS } from '../../theme/colors';
import type { ProductionCountryEntry } from '../../types/element/detail';

const ElementProductionMap = defineAsyncComponent(() => import('./ElementProductionMap.vue'));

defineProps<{
  countries: ProductionCountryEntry[];
  note: string;
}>();
</script>

<template>
  <div class="element-sidebar__mining">
    <ElementProductionMap v-if="countries.length > 0" :countries="countries" :accent-color="SECTION_COLORS.mining" />
    <p class="element-sidebar__mining-note" :class="{ 'element-sidebar__mining-note--only': !countries.length }">
      {{ note }}
    </p>
  </div>
</template>

<style scoped>
.element-sidebar__mining-note {
  margin: 8px 0 0;
  font-size: 12px;
  line-height: 1.4;
  color: var(--color-text-tertiary);
}

.element-sidebar__mining-note--only {
  margin-top: 0;
}
</style>
